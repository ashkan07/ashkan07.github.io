const db = require("../../db");

let battery = {
  isCharging: false,
  percentage: 0,
};

exports.getBattery = (req, res) => {
  res.json(battery);
};

exports.getPreferences = async (req, res) => {
  const bikeId = 1; // Assuming John Doe's user ID is 1
  try {
    const [rows] = await db.query(
      `SELECT charging_limit, use_charging_limit FROM bike_preferences WHERE bike_id = ? LIMIT 1`,
      [bikeId]
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Bike not found" });
    }
    res.json({ chargingPreferences: rows[0] });
  } catch (error) {
    console.error("Error fetching bike preferences:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.postBattery = (req, res) => {
  // Check if fields are present
  if (
    typeof req.body.isCharging === undefined ||
    typeof req.body.percentage === undefined
  ) {
    return res.status(400).json({
      error: "Missing required fields: 'isCharging' and/or 'percentage'",
    });
  }

  // Check if isCharging is a boolean
  if (req.body.isCharging !== 0 && req.body.isCharging !== 1) {
    return res.status(400).json({ error: "'isCharging' must be 0 or 1" });
  }

  // Check if percentage is a number between 0 and 100
  if (
    typeof req.body.percentage !== "number" ||
    req.body.percentage < 0 ||
    req.body.percentage > 100
  ) {
    return res
      .status(400)
      .json({ error: "'percentage' must be a number between 0 and 100" });
  }

  // Update battery
  battery = {
    isCharging: req.body.isCharging !== 0,
    percentage: req.body.percentage,
  };
  res.status(200).json({ message: "Battery updated" });
};

exports.postPreferences = async (req, res) => {
  // Check if fields are present
  if (
    typeof req.body.chargingLimit === undefined ||
    typeof req.body.useChargingLimit === undefined
  ) {
    return res.status(400).json({
      error:
        "Missing required fields: 'chargingLimit' and/or 'useChargingLimit'",
    });
  }

  // Check if chargingLimit is a number between 0 and 100
  if (
    typeof req.body.chargingLimit !== "number" ||
    req.body.chargingLimit < 0 ||
    req.body.chargingLimit > 100
  ) {
    return res
      .status(400)
      .json({ error: "'chargingLimit' must be a number between 0 and 100" });
  }

  // Check if useChargingLimit is a boolean
  if (req.body.useChargingLimit !== 0 && req.body.useChargingLimit !== 1) {
    return res.status(400).json({ error: "'useChargingLimit' must be 0 or 1" });
  }

  try {
    const bikeId = 1; // Assuming John Doe's bike ID is 1

    const [result] = await db.query(
      `UPDATE bike_preferences SET charging_limit = ?, use_charging_limit = ? WHERE bike_id = ?`,
      [req.body.chargingLimit, req.body.useChargingLimit === 1, bikeId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Bike not found" });
    }

    preferences = {
      chargingLimit: req.body.chargingLimit !== 0,
      useChargingLimit: req.body.useChargingLimit,
    };
    res.status(200).json({ message: "Preferences updated" });
  } catch (error) {
    console.error("Error updating preferences:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
