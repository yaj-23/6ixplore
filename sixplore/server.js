const express = require('express');
const { dbInit, searchUser } = require('../sixplore/database');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());


app.listen(PORT, () => {
    console.log("Server listening on port", PORT);
    try {
        dbInit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
});

// User Auth API Calls
app.get("/login", (req, res) => {
    res.send("Login");
});

// User Profile API Calls
app.get("/user/:id", (req, res) => {
    const userName = req.params.id;
    const user = searchUser(userName);
    
    user
    .then(userInfo => { 
        if (userInfo === null) {
            console.error("User not found");
            res.send("User not found");
        }
        else             
            res.send(userInfo);
    })
    .catch(error => {
        console.log(error);
        res.send("Database error");     
    })
});

// Location API Calls
app.get("/explore", (req, res) => {
    res.send("Exploration Items");
});
