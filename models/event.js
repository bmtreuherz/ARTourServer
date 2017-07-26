var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Event', new Schema({
    name: String,
    location: String,
    description: String,
    group: String,
    date: Date,
    deadline: Date,
    capacity: Number,
    tag: String,
    requestedUsers: [String],
    acceptedUsers: [String],
    registrationOpen: {type: Boolean, default: true}
}));
