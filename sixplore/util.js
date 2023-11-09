
/**
 * @param {number} max Upper bound to be generated
 * @returns random number between 0 and max
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

module.exports = getRandomInt