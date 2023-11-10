const express = require('express');
const router = express.Router();

// Database Access Calls
const userCalls = require('../backend/userCalls');;
const explorationItemCalls = require('../backend/explorationItemCalls');


router.get("/explore", (req, res) => {
    // Get all available exploration items
    res.send("Exploration Items");
});

router.get("/item/:itemid", async (req, res) => {
    // Adding item route to fetch item ID (needed for other performing many requests)
    // TODO
})

module.exports = router;
