const express = require('express');

const router = express.Router();
const controller = require('../controllers/battery.js');

router.get('/status', controller.getBattery);
router.post('/update', controller.postBattery);
router.get('/preferences', controller.getPreferences);    
router.post('/preferences', controller.postPreferences);    

module.exports = router;
