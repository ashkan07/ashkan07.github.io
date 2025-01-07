const lock = require('../models/lock');

// Get bike lock status
exports.getLockStatus = (req, res) => {
    res.json({
        lockStatus: lock.lockStatus,
    });
};

// Update bike lock status
exports.updateLockStatus = (req, res) => {
    const { lockStatus } = req.body;

    lock.lockStatus = lockStatus;
    res.status(200).json({
        message: "Lock status updated successfully",
        lockStatus: lock.lockStatus,
    });
};
