const express = require('express');

const router = express.Router();

const controller = require('../controllers/location.js')

router.get('/', controller.getLocation);
router.post('/', controller.updateLocation);

module.exports = router;