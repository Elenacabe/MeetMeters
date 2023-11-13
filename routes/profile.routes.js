const router = require("express").Router()
const User = require("../models/User.model")
const { isLoggedOut, isLoggedIn } = require("../middleware/route-guard")


router.get("/list", isLoggedIn, (req, res, next) => {
    User
        .find()
        .then(users => res.render('Profile/list', {
            user: users,
        }

        ))
        .catch(err => console.log(err))
})
router.get("/details/:_id", isLoggedIn, (req, res, nex) => {
    const { _id: userId } = req.params
    User
        .findById(userId)
        .then(user => res.render('profile/details', {
            user: user, isAdmin: req.session.currentUser.role === 'ADMIN',
            profile: ((req.session.currentUser._id === userId) || (req.session.currentUser.role === 'ADMIN'))
        }
        ))
})
router.get("/edit/:_id", isLoggedIn, (req, res) => {
    const { _id } = req.params
    User
        .findById(_id)
        .then(user => res.render(`/profile/details/${_id}`, user,))
        .catch(err => console.log(err))
})
router.post('/edit/:_id', isLoggedIn, (req, res, next) => {
    const { _id } = req.params
    const { username, avatar, about } = req.body
    User
        .findByIdAndUpdate(_id, { username, avatar, about })
        .then(() => res.redirect(`/profile/list`))
        .catch(err => console.log(err))
})
module.exports = router