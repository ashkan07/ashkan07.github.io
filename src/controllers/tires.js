let tirePressure = {
    front: 3.3,
    rear: 3.2
}

exports.getTires = (req, res) => {
    res.json(tirePressure);
}

exports.postTires = (req, res) => {
    tirePressure = {
        front: req.body.front,
        rear: req.body.rear
    }
    res.send(200);
}