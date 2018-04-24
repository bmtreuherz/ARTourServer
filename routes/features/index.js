var Router = require('express').Router;
var controller = require('./controller');

const router = new Router();

router.get('/', controller.features);

// TODO: This doesn't really belong here semantically but its okay for now.
router.get('/scripts', controller.scripts);

module.exports = router;
