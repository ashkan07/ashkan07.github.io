const express = require('express');
const router = express.Router();

const controller = require('../controllers/permission.js');

router.get('/', controller.getLocationPermission);
router.post('/', controller.updateLocationPermission);
module.exports = router;
