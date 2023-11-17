const ExplorationItem = require("../models/ExplorationItem")
const mongoose = require('mongoose');

/**
 * This function adds Exploration item into Database
 * @param {JSON} item 
 */
async function addExplorationItemToDB(item) {

    try {
        await ExplorationItem.create(item);

    } catch (error) {
        console.error(error);
        throw Error("Some Error Occured: ", error);
    }
}

/**
 * 
 * @param {mongoose.ObjectId} itemId 
 * @returns 
 */
async function getExplorationItemFromDB(itemId) {
    try {
        const item = await ExplorationItem.findById(itemId);       
        return item;
    } catch (error) {
        if (error instanceof mongoose.Error.CastError)
            throw new Error('Fetching item failed', { cause : {statusCode : 404, errMessage : error }})
        else throw new Error('Fetching item failed', { cause : { statusCode : 500, errMessage : error }})
    }
}

/**
 * 
 * @returns All exploration items from database
 */
async function getAllItems() {
    try {
        const itemList = await ExplorationItem.find({});
        return itemList;
    } catch (error) {
        console.error(error);
        throw Error("Some Error Occured: ", error); 
    }
}

module.exports = {
    addExplorationItemToDB,
    getExplorationItemFromDB,
    getAllItems
}