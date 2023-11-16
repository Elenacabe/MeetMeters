const express = require('express');
const router = express.Router();

const Event = require('./../models/Event.model')

router.get("/events/details/:_id", (req, res, next) => {
    const { _id } = req.params
    Event
        .findById(_id)
        .then(event => res.json(event))
        .catch(err => res.status(500).json({ message: 'Server:', errorDetails: err }))
})

module.exports = router