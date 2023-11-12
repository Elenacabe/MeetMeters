const express = require('express');
const router = express.Router();
const postController = require("../controllers/post.controller")

router.get("/", (req, res, next) => {
    res.render("index")
});
module.exports = router;