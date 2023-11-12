const { default: axios } = require('axios');

const COLLECTIONAPI_URL = "https://collectionapi.metmuseum.org/public/collection/v1";
const BROKEN_IMG_URL = "https://uning.es/wp-content/uploads/2016/08/ef3-placeholder-image.jpg";

const searchPaintings = async (search) => {
    const urlSearch = `${COLLECTIONAPI_URL}/search?title=true&&q=${encodeURI(search)}`;
    console.debug("Fetching post list!", { search, urlSearch });
    const response = await axios.get(urlSearch);
    return response.data;
}

const fetchPaintingDetails = async (objectId) => {
    const postUrl = `${COLLECTIONAPI_URL}/objects/${objectId}`;
    console.debug("Fetching post details!", { objectId, postUrl });
    try {
        const post = await axios.get(postUrl);
        const { primaryImage, objectID, artistDisplayName, title, artistDisplayBio, creditLine } = post.data;
        return {
            primaryImage: primaryImage && primaryImage.trim().length ? primaryImage : BROKEN_IMG_URL,
            objectID,
            artistDisplayName,
            title,
            artistDisplayBio,
            creditLine
        };
    } catch (error) {
        console.error("Failed to fetch post details :(", { error: error.message });
    }
}

module.exports.search = async (req, res, next) => {
    const search = req.query.search;
    const postList = [];
    let nResults = 0;
    if (search) {
        const data = await searchPaintings(search);
        if (data && data.objectIDs) {
            nResults = data.objectIDs.length;
            for (let i = 0; i < Math.min(15, data.objectIDs.length); i++) {
                const objectId = data.objectIDs[i];
                const post = await fetchPaintingDetails(objectId);
                if (post) postList.push(post);
            }
            console.log(postList);
        }
    }
    res.render("Post/postList", { postList, search, nResults });
}