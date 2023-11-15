const express = require('express')
const router = express.Router()
// const galleryController = require("../controllers/gallery.controller")
const GalleryService = require('../services/gallery.services')
const isValidGalleryId = require('../utils/validId')


// const gallery = require("../models/gallery.model")


/* GET home page */
// router.get("/", galleryController.search)
//router.get("/author", galleryController.author)
// router.get("/details/:_id", galleryController.id)

router.get("/", (req, res, next) => {
    res.render('Gallery/galleryList')
})
router.get("/search", (req, res, next) => {
    const { search } = req.query
    const quantity = 50
    GalleryService
        .findByTitle(search, quantity)
        .then(picturesByTitle => picturesByTitle.map(e => e.data))
        .then(pictures => res.render('Gallery/galleryList', { pictures }))
        .catch(err => { next(err) })
})

router.get('/details/:objectID', (req, res, next) => {
    const { objectID } = req.params
    GalleryService
        .findOneOfGalleryById(objectID)
        .then(object => res.render('Gallery/details', object.data))
        .catch(err => next(err))
})



router.get('/author', (req, res, next) => {
    const { author } = req.query

})
module.exports = router