var Router = require('express').Router;
var controller = require('./controller');

const router = new Router();

router.get('/', controller.getGroups);
router.get('/myGroups', controller.getMyGroups);
router.post('/create', controller.createGroup);
router.post('/join', controller.joinGroup);

module.exports = router;
