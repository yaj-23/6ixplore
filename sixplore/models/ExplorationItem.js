let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let explorationItemSchema = new Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    address: { type: String, require: true },
    stars: { type: Number, require: true },
    type: { type: String, enum: ['ACTIVITY', 'FOOD', 'PLACE'], require: true },
    tags: { type: [String], require: true },
    pictureURL: { type: String, require: false }
});

module.exports = mongoose.model('ExplorationItem', explorationItemSchema);