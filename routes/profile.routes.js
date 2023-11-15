const router = require("express").Router()
const User = require("../models/User.model")
const { isLoggedOut, isLoggedIn } = require("../middleware/route-guard")
const uploaderMiddleware = require('../middleware/uploader-middleware')


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
router.get("/edit/:_id", isLoggedIn, uploaderMiddleware.single('avatar'), (req, res) => {
    const { path: avatar } = req.file
    const { _id } = req.params
    User
        .findById(_id)
        .then(user => res.render(`/profile/details/${_id}`, user,))
        .catch(err => console.log(err))
})
router.post('/edit/:_id', isLoggedIn, uploaderMiddleware.single('avatar'), (req, res, next) => {
    const { _id } = req.params
    const { path: avatar } = req.file
    const { username, about } = req.body
    User
        .findByIdAndUpdate(_id, { username, about, avatar })
        .then(() => res.redirect(`/profile/list`))
        .catch(err => console.log(err))
})
module.exports = router