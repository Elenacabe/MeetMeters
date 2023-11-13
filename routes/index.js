const express = require('express');
const router = express.Router();


const { isLoggedIn, checkRole } = require('../middleware/route-guard')
const { isLoggedOut } = require('../middleware/route-guard')

const User = require("../models/User.model")
const edit = false

module.exports = app => {


    const indexRoutes = require("./index.routes")
    app.use("/", indexRoutes)
    const authRoutes = require("./auth.routes");
    app.use("/auth", authRoutes);
    const galleryRoutes = require("./gallery.routes")
    app.use("/gallery", galleryRoutes)
    // const eventRoutes = require("./event.routes")
    // app.use("/events", eventRoutes)

}