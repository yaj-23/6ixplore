const express = require('express');
const router = express.Router();

// Database Access Calls
const userCalls = require('../backend/userCalls');;
const explorationItemCalls = require('../backend/explorationItemCalls');

// Mongoose Schemas
const User = require('../models/User');

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
        errorCheck(res, error);
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
        errorCheck(res, error);
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
        errorCheck(res, error);
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
        errorCheck(res, error);
    }
});

router.post("/users/:userId-:itemId/addPlan", async (req, res) => {
    // Update User Plan
    try {
        // Saving User Id and Item Id
        const userId = req.params.userId;
        const itemId = req.params.itemId;
        let planItem = {};

        // Getting user
        const user = await userCalls.getUserFromDB(userId);

        // Checking if User's Fav list is empty, if so no plan can be added
        if (user.favourites.length === 0) {
            throw new Error("No Fav Item found to be added Into Plan", { cause : { statusCode: 404}})
        }
        else if (user.favourites.includes(itemId)) {
            user.plans.forEach(plan => {
                if (plan.planItem._id.toString() === itemId) {
                    throw new Error("Same item found in User plans list", { cause : { statusCode: 404}})
                }
            })                        
        }

        // Getting the item
        const item = await explorationItemCalls.getExplorationItemFromDB(itemId);
        planItem = {
            name: item.name,
            planItem: item._id
        }

        // Adding new plan to users list
        await User.findByIdAndUpdate(userId, { $push : { plans : planItem } })
        res.send("Item added successfully");

    } catch (error) {
        errorCheck(res, error);
    }
});

router.put("/users/:userId/plans", (req, res) => {
    // Update a plan
    // TODO

    res.send("Update Plan");
});

router.delete("/users/:userId-:itemId/deletePlan", async (req, res) => {

    try {
        // Saving User Id and Item Id
        const userId = req.params.userId;
        const itemId = req.params.itemId;

        // Getting user
        const user = await userCalls.getUserFromDB(userId);

        let planToDelete;

        // If plan list empty, no need to delete
        if (user.plans.length === 0) {
            throw new Error("No Plan to be deleted", { cause : { statusCode: 404}})
        }
        else { // Checking for matching plan id
            for (let plan of user.plans) {
                if (plan.planItem._id.toString() === itemId) {    
                    planToDelete = plan;
                    break;
                }
            }                   
        }
        // Deletes Plan
        if (planToDelete) {
            await User.findByIdAndUpdate(userId, { $pull : { plans : planToDelete }}).exec();
            res.send("Successfully Deleted");
        }
        else 
            throw new Error("Wrong Id Sent", { cause: { statusCode : 404 }});
        
    } catch (error) {
        errorCheck(res, error);
    }
});

module.exports = router;

function errorCheck(res, error){
    if (error.name === "TypeError")
            res.status(404).send("Wrong ID sent");
    else if (error.cause) {
        res.status(error.cause.statusCode).send(error.toString());            
    }
    else
        res.status(500).send(error.toString());
}