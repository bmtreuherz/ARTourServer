var Router = require('express').Router;
var controller = require('./controller');

const router = new Router();

router.get('/', controller.getEventsForGroups);
router.get('/explore', controller.getExploreEvents);
router.get('/pending', controller.getPendingEvents);
router.get('/accepted', controller.getAcceptedEvents);
router.post('/create', controller.createEvent);
router.post('/join', controller.joinEvent);
router.post('/close', controller.closeEvent);

module.exports = router;
