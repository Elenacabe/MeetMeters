const express = require('express')
const router = express.Router()
// const galleryController = require("../controllers/gallery.controller")
const GalleryService = require('../services/gallery.services')
const isValidGalleryId = require('../utils/validId')
const User = require('../models/User.model')
const userFavorities = require('../utils/favorites')


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
    const userFav = req.session.currentUser.favorites
    GalleryService
        .findByTitle(search, quantity)
        .then(picturesByTitle => picturesByTitle.map(e => e.data))
        .then(pictures => {
            const picturesFav = pictures.map(elm => {

                return {
                    ...elm,
                    isFav: userFav.includes(elm.objectID.toString().slice())
                }
            })

            return picturesFav

        })
        .then(pictures => res.render('Gallery/gallerylist', ({ pictures })))
        .catch(err => { next(err) })
})

router.get('/details/:objectID', (req, res, next) => {
    const { objectID } = req.params
    GalleryService
        .findOneOfGalleryById(objectID)
        .then(object => res.render('Gallery/details', object.data))
        .catch(err => next(err))
})

router.post('/favorites/:art_id', (req, res, next) => {
    const { art_id } = req.params
    const currentUser = req.session.currentUser._id
    User
        .findById(currentUser)
        .then(user => userFavorities(user, art_id))
        .then(() => res.redirect('/gallery'))
        .catch(err => next(err))
})

router.get('/author', (req, res, next) => {
    const { author } = req.query
    const quantity = 50
    GalleryService
        .findByAuthor(author, quantity)
        .then(picturesByAuthor => picturesByAuthor.map(e => e.data))
        .then(pictures => res.render('Gallery/galleryList', { pictures }))
        .catch(err => { next(err) })
})
module.exports = router