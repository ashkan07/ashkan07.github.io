var express = require('express');
var router = express.Router();

// Define the lock object, which was previously in the model
let lock = {
    lockStatus: false, // Default state
};

// Get bike lock status
router.get('/', (req, res) => {
    res.json({
        lockStatus: lock.lockStatus,
    });
});

// Update bike lock status
router.post('/', (req, res) => {
    console.log(req.body);  // Check what you're receiving

    const { lockStatus } = req.body;

    if (typeof lockStatus !== 'boolean') {
        return res.status(400).json({ message: 'Invalid lockStatus' });
    }

    lock.lockStatus = lockStatus;

    res.status(200).json({
        message: 'Lock status updated successfully',
        lockStatus: lock.lockStatus,
    });
});


module.exports = router;
