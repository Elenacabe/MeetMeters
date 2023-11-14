const express = require('express');
const router = express.Router();
// const galleryController = require("../controllers/gallery.controller");
const GalleryService = require('../services/gallery.services');
function isValidGalleryId(galleryId) {
    return GalleryService.findOneOfGalleryById(galleryId)
        .then(response => response.status === 200)
        .catch(() => false);
}
// const gallery = require("../models/gallery.model")
function isValidGalleryId(galleryId) {
    return GalleryService.findOneOfGalleryById(galleryId)
        .then(response => response.status === 200)
        .catch(() => false);
}

/* GET home page */
// router.get("/", galleryController.search)
//router.get("/author", galleryController.author);
// router.get("/details/:_id", galleryController.id)

router.get("/", (req, res, next) => {
    res.render('Gallery/galleryList')
})
router.get("/search", (req, res, next) => {
    const { search } = req.query



    GalleryService
        .findOneOfGalleryByTitle(search)
        .then(async result => {
            console.log("-----------------------esto es lo que llega al endpoint", result)



            const validGalleryIds = await Promise.all(
                result.data.objectIDs.slice(0, 10).map(async galleryId => {
                    const isValid = await isValidGalleryId(galleryId);
                    return { galleryId, isValid };
                })
            );

            const filteredValidIds = validGalleryIds.filter(({ isValid }) => isValid).map(({ galleryId }) => galleryId);

            const picturesByTitle = await Promise.all(
                filteredValidIds.map(async galleryId => {
                    return GalleryService.findOneOfGalleryById(galleryId)
                        .then(response => response.data)
                        .catch(err => Promise.reject(err));
                })
            );

            res.render('Gallery/galleryList', { picturesByTitle });
        })
        .catch(err => {
            next(err);
            res.status(500).json({ err: 'Error getting objects of gallery' });
        });
})

module.exports = router;