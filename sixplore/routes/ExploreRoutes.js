const express = require('express');

const router = express.Router();

router.get("/explore", (req, res) => {
    // Get all available exploration items
    res.send("Exploration Items");
});

module.exports = router;
