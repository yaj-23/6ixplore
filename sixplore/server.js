const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.listen(PORT, () => {
    console.log("Server listening on port", PORT);
});

// User Auth API Calls
app.get("/login", (req, res) => {
    res.send("Login");
});

// User Profile API Calls
app.get("/user", (req, res) => {
    res.send("User Profile");
});

// Location API Calls
app.get("/explore", (req, res) => {
    res.send("Exploration Items");
});
