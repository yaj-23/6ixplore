const express = require('express');
const userModel = 

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
app.get("/user/:id", (req, res) => {
    // res.send(`success`);
    const user = req.params.id;
    console.log(user);

    if (user === "John")
        res.send("success");
    else    
        res.send("fail");
    // console.log("test");
    // for (const key in req.query) {
    //     console.log(key, req.query[key]);
    // }
});

// Location API Calls
app.get("/explore", (req, res) => {
    res.send("Exploration Items");
});
