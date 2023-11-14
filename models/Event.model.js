const { Schema, model } = require("mongoose");
const eventSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    atendees: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    cover: {
        type: String,
        // required: true
    },
    location: {
        type: {
            type: String,
            required: true
        },
        coordinates: {
            type: [Number],
        }
    },
    type: {
        type: String,
        required: true,
        enum: ["free", "paid"]
    }
}, {
    timeStamps: true
}
)
eventSchema.index({ location: '2dsphere' })
const Event = model("Event", eventSchema);

module.exports = Event;