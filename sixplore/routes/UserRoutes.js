const express = require('express');
const router = express.Router();

// Database Access Calls
const userCalls = require('../backend/userCalls');;
const explorationItemCalls = require('../backend/explorationItemCalls');

// Mongoose Schemas
const User = require('../models/User');
const ExplorationItem = require('../models/ExplorationItem');
const { Mongoose, default: mongoose } = require('mongoose');

router.get("/users/:userId/getFavourites", async (req, res) => {
    // Fetch All User Favorites
    try {
        // Saving User Id
        const userId = req.params.userId;

        // Grabbing user from database
        const user = await userCalls.getUserFromDB(userId);
        let favList = [];

        // Saving all user fav items into a list
        for (const fav of user.favourites) {
            const explorationItem = await explorationItemCalls.getExplorationItemFromDB(fav._id);
            favList.push(explorationItem);
        }
        
        // Sending back fav item list
        res.send(favList);
    } catch (error) {
        errorFunc(res, error);
    }
    
});

router.post("/users/:userId-:itemId/addFavourite", async (req, res) => {
    // Add Favorite Item to User Item List
    try {
        // Saving User Id and Item Id
        const userId = req.params.userId;
        const itemId = req.params.itemId;

        // Calling requested item and user
        const item = await explorationItemCalls.getExplorationItemFromDB(itemId);
        const user = await userCalls.getUserFromDB(userId);

        // Checking if user has any fav items at all
        if (user.favourites.length > 0) {
            // Checking if user has already favorited recieved item
            if (user.favourites.includes(item._id)){
                res.status(400).send("Item already favorited by User");
            }else { // Adding New Item as Favorite
                await User.findByIdAndUpdate(userId, { $push : { favourites : item } }).exec();
                res.send("Success");
            }
        }
        else { // Adding New Item as Favorite since list is empty
            await User.findByIdAndUpdate(userId, { $push : { favourites : item } }).exec();
            res.send("Success");
        }        

    } catch (error) {
        errorFunc(res, error);
    }
    
});

router.delete("/users/:userId-:itemId/removeFavourite", async (req, res) => {
    // Remove an item from User favourites
    try {
        // Saving User Id and Item Id
        const userId = req.params.userId;
        const itemId = req.params.itemId;
 
        // Saving requested item and user
        const item = await explorationItemCalls.getExplorationItemFromDB(itemId);
        const user = await userCalls.getUserFromDB(userId);
 
        // Checking if Favorite list is empty
        if (user.favourites.length === 0) {
            res.status(400).send("Empty fav list, nothing to be removed");
        } // Checking if item in users list, if so, deletes it
        else if(user.favourites.includes(item._id)) {
            await User.findByIdAndUpdate(userId, { $pull : { favourites : item._id } }).exec();
            res.send("Successfully Removed Favorite Item");
        }else
            throw new Error("Wrong Item Id sent", { cause: { statusCode : 404 } });
    } catch (error) {
        errorFunc(res, error);
    }
});

router.get("/users/:userId/getPlans", async (req, res) => {
    // Getting all plans from user 
    try {
        // Saving User Id
        const userId = req.params.userId;

        // Grabbing user from database
        const user = await userCalls.getUserFromDB(userId);
        let planList = [];

        // Saving all user plan items into a list
        for (const plan of user.plans) {
            const planItem = await explorationItemCalls.getExplorationItemFromDB(plan.planItem);
            planList.push(planItem);
        }
        
        // Sending back plan item list
        res.send(planList);
    } catch (error) {
        errorFunc(res, error);
    }
});


router.get("/users/:userId-:planId/getPlan", async (req, res) => {
    // Gets a specific user plan
    try {
        // Saving User Id and Item Id
        const userId = req.params.userId;
        const planId = req.params.planId; 

        // Getting user
        const user = await userCalls.getUserFromDB(userId);

        // Plan to return
        let userPlan = {};

        // Checking is user has any plans
        if (user.plans.length === 0) {
            throw new Error("Empty User plan list found", { cause : { statusCode: 404}});
        }
        else {
            userPlan = user.plans.find(plan => plan._id.toString() === planId);  // fetching plan            
        }

        // Checking if valid entry was returned from db
        if (userPlan) {
            res.send(userPlan);
        }      
        else
            throw new Error("Recieved plan item not found", { cause : { statusCode: 404}});
        
    } catch (error) {
        errorFunc(res, error);
    }
})


router.post("/users/addPlan", async (req, res) => {
    // Update User Plan
    try {
        const newPlan = req.body;

        // Expected format of object being recieved
        const bodyStruct = {
            "userId": "",
            "itemId": "",
            "planId": "",
            "planName": ""
        }

        const structCheck = (expected, recieved) => {
            const expectedKeys = Object.keys(expected).sort();
            const recievedKeys = Object.keys(recieved).sort();

            return (JSON.stringify(expectedKeys) === JSON.stringify(recievedKeys))
        }
        
        // Checking for errors        
        if (Object.keys(newPlan).length === 0) { // Checking if recieved object is empty
            throw new Error("Recieved Empty object", { cause : { statusCode: 404}});
        }
        else {
            if (!structCheck(bodyStruct, newPlan)) // Checking if recieved object is wrongly formatted
                throw new Error("Recieved wrongly formatted Object", { cause : { statusCode: 404}});

        }

        const userId = newPlan.userId;
        const itemId = newPlan.itemId;
        const planId = newPlan.planId;
        const planName = newPlan.planName;
        let addNewPlan = false;

        if (userId === "") 
            throw new Error("Recieved empty userId", { cause : { statusCode: 404}});

        if (itemId === "")
            throw new Error("Recieved empty itemId", { cause : { statusCode: 404}});

        if (planId === ""){
            if (planName === "")
                throw new Error("Recieved empty name for new plan", { cause : { statusCode: 404}});
            else
                addNewPlan = true;
        } else {
            if (planName !== "")
                throw new Error("Recieved a plan name when plan already exists", { cause : { statusCode: 404}});
        }
        
        // Grabbing user
        const user = await userCalls.getUserFromDB(userId);

        // Checking if User's Fav list is empty, if so no plan can be added
        if (user.favourites.length === 0) {
            throw new Error("Empty fav list found, new plans cannot be made", { cause : { statusCode: 404}})
        }
        else if (user.favourites.includes(itemId)) {
            // Creating mongoose object.
            const itemId_m = new mongoose.Types.ObjectId(itemId); 

            if (addNewPlan) { // If new plan
                await User.findByIdAndUpdate(userId, 
                    { $push : { plans : { name: planName, planItem: [itemId_m] } } // Pushing new plan
                }).exec();
            }
            else{

                // Check if recieved plan Id exist
                const planExist = await User.findOne({ 
                    _id: userId, 
                    'plans._id' : planId
                }).exec(); 

                // Check if item to be added into given/existing plan exists.
                const itemExist = await User.findOne({ 
                    _id: userId, 
                    'plans._id' : planId,
                    'plans.planItem': itemId 
                }).exec(); 

                if (itemExist) // If it exists, its a duplicate so error thrown
                    throw new Error("Given plan already has this item.", { cause : { statusCode: 404}})
                
                // Adding the new item into item planItems array
                if (planExist) {
                    await User.findByIdAndUpdate(userId,                    
                        { $push : { 'plans.$[plan].planItem' : itemId } } ,
                        { arrayFilters: [{ 'plan._id': planId }] }                   
                    ).exec();
                }
                else 
                    throw new Error("Recieved plan id not found", { cause : { statusCode: 404}});                
            }
        }
        else // Item not found in users fav list so error thrown
            throw new Error("Item Id recieved does not exist in users favourites.", { cause : { statusCode: 404}})        

        res.send("Success"); // Sending success message

    } catch (error) {
        errorFunc(res, error);
    }
});

router.delete("/users/deletePlan", async (req, res) => {
    // Delete 
    try {
        const plan = req.body;

        // Expected format of object being recieved
        const bodyStruct = {
            "userId": "",
            "itemId": "",
            "planId": ""
        }

        const structCheck = (expected, recieved) => {
            const expectedKeys = Object.keys(expected).sort();
            const recievedKeys = Object.keys(recieved).sort();

            return (JSON.stringify(expectedKeys) === JSON.stringify(recievedKeys))
        }
        
        // Checking for errors        
        if (Object.keys(plan).length === 0) { // Checking if recieved object is empty
            throw new Error("Recieved Empty object", { cause : { statusCode: 404}});
        }
        else {
            if (!structCheck(bodyStruct, plan)) // Checking if recieved object is wrongly formatted
                throw new Error("Recieved wrongly formatted Object", { cause : { statusCode: 404}});
        }

        const userId = plan.userId;
        const itemId = plan.itemId;
        const planId = plan.planId;
        let deletePlanList = false;

        if (userId === "") 
            throw new Error("Recieved empty userId", { cause : { statusCode: 404}});

        if (planId === "")
            throw new Error("Recieved empty plan to be deleted", { cause : { statusCode: 404}});

        if (itemId === "") {
            if (planId === "")
                throw new Error("Recieved empty item to be deleted", { cause : { statusCode: 404}});        
            else
                deletePlanList = true;
        }

        // Grabbing user
        const user = await userCalls.getUserFromDB(userId);

        // Checking if User's Fav list is empty, if so no plan can be added
        if (user.plans.length === 0) {
            throw new Error("Empty plans list found, no plans to be deleted", { cause : { statusCode: 404}});
        }
        else {
            // Checking is plan exists
            const planExist = await User.findById({
                _id : userId,
                'plans._id' : planId
            }).exec();

            if (!planExist) 
                throw new Error("Plan with this id was not found", { cause : { statusCode: 404}});            

            if (deletePlanList) { // Deleting the entire plan from planList array
                await User.findByIdAndUpdate(userId, 
                    { $pull : { plans : { _id : planId } } } // Deleting entire plan
                ).exec();
            } else {
                // Checking if item exists within recieved plan
                const itemExist = await User.findOne({
                    _id: userId, 
                    'plans._id' : planId,
                    'plans.planItem': itemId 
                }).exec();

                if (itemExist) { // Deleting item
                    await User.findByIdAndUpdate(userId,                    
                        { $pull : { 'plans.$[plan].planItem' : itemId } } ,
                        { arrayFilters: [{ 'plan._id': planId }] }                   
                    ).exec();
                }
                else 
                    throw new Error("Item with this id was not found", { cause : { statusCode: 404}});               
            }

        }       
        res.send("Success"); // Sending success message

    } catch (error) {
        errorFunc(res, error);
    }
});

/**
 * Temp Get Request for fetching a random user
 */
router.get("/randomUser", async (req, res) => {
    try {
        const randuser = await User.aggregate([
            { $sample: { size: 1 } }
        ]);
        res.send(randuser[0]);
    } catch (error) {        
        res.send(error.toString()).status(500);
    }
})

router.get("/users/:userId/getDetails", async (req, res) => {
    // Getting all details from user 
    try {
        // Saving User Id
        const userId = req.params.userId;
        let userItem = {};

        // Grabbing user from database
        const user = await userCalls.getUserFromDB(userId);
        userItem = {
            name: user.name,
            email: user.email
        };
        // Sending back user item list
        res.send(userItem);
    } catch (error) {
        errorFunc(res, error);
    }
});

module.exports = router;

/**
 * 
 * @param {*} res 
 * @param {*} error 
 */
function errorFunc(res, error){
    if (error.name === "TypeError"){
        console.log(error);
        res.status(404).send("Wrong ID sent");
    }
    else if (error.cause) {
        res.status(error.cause.statusCode).send(error.toString());            
    }
    else
        res.status(500).send(error.toString());
}