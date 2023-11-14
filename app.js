
require("dotenv").config();

require("./db");


const express = require("express");

const hbs = require("hbs");

const app = express();


require("./config")(app);

const capitalize = require("./utils/capitalize");
// const { userStatus } = require('./middleware/user-status')
// app.use(userStatus)
const projectName = "meetMeters";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

require('./config/session.config')(app)
require("./routes/index")(app)

require("./error-handling")(app);

// Assuming you have Handlebars registered as 'Handlebars' in your script



module.exports = app;
