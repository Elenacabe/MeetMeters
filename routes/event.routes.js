const router = require("express").Router()
const Event = require("../models/Event.model")
const { isLoggedOut, isLoggedIn } = require("../middleware/route-guard")



router.get('/', (req, res, next) =>
    res.render('events/events'))


router.get('/events-create', (req, res, next) =>
    res.render('events/createForm'))


router.post("/eventCreation", (req, res, next) => {

    const { name, description, startDate, endDate, latitude, longitude, type } = req.body

    const location = {
        type: "Point",
        coordinates: [longitude, latitude]
    }

    Event
        .create({ name, description, startDate, endDate, location, type })
        .then(() => res.redirect('/events'))
        .catch(err => next(err))
})


module.exports = router