var User   = require('../../models/user');
var tokenService = require('../../services/tokenService');

exports = module.exports

// Request an access token by logging in with a username and password.
exports.login = function(req, res){
  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      // User with that name was not found
      res.json({ success: false, message: 'Authentication failed. Invalid username.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right create a token
        var token = tokenService.createToken(user);

        // Determine the expirationDate of the token.
        var expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + tokenService.getTokenExpirationTime());

        // Send the response
        res.json({
          success: true,
          message: 'Login Succesfull!',
          token: token,
          expirationDate: Math.trunc(expirationDate.getTime() / 1000),
          user: user
        });
      }
    }
  });
}

// Creates a new user.
exports.signup = function(req, res){
  // TODO: Do better validation on parameters.
  if (!req.body.name || !req.body.password){
    res.json({success: false, message: 'You must provide a valid username and password to signup.'});
  } else{
    User.findOne({
      name: req.body.name
    }, function(err, user) {

      if (err) throw err;

      if (user) {
        // User with that name was already found
        res.json({ success: false, message: 'That username is already in use.' });
      } else {
        var newUser = new User({
          name: req.body.name,
          password: req.body.password,
          admin: false
        });

        newUser.save(function(err){
          if (err) throw err;

          // if user is found and password is right create a token
          var token = tokenService.createToken(newUser);

          // Determine the expirationDate of the token.
          var expirationDate = new Date();
          expirationDate.setHours(expirationDate.getHours() + tokenService.getTokenExpirationTime());

          // Send the response
          res.json({
            success: true,
            message: 'Signup Succesfull!',
            token: token,
            expirationDate:Math.trunc(expirationDate.getTime() / 1000),
            user: newUser
          });
        })
      }
    });
  }
}
