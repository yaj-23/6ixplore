// Importing Mongoose Schemas
const User = require("../models/User");
const ExplorationItem = require("../models/ExplorationItem")

// Generated by ChatGPT, checkout dummy_Data folder
const dummyExplorationData = require('../dummy_Data/explorationData.json')
const mongoose = require("mongoose");

// Importing DB calls
const userCalls = require('../backend/userCalls');
const explorationItemCalls = require('../backend/explorationItemCalls');

// Declaring Database Name / Size
// CHECKING UTIL FILE FOR GLOBAL CONSTANTS
const util = require('../util')
const dbName = util.DATABASE_NAME;
const userCount = util.USERS_COUNT;
const maxUserPlanCount = util.MAX_USER_PLAN_COUNT;

/**
 * Initializing Database * 
 * @returns Database
 */
async function init () 
{
    try{
        await mongoose.connect(`mongodb+srv://admin:EiRWf7t6xkNcHsty@6ixplore.gt56rc8.mongodb.net/${dbName}`);
        const db = mongoose.connection;

        // Resetting DB entries so it doesnt stack every run
        //db.dropCollection(User.collection.name);
        //db.dropCollection(ExplorationItem.collection.name);

        // Adding User and Exploration Schemas to DB
        db.model("User", User.schema);
        db.model("ExplorationItem", ExplorationItem.schema);

        // Populating DB with dummy Data 
        // Note Exploration Data is hard capped to 23 entries (Check out data inside dummy_Data folder)
        await addDummyExplorationData();
        await addDummyUserData(userCount);        

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
 * @param {Number} size Size of Users to be added to DB
 */
async function addDummyUserData(size){
    
    const api_endpoint = `https://random-data-api.com/api/v2/users?size=${size}`;
    await fetch(api_endpoint, {
        method: "GET"
    })
    .then(response => {
        if (response.status !== 200) {
            return "error";
        }
        return response.json();
    })
    .then(data => {
        data.forEach(async user => {
            const favList = await addRandomFavoriteItems();            
            const newUser = {
                name: `${user.first_name} ${user.last_name}`,
                email : user.email,
                password : user.password,
                favourites : favList,    
                plans: await addRandomPlanItems(favList)
            }
            userCalls.addUserToDB(newUser);
        });
    })
    .catch(error => {
        console.log(error);
        throw(new Error(`Error: ${error}\nSomething went wrong with the Dummy Data API`));
    });
}

/**
 * Adding Dummy Exploration Data (Generated by ChatGPT) 
 * 
 * Check Out dummyData Folder
 */
async function addDummyExplorationData() {
    for (let item of dummyExplorationData) {
        await explorationItemCalls.addExplorationItemToDB(item);
    }
}

/**
 * 
 * @returns Return Random Plan Items to be Added to User (Dummy Data Purpose)
 */
async function addRandomPlanItems(favList) {
    // Getting Random Items from based on USER FAV LIST
    let array = []
    for (let item of favList) {
        // Randomly picking Fav items to add to plan
        if (Math.random() >= 0.5) {
            const tempItem = await explorationItemCalls.getExplorationItemFromDB(item._id);            
            array.push({
                name: tempItem.name,
                planItem: item._id
            })
        }
    }
    return array;   
}

/**
 * 
 * @returns Return Random Favorite Items to be added to User (Dummy Data Purpose)
 */
async function addRandomFavoriteItems() {
    // Getting Random Items from DB. Hard coded 15 as the highest number of fav items for now
    const randomFavItems = await getRandomExplorationItems(util.getRandomInt(maxUserPlanCount));
    let array = [];

    for (let item of randomFavItems) {
        array.push(item._id);
    }
    return array;
}

/**
 * 
 * @param {number} itemCount 
 * @returns Random number of exploration items from the database
 */
async function getRandomExplorationItems(itemCount) {
    try {
        const randomItems = await ExplorationItem.aggregate([
            { $sample: { size: itemCount } }
        ]);

        return randomItems;
    } catch (error) {
        throw new Error('Error fetching random exploration items');
    }
}

module.exports = init
