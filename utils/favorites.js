const User = require("../models/User.model")

function userFavorities(user, artwork_id) {
    if (user.favorites.includes(artwork_id)) {

        return User.findByIdAndUpdate(user._id, { $pull: { favorites: artwork_id } })
    } else {
        user.favorites.push(artwork_id)
        return User.findByIdAndUpdate(user._id, { $push: { favorites: artwork_id } })
    }
}

module.exports = userFavorities