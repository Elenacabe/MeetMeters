const express = require('express');
const router = express.Router();
const postController = require("../services/post.controller")
// const Post = require("../models/Post.model")

/* GET home page */
router.get("/", postController.search)
router.get("/author", postController.author);
// router.get("/details/:_id", postController.id)

module.exports = router;