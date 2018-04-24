var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Feature', new Schema({
    name: String,
    beaconID: {type: Number, unique: true, required: true},
    long: Number,
    lat: Number,
    imageLink: String
    // Scripts will be aggregated later.
}));
