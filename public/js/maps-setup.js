const metMuseum = { lat: 40.779546247874414, lng: -73.96322254582404 }
let nyMap
function init() {
    renderMap()
    getMarkers()
}

function renderMap() {

    myMap = new google.maps.Map(
        document.querySelector('#nyMap'),
        {
            zoom: 11,
            center: metMuseum,
        }
    )
}



function getMarkers() {

    axios
        .get('/api/events')
        .then(response => printEventMarkers(response.data))
        .catch(err => console.log(err))
}

function printPlacesMarkers(events) {
    console.log("estoy painting")


    events.forEach(elm => {

        const position = { lat: elm.location.coordinates[1], lng: elm.location.coordinates[0] }
        new google.maps.Marker({
            map: nyMap,
            position,
            title: elm.name
        })
    })
}