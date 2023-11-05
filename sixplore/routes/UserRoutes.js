const express = require('express');

const router = express.Router();

router.get("/users/:userId/favourites", (req, res) => {
    // Get all favourited items of user
    res.send("Get Favourite Items");
});

router.post("/users/:userId/favourites", (req, res) => {
    // Add an item to favourites
    res.send("Add to Favourites");
});

router.delete("/users/:userId/favourites", (req, res) => {
    // Remove an item from favourites
    res.send("Remove from Favourites");
});

router.get("/users/:userId/plans", (req, res) => {
    // Get all plans of user
    res.send("Get Plans");
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
