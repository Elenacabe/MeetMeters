// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");


const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();


require("./config")(app);

// default value for title local
const capitalize = require("./utils/capitalize");
const projectName = "meetMeters";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;



require('./config/session.config')(app)
require("./routes/index.routes")(app)

require("./error-handling")(app);



module.exports = app;
