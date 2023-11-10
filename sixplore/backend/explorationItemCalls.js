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
    }
}


async function getExplorationItemFromDB(itemId) {
    try {
        const item = await ExplorationItem.findById(itemId).exec();       
        return item;
    } catch (error) {
        console.error(error);
    }
}



module.exports = {
    addExplorationItemToDB,
    getExplorationItemFromDB
}
