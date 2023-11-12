const express = require('express');
const router = express.Router();

const { isLoggedIn, checkRole } = require('../middleware/route-guard')
const { isLoggedOut } = require('../middleware/route-guard')

const User = require("../models/User.model")
const edit = false

module.exports = app => {


  const indexR = require("./indexR")
  app.use("/", indexR)
  const authRoutes = require("./auth.routes");
  app.use("/auth", authRoutes);
  const postRoutes = require("./post.routes")
  app.use("/posts", postRoutes)


}
