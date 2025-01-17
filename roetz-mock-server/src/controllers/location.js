const db = require('../../db'); 

// This function currently hardcodes the bike ID to 1.
// Update this feature when implementing multiple bikes and users.

// Get GPS location (latitude and longitude) for bike ID 1
exports.getLocation = async (req, res) => {
    try {
        const [rows] = await db.execute(
            `SELECT latitude, longitude, timestamp 
             FROM locations 
             WHERE bike_id = 1 
             ORDER BY timestamp DESC 
             LIMIT 1`
        );

        if (rows.length === 0) {
            return res.status(404).json({
                error: "No location data found for bike ID 1",
            });
        }

        const { latitude, longitude, timestamp } = rows[0];

        res.json({
            latitude,
            longitude,
            timestamp,
        });
    } catch (err) {
        console.error("Error fetching location data:", err);
        res.status(500).json({
            error: "Internal server error while fetching location data",
        });
    }
};

// Update GPS location (latitude and longitude)
exports.updateLocation = async (req, res) => {
    const { latitude, longitude } = req.body;

    // Validate the inputs
    if (
        latitude === undefined ||
        longitude === undefined ||
        typeof latitude !== "number" ||
        typeof longitude !== "number"
    ) {
        return res.status(400).json({
            error: "Both latitude and longitude are required and must be numbers",
        });
    }

    try {
        await db.execute(
            `INSERT INTO locations (bike_id, latitude, longitude) 
             VALUES (1, ?, ?)`,
            [latitude, longitude]
        );

        res.status(200).json({
            message: "Location updated successfully",
            latitude,
            longitude,
        });
    } catch (err) {
        console.error("Error updating location data:", err);
        res.status(500).json({
            error: "Internal server error while updating location data",
        });
    }
};
