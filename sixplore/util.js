// GLOBAL CONSTANTS
const MAX_DUMMY_USERS_COUNT = 25;
const DATABASE_NAME = "test";
// This number determines how many plans DUMMY user can have
// Should be less than the dummy exploration data count which is currently 23
const MAX_DUMMY_USER_PLAN_COUNT = 15; 


// Some UTIL functions
/**
 * @param {number} max Upper bound to be generated
 * @returns random number between 0 and max
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


module.exports = { 
    getRandomInt,
    USERS_COUNT: MAX_DUMMY_USERS_COUNT,
    DATABASE_NAME,
    MAX_USER_PLAN_COUNT: MAX_DUMMY_USER_PLAN_COUNT
}