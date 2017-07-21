var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// module.exports = mongoose.model('User', new Schema({
//     name: String,
//     password: String,
//     admin: Boolean
// }));
module.exports = mongoose.model('User', new Schema({
    email: String,
    displayName: String,
    password: String,
}));
