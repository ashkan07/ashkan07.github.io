const express = require('express');

const router = express.Router();

const controller = require('../controllers/heartbeat')

router.post('/', controller.heartbeat)
router.get('/', controller.getDeviceOnline)

module.exports = router;



