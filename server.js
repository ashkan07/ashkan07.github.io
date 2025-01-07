const express = require('express');

const app = express();

const telemetryEndpoints = require('./src/routes/telemetry')
const heartbeatEndpoints = require('./src/routes/heartbeat')
const tireEndpoints = require('./src/routes/tires')
const lockEndpoints = require('./src/routes/lock')
const locationEndpoints = require('./src/routes/location')
const permissionEndpoints = require('./src/routes/permission')

const PORT = 3000;

app.use(express.json());
app.use('/telemetry', telemetryEndpoints)
app.use('/heartbeat', heartbeatEndpoints)
app.use('/tires', tireEndpoints)
app.use ('/lock', lockEndpoints)
app.use('/location', locationEndpoints)
app.use('/permission', permissionEndpoints)

app.listen(PORT, () => {
    console.log(`Listening at port: ${PORT}`)
})