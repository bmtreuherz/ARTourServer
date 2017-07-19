var jwt    = require('jsonwebtoken');
var config = require('../config');

exports = module.exports

// Creates an access token.
exports.createToken = function(user){
  return jwt.sign(user, config.secret, {
    expiresIn: config.tokenExpirationTime + 'h'
  });
}

// Returns how long tokens have before they expire.
exports.getTokenExpirationTime = function(){
  return config.tokenExpirationTime;
}

// Verifies that there is a valid token associated with a request.
exports.validateToken = function(req, callback){
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    // Verify the token is valid
    jwt.verify(token, config.secret, function(err, decoded) {
      if (err) {
        callback({ success: false, message: 'Failed to authenticate token.' });
      } else {

        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        callback({ success: true, message: 'Authentication Succesfull.' });
      }
    });

  } else {
    // if there is no token return an error
    callback({ success: false, message: 'No token provided.'});
  }
}
