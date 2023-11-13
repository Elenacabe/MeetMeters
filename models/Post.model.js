const { Schema, model } = require("mongoose");
const postSchema = new Schema({
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

const Post = model("Post", postSchema);

module.exports = Post;