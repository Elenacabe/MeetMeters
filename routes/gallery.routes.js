const express = require('express');
const router = express.Router();
// const galleryController = require("../controllers/gallery.controller");
const GalleryService = require('../services/gallery.services')
function isValidGalleryId(galleryId) {
    return GalleryService.findOneOfGalleryById(galleryId)
        .then(response => response.status === 200)
        .catch(() => false);
}

// const gallery = require("../models/gallery.model")


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
        .then(({ data }) => {
            const selectedItems = data.objectIDs.slice(0, 50)
            const verifiedItems = selectedItems.map(elm => isValidGalleryId(elm))

            return Promise.all(verifiedItems)
        })
        .then(response => {
            const existingItems = response.filter(itemExists => itemExists)
            const itemsDetails = existingItems.map(itemId => GalleryService.findOneOfGalleryById(itemId))

            return Promise.all(itemsDetails)
        })
        .then(response => {
            const picturesByTitle = response.map(elm => elm.data)
            res.render('Gallery/galleryList', { picturesByTitle })
        })
        .catch(err => next(err))
});

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
module.exports = router;