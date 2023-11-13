const { Schema, model } = require("mongoose");
const gallerySchema = new Schema({
    meetId: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    likedBy: {
        type: [Schema.Types.ObjectId],
        ref: 'User'
    }
}, {
    timeStamps: true
}
)

const Gallery = model("Gallery", gallerySchema);

module.exports = Post;