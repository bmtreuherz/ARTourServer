var User   = require('../../models/user');

exports = module.exports

exports.getUsers = function(req, res){
  User.find({}, function(err, users) {
    if (err) throw err;
    res.json(users);
  });
}
