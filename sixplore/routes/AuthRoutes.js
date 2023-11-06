const express = require('express');

const router = express.Router();

router.post("/signup", (req, res) => {
    // Create an account with email and password
    res.send("Sign up");
});

router.post("/login", (req, res) => {
    // Verify account credentials and return userId
    res.send("Login");
});

router.delete("/delete-account", (req, res) => {
    // Delete account
    res.send("Delete account");
});

module.exports = router;
