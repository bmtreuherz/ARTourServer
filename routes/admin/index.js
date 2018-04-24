var Router = require('express').Router;
var controller = require('./controller');

const router = new Router();

router.post('/feature', controller.feature);
router.post('/deleteFeature', controller.deleteFeature);

router.post('/script', controller.script);
router.post('/deleteScript', controller.deleteScript);

module.exports = router;
