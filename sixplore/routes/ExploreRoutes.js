const express = require('express');
const router = express.Router();

// Database Access Calls
const explorationItemCalls = require('../backend/explorationItemCalls');

router.get("/explore", async (req, res) => {
    // Gets all available exploration items
    try {
        res.send(await explorationItemCalls.getAllItems());
    } catch (error) {
        console.error(error);
        res.status(500).send(error.toString());
    }
});

router.get("/item/:itemid", async (req, res) => {
    // Get a unique item
    try {
        const itemId = req.params.itemid;
        res.send(await explorationItemCalls.getExplorationItemFromDB(itemId));
    } catch (error) {
        console.error(error.toString());
        res.status(500).send(error.toString());
    }
})

module.exports = router;