var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Script', new Schema({
    beaconID: Number,
    language: String,
    value: String
}));
