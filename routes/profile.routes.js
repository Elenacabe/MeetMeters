const router = require("express").Router()
const User = require("../models/User.model")
const { isLoggedOut, isLoggedIn, checkRole } = require("../middleware/route-guard")
const uploaderMiddleware = require('../middleware/uploader-middleware')
const galleryService = require("../services/gallery.services")
const { response } = require("express")
// TODO: GESTIONAR TODOS LOS CATCH CON NEXT

router.get("/list", isLoggedIn, (req, res, next) => {

    let userById
    User
        .find()
        .then(users => res.render('Profile/list', { users }))

        .catch(err => next(err))
})


router.get("/details/:_id", isLoggedIn, (req, res, next) => {

    const { _id: userId } = req.params
    let userById
    User
        .findById(userId)
        .then(user => {
            userById = user
            const favoritesItems = user.favorites.map(elm => {
                return galleryService.findOneOfGalleryById(elm)
                    .then(response => response.data)
                    .catch(() => false)

            })
            return Promise.all(favoritesItems)
        })
        .then(favoritesItems => res.render('profile/details', {
            userById, favoritesItems,
            isAdmin: req.session.currentUser.role === 'ADMIN',
            profile: req.session.currentUser._id === userId || req.session.currentUser.role === 'ADMIN'
        }))
        .catch(err => next(err))
})


router.get("/edit/:_id", isLoggedIn, (req, res) => {

    const { _id } = req.params

    User
        .findById(_id)
        .then(user => res.render(`/profile/details/${_id}`,
            {
                user,
                isAdmin: req.session.currentUser.role === 'ADMIN',
                profile: req.session.currentUser._id === _Id || req.session.currentUser.role === 'ADMIN'
            }))
        .catch(err => next(err))
})


router.post('/edit/:_id', isLoggedIn, uploaderMiddleware.single('avatar'), (req, res, next) => {

    const { _id } = req.params
    const { path: avatar } = req.file
    const { username, about } = req.body

    User
        .findByIdAndUpdate(_id, { username, about, avatar })
        .then(() => res.redirect(`/profile/list`))
        .catch(err => next(err))
})


router.get("/edit/rol/:_id", isLoggedIn, checkRole('ADMIN'), (req, res) => {

    const { _id } = req.params

    User
        .findById(_id)
        .then(user => res.render(`/profile/details/${_id}`, { user }
        ))
        .catch(err => next(err))
})


router.post('/edit/rol/:_id', isLoggedIn, checkRole('ADMIN'), (req, res, next) => {

    const { _id } = req.params
    const { role } = req.body

    User
        .findByIdAndUpdate(_id, { role })
        .then(() => res.redirect(`/profile/list`))
        .catch(err => next(err))
})


router.post('/delete/:_id', isLoggedIn, checkRole('ADMIN'), (req, res, next) => {
    const { _id } = req.params
    User
        .findByIdAndDelete(_id)
        .then(() => res.redirect('/profile/list'))
        .catch(err => next(err))
})


module.exports = router