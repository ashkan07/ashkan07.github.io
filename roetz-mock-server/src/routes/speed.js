const express = require('express');
const router = express.Router();

const controller = require('../controllers/speed.js');

router.get('/', controller.getSpeed);
router.post('/', controller.updateSpeed);
module.exports = router;
