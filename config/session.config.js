const session = require("express-session"); // instalar
const MongoStore = require("connect-mongo"); // instalar
const mongoose = require("mongoose");

module.exports = (app) => {
  app.set("trust proxy", 1);

  app.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // 'lax' para desarrollo
        secure: process.env.NODE_ENV === "production", // false para desarrollo
        httpOnly: true,
        maxAge: 800000,
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
      }),
    })
  );
};
