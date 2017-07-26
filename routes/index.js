var Router = require('express').Router;
var auth = require('./auth');
var users = require('./users');
var groups = require('./groups');
var events = require('./events');
var tokenService = require('../services/tokenService');

const router = new Router();

// Routes for authentication
router.use('/auth', auth);

// Middleware for token validation
router.use(function(req, res, next) {
  tokenService.validateToken(req, function(result){
    if(result.success){
      next();
    }else{
      return res.status(403).send(result);
    }
  });
});

// NOTE: All routes after this line will require a valid token
router.use('/users', users); 
router.use('/groups', groups);
router.use('/events', events);


module.exports = router;
