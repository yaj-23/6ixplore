let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let proposalItemSchema = new Schema({
    name: { type: String, require: true },
    description: { type: String, require: true },
    address: { type: String, require: true },
    stars: { type: Number, require: true },
    type: { type: String, enum: ['ACTIVITY', 'FOOD', 'PLACE'], require: true },
    hours: {
        type: Object,
        items: {
            type: Object,
            items: {
                type: String
            },
            enum: ['start', 'end'],
            default: { start: 'test' }
        },
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    },
    tags: { type: [String], require: true },
    pictureURL: { type: String, require: false },
    hoursOfOperation: { type: String, require: false }
});

module.exports = mongoose.model('ProposalItem', proposalItemSchema);