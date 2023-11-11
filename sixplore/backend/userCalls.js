const mongoose = require("mongoose");
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
        throw Error("Some Error Occured: ", error);
    }
}

/**
 * This function retriever User info from DB
 * @param {mongoose.ObjectId} userId 
 * @returns User
 */
async function getUserFromDB(userId) {
    try {
        const user = await User.findById(userId).exec();        
        return user;
    } catch (error) {   
        if (error instanceof mongoose.Error.CastError)
            throw new Error('Fetching user failed', { cause : {statusCode : 404, errMessage : error }})
        else throw new Error('Fetching user failed', { cause : { statusCode : 500, errMessage : error }})

    }    
}


module.exports = {
    addUserToDB,
    getUserFromDB
}

