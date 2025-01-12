const express = require("express");
const router = express.Router();
const GalleryService = require("../services/gallery.services");
const User = require("../models/User.model");
const userFavorities = require("../utils/favorites");

router.get("/", (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect("/auth/logIn");
  }
  res.render("Gallery/galleryList", { user: req.session.currentUser });
});

router.get("/search", (req, res, next) => {
  const { search } = req.query;
  const quantity = 50;

  GalleryService.findByTitle(search, quantity)
    .then((picturesByTitle) => {
      if (picturesByTitle) {
        return picturesByTitle.map((e) => e.data);
      }
    })
    .then((pictures) => {
      pictures
        ? res.render("Gallery/galleryList", { pictures, hasSearched: true })
        : res.render("Gallery/galleryList", { hasSearched: true });
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/details/:objectID", (req, res, next) => {
  const { objectID } = req.params;
  if (req.session.currentUser.favorites == true) {
    const userFav = req.session.currentUser.favorites;

    GalleryService.findOneOfGalleryById(objectID)
      .then((pictures) => {
        const picturesFav = {
          ...pictures.data,
          isFav: userFav.includes(pictures.data.objectID.toString().slice()),
        };
        return picturesFav;
      })
      .then((object) => res.render("Gallery/details", object))
      .catch((err) => next(err));
  } else {
    GalleryService.findOneOfGalleryById(objectID)
      .then((pictures) => {
        const picturesFav = {
          ...pictures.data,
        };
        return picturesFav;
      })
      .then((object) => res.render("Gallery/details", object))
      .catch((err) => next(err));
  }
});

router.get("/author", (req, res, next) => {
  const { author } = req.query;
  const quantity = 50;

  GalleryService.findByAuthor(author, quantity)
    .then((picturesByAuthor) => picturesByAuthor.map((e) => e.data))
    .then((pictures) =>
      res.render("Gallery/galleryList", { pictures, hasSearched: true })
    )
    .catch((err) => {
      next(err);
    });
});

router.post("/favorites/:_artId", (req, res, next) => {
  const { _artId } = req.params;
  const currentUser = req.session.currentUser._id;
  User.findById(currentUser)
    .then((user) => userFavorities(user, _artId))
    .then(() => res.redirect(`/profile/details/${currentUser}`))
    .catch((err) => next(err));
});

module.exports = router;
