const User = require("../sixplore/models/User");
const ExplorationItem = require("../sixplore/models/ExplorationItem");
const mongoose = require("mongoose");

const dbName = "test";

/**
 * Initializing Database *
 * @returns Database
 */
async function dbInit() {
  try {
    await mongoose.connect(
      "mongodb+srv://sanjeev2001:6ixplore@cluster0.rrzjtgh.mongodb.net/?retryWrites=true&w=majority"
    );
    const db = mongoose.connection;

    // Removing prexisting entries in db
    db.dropCollection(User.collection.name);
    //db.dropCollection(ExplorationItem.collection.name);

    db.model("User", User.schema);
    db.model("ExplorationItem", ExplorationItem.schema);

    // Adding new entries
    // db.createCollection(User.collection.name);
    // db.createCollection(ExplorationItem.collection.name);

    // Creating 1 sample exploration case
    const testExplorationItem = new ExplorationItem({
      name: "Mcdonalds",
      description: "Restuarant lol",
      address: "7 ravenscroft road",
      stars: 1,
      type: "FOOD",
      tags: ["tag1", "tag2"],
      pictureURL: "https://picsum.photos/200/300",
    });

    await testExplorationItem.save();

    // Adding Dummy User Data to Database
    addDummyUserData(25, testExplorationItem);

    const testUser = new User({
      name: "John",
      email: "john@test.ca",
      password: "losdfsdfgsdfl",
      favourites: testExplorationItem,
      plans: { name: "asdad", planItem: testExplorationItem },
    });

    await testUser.save();

    return db;
  } catch (error) {
    console.error(error);
  }
}

/**
 * This fetches and adds dummy user data to our data base
 *
 * Api-endpoint: https://random-data-api.com/api/v2/users
 * Documentation: https://random-data-api.com/documentation
 * @param {Number} size
 * @param {mongoose.Document} testExplorationItem
 */
async function addDummyUserData(size, testExplorationItem) {
  const api_endpoint = `https://random-data-api.com/api/v2/users?size=${size}`;
  fetch(api_endpoint, {
    method: "GET",
  })
    .then((response) => {
      if (response.status !== 200) {
        return "error";
      }
      return response.json();
    })
    .then((data) =>
      data.forEach(async (user) => addUser(user, testExplorationItem))
    )
    .catch((error) => {
      console.log(error);
      throw new Error(
        `Error: ${error}\nSomething went wrong with the Dummy Data API`
      );
    });
}

/**
 * This function adds User into Database
 * @param {JSON} user
 * @param {mongoose.Document} tempExplorationItem
 */
async function addUser(user, tempExplorationItem) {
  const newUser = User({
    name: `${user.first_name} ${user.last_name}`,
    email: user.email,
    password: user.password,
    favourites: tempExplorationItem,
    plans: { name: "temp item", planItem: tempExplorationItem },
  });

  try {
    await newUser.save();
  } catch (error) {
    console.error(error);
  }
}
async function registerUser(userName, password, email) {
  const newUser = User({
    name: userName,
    email: email,
    password: password,
  });
  try {
    await newUser.save();
  } catch (error) {
    console.error(error);
  }
}

/**
 * This function retrieves User Info from the database
 * @param {String} name
 * @returns The User info in JSON format
 */
async function searchUser(name) {
  const user = await User.findOne({ name: name });
  return user;
}

module.exports = {
  dbInit,
  searchUser,
  registerUser,
};
