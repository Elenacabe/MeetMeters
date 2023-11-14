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
    const { search } = req.query

    GalleryService
        .findOneOfGalleryByTitle(search)
        .then(async (result) => {
            // console.log(result.data.objectIDs)
            // console.log(result.data.objectIDs.map(gallery_id => console.log(gallery_id)))
            const promises = result.data.objectIDs.map(gallery_id => GalleryService.findOneOfGalleryById(gallery_id))
            await Promise.all(promises)
            console.log("--------------------------------", promises)
            // const promises = result.data.objectIDs.map(gallery_id => GalleryService.findOneOfGalleryById(gallery_id))
            // console.log(promises)
            // return Promise.all(promises)

        })
        // .then(object => {
        //     res.render('Gallery/galleryList', object.data)
        // })
        .catch(err => {
            next(err)
            res.status(500).json({ err: 'error by getting objects of gallery' })
        })

})

module.exports = router;