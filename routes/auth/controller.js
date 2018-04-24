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
        var currentDate = Math.floor(Date.now() / 1000)
        console.log(currentDate)
        expirationDate = currentDate + 60 * 60 * tokenService.getTokenExpirationTime();
        console.log(expirationDate)

        var userResponse = user.toObject();
        userResponse.tokenExpiration = expirationDate;
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

  if (!req.body.email || !req.body.password){
    res.json({success: false, message: 'You must provide a valid email, and password to signup.'});
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
          password: req.body.password
        });

        newUser.save(function(err){
          if (err) throw err;

          // if user is found and password is right create a token
          var token = tokenService.createToken(newUser);

          // Determine the expirationDate of the token.
          var currentDate = Math.floor(Date.now() / 1000)
          expirationDate = currentDate + 60 * 60 * tokenService.getTokenExpirationTime();

          var userResponse = newUser.toObject();
          userResponse.tokenExpiration = expirationDate;
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
