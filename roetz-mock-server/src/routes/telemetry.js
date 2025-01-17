const express = require('express');

const router = express.Router();
const controller = require('../controllers/telemetry.js');

router.get('/all', controller.getAll);

router.post('/tire-pressure', controller.updateTirePressure);
router.post('/battery-percentage', controller.updateBatteryPercentage);
router.post('/lock-status', controller.updateLockStatus);

module.exports = router;