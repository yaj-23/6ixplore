const express = require('express');
const router = express.Router();

// Database Access Calls
const userCalls = require('../backend/userCalls');;
const explorationItemCalls = require('../backend/explorationItemCalls');

// Mongoose Schemas
const User = require('../models/User');


router.get("/users/:userId/favourites", async (req, res) => {
    // Fetch All User Favorites
    try {
        // Saving get request parameters
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
        res.status(500).send("Internal Server Error");
    }
    
});

router.post("/users/:userId-:itemId/favourites", async (req, res) => {
    // Add Favorite Item to User Item List
    try {
        // Add an item to favourites
        const userId = req.params.userId;
        const itemId = req.params.itemId;

        // Saving requested item and user
        const item = await explorationItemCalls.getExplorationItemFromDB(itemId);
        const user = await User.findById(userId);

        // Checking if user has any fav items at all
        if (user.favourites.length > 0) {
            // Checking if user has already favorited recieved item
            if (user.favourites.includes(item._id)){
                res.status(400).send("Item already favorited by User");
            }
        }
        else {
            await User.findByIdAndUpdate(userId, { $push : { favourites : item } }).exec();
            res.send("Success");
        }        

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
    
});

router.delete("/users/:userId-:itemId/favourites", async (req, res) => {
    // Remove an item from User favourites
    try {
         // Add an item to favourites
        const userId = req.params.userId;
        const itemId = req.params.itemId;
 
         // Saving requested item and user
        const item = await explorationItemCalls.getExplorationItemFromDB(itemId);
        const user = await userCalls.getUserFromDB(userId);
 
        // Checking if list is empty
        if (user.favourites.length === 0) {
            res.status(400).send("Empty fav list, nothing to be removed");
        } // Checking if item in user db, if so, deletes it
        else if(user.favourites.includes(item._id)) {
            await User.findByIdAndUpdate(userId, { $pull : { favourites : item._id } }).exec();
            res.send("Successfully Removed Favorite Item");
        }
        else { // Sending error message because item not in User's list
            res.status(400).send("Item recieved is not in User's favorite list");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/users/:userId/plans", async (req, res) => {
    // Getting all plans from user 
    try {
        // Saving get request parameters
        const userId = req.params.userId;
        // Grabbing user from database
        const user = await userCalls.getUserFromDB(userId);
        let planList = [];

        console.log(user.plans);
        // Saving all user plan items into a list
        for (const plan of user.plans) {
            const planItem = await explorationItemCalls.getExplorationItemFromDB(plan.planItem);
            planList.push(planItem);
        }
        
        // Sending back plan item list
        res.send(planList);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

router.post("/users/:userId-:itemId/plans", async (req, res) => {
    // Update User Plan
    // TODO
    res.send("TODO")
});

router.put("/users/:userId/plans", (req, res) => {
    // Update a plan
    res.send("Update Plan");
});

router.delete("/users/:userId/plans", (req, res) => {
    // Delete a plan
    res.send("Delete Plan");
});

module.exports = router;
