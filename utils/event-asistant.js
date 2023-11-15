const Event = require("../models/Event.model")

function atendeesOnEvent(user, event) {
    if (event.atendees.includes(user._id)) {
        return
    } else {
        return Event.findByIdAndUpdate(event._id, { $push: { atendees: user._id } })
    }

}

module.exports = atendeesOnEvent