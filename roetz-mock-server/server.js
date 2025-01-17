const express = require('express');
const os = require('os');
const app = express();

const telemetryEndpoints = require('./src/routes/telemetry')
const heartbeatEndpoints = require('./src/routes/heartbeat')
const tireEndpoints = require('./src/routes/tires')
const lockEndpoints = require('./src/routes/lock')
const locationEndpoints = require('./src/routes/location')
const permissionEndpoints = require('./src/routes/permission')
const batteryEndpoints = require('./src/routes/battery')
const speedEndpoints = require('./src/routes/speed')

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';

// Function to get the local IP address
function getLocalIPAddress() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const net of interfaces[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                return net.address;
            }
        }
    }
    return '127.0.0.1'; // Fallback to localhost if no external IP is found
}

app.use(express.json());
app.use('/telemetry', telemetryEndpoints)
app.use('/heartbeat', heartbeatEndpoints)
app.use('/tires', tireEndpoints)
app.use ('/lock', lockEndpoints)
app.use('/location', locationEndpoints)
app.use('/permission', permissionEndpoints)
app.use('/battery', batteryEndpoints)
app.use('/speed', speedEndpoints)

app.listen(PORT, () => {
    const ipAddress = getLocalIPAddress();
    console.log(`Server is running at http://${ipAddress}:${PORT}`);
    console.log(`Listening at port: ${PORT}`)
})