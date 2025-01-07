const express = require('express');

const router = express.Router();
const controller = require('../controllers/tires.js');

router.get('/', controller.getTires);
router.post('/', controller.postTires);

module.exports = router;
