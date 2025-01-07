const express = require('express');

const router = express.Router();

const controller = require('../controllers/lock.js')

router.get('/lock-status', controller.getLockStatus);
router.post('/lock-status', controller.updateLockStatus);

module.exports = router;



