const express = require('express');
const router = express.Router();
module.exports = app => {
  /* GET home page */
  router.get("/", (req, res, next) => {
    res.render("index");
  });
  const authRoutes = require("./auth.routes");
  app.use("/auth", authRoutes);
  const postRoutes = require("./post.routes")
  app.use("/posts", postRoutes)


}
