var User   = require('../../models/user');
var tokenService = require('../../services/tokenService');

exports = module.exports

// Request an access token by logging in with a username and password.
exports.login = function(req, res){
  // find the user
  User.findOne({
    email: req.body.email
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      // User with that name was not found
      res.json({ success: false, message: 'Authentication failed. User not found.' });
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

        var userResponse = user.toObject();
        userResponse.tokenExpiration = Math.trunc(expirationDate.getTime() / 1000);
        userResponse.token = token;

        // Send the response
        res.json({
          success: true,
          message: 'Login Succesfull!',
          user: userResponse
        });
      }
    }
  });
}

// Creates a new user.
exports.signup = function(req, res){
  // TODO: Do better validation on parameters.
  if (!req.body.email || !req.body.password || !req.body.displayName){
    res.json({success: false, message: 'You must provide a valid email, name, and password to signup.'});
  } else{
    User.findOne({
      email: req.body.email
    }, function(err, user) {

      if (err) throw err;

      if (user) {
        // User with that name was already found
        res.json({ success: false, message: 'That email is already in use.' });
      } else {
        var newUser = new User({
          email: req.body.email,
          displayName: req.body.displayName,
          password: req.body.password
        });

        newUser.save(function(err){
          if (err) throw err;

          // if user is found and password is right create a token
          var token = tokenService.createToken(newUser);

          // Determine the expirationDate of the token.
          var expirationDate = new Date();
          expirationDate.setHours(expirationDate.getHours() + tokenService.getTokenExpirationTime());

          var userResponse = newUser.toObject();
          userResponse.tokenExpiration = Math.trunc(expirationDate.getTime() / 1000);
          userResponse.token = token;

          // Send the response
          res.json({
            success: true,
            message: 'Signup Succesfull!',
            user: userResponse
          });
        })
      }
    });
  }
}
