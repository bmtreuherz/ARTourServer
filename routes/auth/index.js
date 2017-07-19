var Router = require('express').Router;
var controller = require('./controller');

const router = new Router();

router.post('/login', controller.login);
router.post('/signup', controller.signup)

module.exports = router;
