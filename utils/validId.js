const GalleryService = require("../services/gallery.services");

const isValidGalleryId = (galleryId) => {
  return GalleryService.findOneOfGalleryById(galleryId)
    .then((response) => response.status === 200)
    .catch(() => false);
};
module.exports = isValidGalleryId;
