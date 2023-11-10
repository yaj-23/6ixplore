const ExplorationItem = require("../models/ExplorationItem")


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


async function getExplorationItemFromDB(itemId) {
    try {
        const item = await ExplorationItem.findById(itemId).exec();       
        return item;
    } catch (error) {
        console.error(error);
        throw Error("Some Error Occured: ", error);
    }
}



module.exports = {
    addExplorationItemToDB,
    getExplorationItemFromDB
}
