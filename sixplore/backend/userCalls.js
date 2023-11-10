const User = require("../models/User");

/**
 * This function adds User into DB
 * @param {JSON} user 
 * @returns Boolean
 */
async function addUserToDB(user) {
    try 
    {   
        await User.create(user);  
        return true
    }catch(error){
        console.error(error);
    }
}

/**
 * This function retriever User info from DB
 * @param {Number} userId 
 * @returns User
 */
async function getUserFromDB(userId) {
    try {
        const user = await User.findById(userId).exec();        
        return user;
    } catch (error) {
        console.error(error);    
    }    
}


module.exports = {
    addUserToDB,
    getUserFromDB
}

