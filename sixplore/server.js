const express = require("express");
const { dbInit, searchUser, registerUser } = require("../sixplore/database");

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
app.get("/register/:userName-:password-:email", (req, res) => {
  const userName = req.params.userName;
  const password = req.params.password;
  const email = req.params.email;
  const user = searchUser(userName);
  user
    .then((userInfo) => {
      if (userInfo === null) {
        registerUser(userName, password, email);
        res.send("Successfully added new user");
        //we can add a user with this info
      } else {
        console.log(userInfo);
        res.send("Username already exists");
        // user already exists
      }
    })
    .catch((error) => {
      console.log(error);
      res.send("Database error");
    });
});
// User Auth API Calls
app.get("/login/:userName-:password", (req, res) => {
  const userName = req.params.userName;
  const password = req.params.password;

  const user = searchUser(userName);
  user
    .then((userInfo) => {
      if (userInfo === null) {
        console.error("Incorrect Username");
        res.send("Incorrect Username");
      } else {
        if (userInfo.password == password) {
          res.send("Successfully Logged in");
        } else {
          res.send("Incorrect Password");
        }
      }
    })
    .catch((error) => {
      console.log(error);
      res.send("Database error");
    });
});
// User Profile API Calls
app.get("/user/:id", (req, res) => {
  const userName = req.params.id;
  const user = searchUser(userName);

  user
    .then((userInfo) => {
      if (userInfo === null) {
        console.error("User not found");
        res.send("User not found");
      } else res.send(userInfo);
    })
    .catch((error) => {
      console.log(error);
      res.send("Database error");
    });
});

// Location API Calls
app.get("/explore", (req, res) => {
  res.send("Exploration Items");
});
