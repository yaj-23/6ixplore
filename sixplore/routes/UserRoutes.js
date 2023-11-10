const express = require('express');
const router = express.Router();
const userCalls = require('../backend/userCalls');;
const explorationItemCalls = require('../backend/explorationItemCalls');
// const mongoose = require("mongoose");

router.get("/users/:userId/favourites", async (req, res) => {
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

router.post("/users/:userId/favourites", (req, res) => {
    // Add an item to favourites
    res.send("Add to Favourites");
});

router.delete("/users/:userId/favourites", (req, res) => {
    // Remove an item from favourites
    res.send("Remove from Favourites");
});

router.get("/users/:userId/plans", async (req, res) => {
    try {
        // Saving get request parameters
        const userId = req.params.userId;
        console.log(userId);
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

router.post("/users/:userId/plans", (req, res) => {
    // Add a new plan
    res.send("Add Plan");
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
