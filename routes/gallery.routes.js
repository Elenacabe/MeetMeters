const express = require('express');
const router = express.Router();
// const galleryController = require("../controllers/gallery.controller");
const GalleryService = require('../services/gallery.services');
// const gallery = require("../models/gallery.model")

/* GET home page */
// router.get("/", galleryController.search)
//router.get("/author", galleryController.author);
// router.get("/details/:_id", galleryController.id)
router.get("/", (req, res, next) => {
    GalleryService
        .getFullGallery()
        .then(result => {
            const promises = result.data.objectIDs.slice(0, 15).map(gallery_id => GalleryService.findOneOfGalleryById(gallery_id))
            return Promise.all(promises)

        })
        .then(object => {
            const objectData = object.map(e => e.data)
            // console.log(objectData)
            res.render('Gallery/galleryList', { objectData })
        })
        .catch(err => {
            next(err)
            res.status(500).json({ err: 'error by getting objects of gallery' })
        })

})
module.exports = router;