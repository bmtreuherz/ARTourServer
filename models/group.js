var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Group', new Schema({
    name: String,
    description: String,
    password: String,
    admins: [String],
    events: [String],
    members: [String]
}));
