const express = require('express');
const router = express.Router();
const galleryController = require("../controllers/gallery.controller")
// const gallery = require("../models/gallery.model")

/* GET home page */
router.get("/", galleryController.search)
//router.get("/author", galleryController.author);
// router.get("/details/:_id", galleryController.id)

module.exports = router;