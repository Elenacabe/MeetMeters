const router = require("express").Router()
const Event = require("../models/Event.model")
const { isLoggedOut, isLoggedIn, checkRole } = require("../middleware/route-guard")
const uploaderMiddleware = require('../middleware/uploader-middleware')
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

    const location = {
        type: "Point",
        coordinates: [longitude, latitude]
    }

    Event
        .create({ cover, name, description, startDate, endDate, location, type })
        .then(() => res.redirect('/events'))
        .catch(err => next(err))
})


module.exports = router