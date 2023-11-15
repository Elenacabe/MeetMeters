module.exports = app => {

    const indexRoutes = require("./index.routes")
    app.use("/", indexRoutes)

    const authRoutes = require("./auth.routes")
    app.use("/auth", authRoutes)

    const profileRoutes = require("./profile.routes")
    app.use("/profile", profileRoutes)

    const galleryRoutes = require("./gallery.routes")
    app.use("/gallery", galleryRoutes)

    const eventRoutes = require("./event.routes")
    app.use("/events", eventRoutes)
}