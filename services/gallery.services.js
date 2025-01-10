const axios = require("axios");
// const isValidGalleryId = require("../utils/validId");

const COLLECTIONAPI_URL =
  "https://collectionapi.metmuseum.org/public/collection/v1";

class GalleryService {
  constructor() {
    this.axiosApp = axios.create({
      baseURL: COLLECTIONAPI_URL,
    });
  }

  getFullGallery() {
    return this.axiosApp.get("/objects");
  }

  findOneOfGalleryById(gallery_id) {
    return this.axiosApp.get(`/objects/${gallery_id}`);
  }

  findOneOfGalleryByTitle(search) {
    return this.axiosApp.get(`/search?isHighlight=true&&q=${search}`);
  }
  findOneOfGalleryByAuthor(author) {
    return this.axiosApp.get(
      `/search?author=true&highlight=true&artistOrCulture=true&q=${author}`
    );
  }
  findByTitle(search, quantity) {
    return this.findOneOfGalleryByTitle(search)
      .then(({ data }) => {
        const selectedItems = data.objectIDs.slice(0, quantity);

        const verifiedItems = selectedItems.map((elm) => {
          return this.findOneOfGalleryById(elm)
            .then((response) => response.data.objectID)
            .catch(() => false);
        });

        return Promise.all(verifiedItems);
      })
      .then((response) => {
        if (response) {
          console.log("respuestaaaaa--->>>>", response);
          const existingItems = response.filter((itemExists) => itemExists);
          const itemsDetails = existingItems.map((itemId) =>
            this.findOneOfGalleryById(itemId)
          );

          return Promise.all(itemsDetails);
        }
      })
      .catch((err) =>
        console.log("Error en el servicio!!!!!!!!!!!!!!!!!!!!!!!!", err)
      );
  }
  findByAuthor(author, quantity) {
    return this.findOneOfGalleryByAuthor(author).then(({ data }) => {
      const selectedItems = data.objectIDs.slice(0, quantity);

      const verifiedItems = selectedItems.map((elm) => {
        return this.findOneOfGalleryById(elm)
          .then((response) => response.data.objectID)
          .catch(() => false);
      });

      return Promise.all(verifiedItems)
        .then((response) => {
          const existingItems = response.filter((itemExists) => itemExists);
          const itemsDetails = existingItems.map((itemId) =>
            this.findOneOfGalleryById(itemId)
          );

          return Promise.all(itemsDetails);
        })
        .catch((err) =>
          console.log("Error en el servicio!!!!!!!!!!!!!!!!!!!!!!!!", err)
        );
    });
  }
}
const galleryService = new GalleryService();

module.exports = galleryService;

// const BROKEN_IMG_URL = "https://uning.es/wp-content/uploads/2016/08/ef3-placeholder-image.jpg";

// const searchPaintings = async (search) => {
//     const urlSearch = `${COLLECTIONAPI_URL}/search?title=true&&q=${encodeURI(search)}`;
//     console.debug("Fetching post list!", { search, urlSearch });
//     const response = await axios.get(urlSearch);
//     return response.data;
// }

// const fetchPaintingDetails = async (objectId) => {
//     const postUrl = `${COLLECTIONAPI_URL}/objects/${objectId}`;
//     console.debug("Fetching post details!", { objectId, postUrl });
//     try {
//         const post = await axios.get(postUrl);
//         const { primaryImage, objectID, artistDisplayName, title, artistDisplayBio, creditLine, department,
//             culture,
//             objectWikidata_URL } = post.data;
//         return {
//             primaryImage: primaryImage && primaryImage.trim().length ? primaryImage : BROKEN_IMG_URL,
//             objectID,
//             artistDisplayName,
//             title,
//             artistDisplayBio,
//             creditLine,
//             department,
//             culture,
//             objectWikidata_URL
//         };
//     } catch (error) {
//         console.error("Failed to fetch post details :(", { error: error.message });
//     }
// }

// module.exports.search = async (req, res, next) => {
//     const search = req.query.search;
//     const postList = [];
//     let nResults = 0;
//     if (search) {
//         const data = await searchPaintings(search);
//         if (data && data.objectIDs) {
//             nResults = data.objectIDs.length;
//             for (let i = 0; i < Math.min(18, data.objectIDs.length); i++) {
//                 const objectId = data.objectIDs[i];
//                 const post = await fetchPaintingDetails(objectId);
//                 if (post) postList.push(post);
//             }

//         }
//     }
//     res.render("Post/postList", { postList, search, nResults });
// }

// const searchPainting = async (author) => {
//     const urlSearch = `${COLLECTIONAPI_URL}/search?artist=true&&q=${encodeURI(author)}`;
//     console.debug("Fetching post list!", { author, urlSearch });
//     const response = await axios.get(urlSearch);
//     return response.data;
// }

// module.exports.author = async (req, res, next) => {
//     const author = req.query.author;
//     const postList = [];
//     let nResults = 0;
//     if (author) {
//         const data = await searchPainting(author);
//         if (data && data.objectIDs) {
//             nResults = data.objectIDs.length;
//             for (let i = 0; i < Math.min(18, data.objectIDs.length); i++) {
//                 const objectId = data.objectIDs[i];
//                 const post = await fetchPaintingDetails(objectId);
//                 if (post) postList.push(post);
//             }

//         }
//     }

//     res.render("Post/postList", { postList, author, nResults });
// }
