const router = require("express").Router()
const Event = require("../models/Event.model")
const { isLoggedOut, isLoggedIn, checkRole } = require("../middleware/route-guard")
const uploaderMiddleware = require('../middleware/uploader-middleware')
const User = require("../models/User.model")
const atendeesOnEvent = require("../utils/event-asistant")
const Comment = require("../models/Comment.model")



router.get('/', isLoggedIn, (req, res, next) => {

    Event
        .find()
        .then(events => {
            res.render('Events/events', {
                events,
            })
        })
        .catch(err => next(err))
})


router.get('/events-create', isLoggedIn, checkRole('ADMIN', 'GUIDE'), (req, res, next) => {
    res.render('events/createForm')
})


router.post("/eventCreation", uploaderMiddleware.single('cover'), isLoggedIn, checkRole('ADMIN', 'GUIDE'), (req, res, next) => {

    const { path: cover } = req.file
    const { name, description, startDate, endDate, latitude, longitude, type } = req.body
    const owner = req.session.currentUser
    const location = {
        type: "Point",
        coordinates: [longitude, latitude]
    }

    Event

        .create({ cover, name, description, startDate, endDate, location, type, owner })
        .then(() => res.redirect('/events'))
        .catch(err => next(err))
})


router.get('/edit/:_id', isLoggedIn, uploaderMiddleware.single('cover'), checkRole('ADMIN', 'GUIDE'), (req, res, next) => {
    const { _id } = req.params

    Event
        .findById(_id)
        .then(event => res.render('events/events-edit', event))
        .catch(err => next(err))
})


router.post('/edit/:_id', isLoggedIn, uploaderMiddleware.single('cover'), checkRole('ADMIN', 'GUIDE'), (req, res, next) => {
    const { _id } = req.params
    const { path: cover } = req.file
    const { name, description, latitude, longitude } = req.body
    const owner = req.session.currentUser
    const location = {
        type: "Point",
        coordinates: [longitude, latitude]
    }

    Event
        .findByIdAndUpdate(_id, { cover, name, description, location, owner })
        .then(event => res.redirect(`/events`,))
        .catch(err => next(err))
})
router.post('/delete/:_id', isLoggedIn, checkRole('ADMIN'), (req, res, next) => {
    const { _id } = req.params
    Event
        .findByIdAndDelete(_id)
        .then(() => res.redirect('/events'))
        .catch(err => next(err))
})


router.post('/add/:_id', isLoggedIn, (req, res, next) => {

    const { _id } = req.params
    const currentUser = req.session.currentUser


    Event
        .findById(_id)
        .then(event => atendeesOnEvent(currentUser, event))
        .then(() => res.redirect(`/events/details/${_id}`))
        .catch(err => next(err))
})

router.get('/details/:event_id', isLoggedIn, (req, res, next) => {

    const { event_id } = req.params

    Event
        .findById(event_id)

        .populate({
            path: 'comments',
            populate: {
                path: 'author',
                model: 'User'
            }
        })

        .then(event => res.render("Events/events-details",
            event
        ))
        .catch(err => next(err))
})

router.post('/:event_id/createComment', isLoggedIn, (req, res, next) => {

    const { event_id } = req.params
    const { comment } = req.body
    const author_id = req.session.currentUser._id

    Comment
        .create(({ comment, author: author_id }))
        .then(commentCreated => Event.findByIdAndUpdate(event_id, { $push: { comments: commentCreated._id } }))
        .then(() => res.redirect(`/events/details/${event_id}`))
        .catch(err => next(err))



})
module.exports = router