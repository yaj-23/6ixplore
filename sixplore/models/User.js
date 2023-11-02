let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true, minLength: 8 },
    favourites: [{ type: Schema.Types.ObjectId, ref: 'ExplorationItem' }],
    plans: [{
        name: { type: String, require: true },
        planItem: [{ type: Schema.Types.ObjectId, ref: 'ExplorationItem' }]
    }]
});

module.exports = mongoose.model('User', userSchema);
