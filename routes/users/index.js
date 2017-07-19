var Router = require('express').Router;
var controller = require('./controller');

const router = new Router();

router.get('/', controller.getUsers);

module.exports = router;
