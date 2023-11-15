require("dotenv").config()
require("./db")

const express = require("express")
const app = express()

require("./config")(app)
require('./config/session.config')(app)

const { updateLoggedUser } = require('./middleware/user-status')
app.use(updateLoggedUser)

require("./routes/index")(app)
require("./error-handling")(app)


module.exports = app