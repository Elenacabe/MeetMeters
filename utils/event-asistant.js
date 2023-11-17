const Event = require("../models/Event.model")

function atendeesOnEvent(user, event) {
    if (event.atendees.includes(user._id)) {
        return Event.findByIdAndUpdate(event._id, { $pull: { atendees: user._id } })
    } else {
        return Event.findByIdAndUpdate(event._id, { $push: { atendees: user._id } })
    }

}

module.exports = atendeesOnEvent