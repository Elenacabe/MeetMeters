const express = require('express');
const router = express.Router();
const postController = require("../controllers/post.controller")

/* GET home page */
router.get("/", postController.search);

module.exports = router;