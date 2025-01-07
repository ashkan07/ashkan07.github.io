let lastHeartBeat = Date.now();

exports.heartbeat = (req, res) => {
    lastHeartBeat = Date.now();
    res.sendStatus(200)
}

exports.getDeviceOnline = (req, res) => {
    const isOnline = Date.now() - lastHeartBeat < 30 * 1000;
    res.json({
        OnlineStatus: isOnline
    })
}
