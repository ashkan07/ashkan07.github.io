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
    const [result] = await db.query(
      `UPDATE users SET location_permission = ? WHERE name = 'John Doe'`,
      [locationPermission]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
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
