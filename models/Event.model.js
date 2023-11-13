const { Schema, model } = require("mongoose");
const eventSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'

    },
    attendeeIds: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    },
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
    coverUrl: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: {
                type: String,
                enum: ["Point"],
                required: true
            },
            coordinates: {
                type: [Number],
                required: true
            }
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