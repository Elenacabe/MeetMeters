
const { default: axios } = require('axios');

const COLLECTIONAPI_URL = "https://collectionapi.metmuseum.org/public/collection/v1";
const BROKEN_IMG_URL = "https://uning.es/wp-content/uploads/2016/08/ef3-placeholder-image.jpg";

const searchPaintings = async (search) => {
    const urlSearch = `${COLLECTIONAPI_URL}/search?title=true&&q=${encodeURI(search)}`;
    console.debug("Fetching gallery list!", { search, urlSearch });
    const response = await axios.get(urlSearch);
    return response.data;
}

const fetchPaintingDetails = async (objectId) => {
    const galleryUrl = `${COLLECTIONAPI_URL}/objects/${objectId}`;
    console.debug("Fetching gallery details!", { objectId, galleryUrl });
    try {
        const gallery = await axios.get(galleryUrl);
        const { primaryImage, objectID, artistDisplayName, title, artistDisplayBio, creditLine } = gallery.data;
        return {
            primaryImage: primaryImage && primaryImage.trim().length ? primaryImage : BROKEN_IMG_URL,
            objectID,
            artistDisplayName,
            title,
            artistDisplayBio,
            creditLine
        };
    } catch (error) {
        console.error("Failed to fetch gallery details :(", { error: error.message });
    }
}

module.exports.search = async (req, res, next) => {
    const search = req.query.search;
    const galleryList = [];
    let nResults = 0;
    if (search) {
        const data = await searchPaintings(search);
        if (data && data.objectIDs) {
            nResults = data.objectIDs.length;
            for (let i = 0; i < Math.min(15, data.objectIDs.length); i++) {
                const objectId = data.objectIDs[i];
                const gallery = await fetchPaintingDetails(objectId);
                if (gallery) galleryList.push(gallery);
            }
            console.log(galleryList);
        }
    }
    res.render("gallery/galleryList", { galleryList, search, nResults });
}