const router = require("express").Router()
const Event = require("../models/Event.model")
const { isLoggedOut, isLoggedIn } = require("../middleware/route-guard")
const uploaderMiddleware = require('../middleware/uploader-middleware')



router.get('/', (req, res, next) => {
    Event
        .find()
        .then(events => res.render('Events/events', {
            event: events,
        }

        ))
        .catch(err => console.log(err))
})



router.get('/events-create', (req, res, next) =>
    res.render('events/createForm'))


router.post("/eventCreation", uploaderMiddleware.single('cover'), (req, res, next) => {

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