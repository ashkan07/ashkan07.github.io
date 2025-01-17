const db = require('../../db');

// This function currently fetches and updates location permission for John Doe.
// The location permission is stored in the users table in the database.
// Update this function when implementing multiple users.

// Get location permission for John Doe
exports.getLocationPermission = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT location_permission FROM users WHERE name = 'John Doe' LIMIT 1`
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ locationPermission: rows[0].location_permission });
  } catch (error) {
    console.error('Error fetching location permission:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update location permission for John Doe
exports.updateLocationPermission = async (req, res) => {
  const { locationPermission } = req.body;

  if (typeof locationPermission !== 'boolean') {
    return res.status(400).json({ message: 'Invalid locationPermission value' });
  }

  try {
    const userId = 1; // Assuming John Doe's user ID is 1

    const [result] = await db.query(
      `UPDATE users SET location_permission = ? WHERE user_id = ?`,
      [locationPermission, userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Ensure default location (0,0) is set
    if (locationPermission) {
      await db.query(
        `INSERT INTO locations (bike_id, latitude, longitude) 
         SELECT bike_id, 0, 0 FROM bikes WHERE user_id = ?
         ON DUPLICATE KEY UPDATE latitude = 0, longitude = 0`,
        [userId]
      );
    }

    res.status(200).json({
      message: 'Location permission updated successfully',
      locationPermission,
    });
  } catch (error) {
    console.error('Error updating location permission:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.revokeLocationPermission = async (req, res) => {
  try {
    const userId = 1; // Assuming John Doe's user ID is 1

    // Step 1: Fetch all bike IDs associated with John Doe
    const [bikes] = await db.query(
      `SELECT bike_id FROM bikes WHERE user_id = ?`,
      [userId]
    );

    if (bikes.length === 0) {
      return res.status(404).json({ message: 'No bikes found for John Doe' });
    }

    // Step 2: Extract all bike IDs
    const bikeIds = bikes.map((bike) => bike.bike_id);

    // Step 3: Delete all location data for these bikes
    const [deleteResult] = await db.query(
      `DELETE FROM locations WHERE bike_id IN (?)`,
      [bikeIds]
    );

    // Step 4: Insert default location (0,0) for all bikes
    for (const bikeId of bikeIds) {
      await db.query(
        `INSERT INTO locations (bike_id, latitude, longitude)
         VALUES (?, 0, 0)
         ON DUPLICATE KEY UPDATE latitude = 0, longitude = 0`,
        [bikeId]
      );
    }

    // Step 5: Revoke location permission for John Doe
    const [updateResult] = await db.query(
      `UPDATE users SET location_permission = ? WHERE user_id = ?`,
      [false, userId]
    );

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Location permission revoked successfully. Default location set to (0,0).',
    });
  } catch (error) {
    console.error('Error revoking location permission:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};