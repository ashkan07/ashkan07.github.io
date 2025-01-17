const speedModel = require('../models/speed');

exports.getSpeed = (req, res) => {
    res.json({
        speed: speedModel.speed,
    });
};

exports.updateSpeed = (req, res) => {
    const { speed } = req.body;

    // if speed is not provided in the request body
    if (!speed) {
        return res.status(400).json({
            message: "Speed value is required.",
        });
    }

    // if speed is not a number or not an integer or less than 0
    if (typeof speed !== "number" || speed < 0) {
        return res.status(400).json({
            message: "Speed must be a number and greater than or equal to 0.",
        });
    }

    // if speed is not a whole number
    if (!Number.isInteger(speed)) {
        return res.status(400).json({
            message: "Speed must be a whole number.",
        });
    }

    speedModel.speed = speed;
    res.status(200).json({
        message: "Speed updated successfully",
        speed: speedModel.speed,
    });
};
