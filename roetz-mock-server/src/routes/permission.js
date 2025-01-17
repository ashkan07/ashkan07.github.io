const express = require('express');
const router = express.Router();

const controller = require('../controllers/permission.js');

router.get('/', controller.getLocationPermission);
router.post('/', controller.updateLocationPermission);
router.post('/revoke', controller.revokeLocationPermission);
module.exports = router;
