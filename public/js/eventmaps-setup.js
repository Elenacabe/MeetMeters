const metMuseum = { lat: 40.779546247874414, lng: -73.96322254582404 }
let theMap
function init() {
    renderMap()
    getMarkers()
}

function renderMap() {

    theMap = new google.maps.Map(
        document.querySelector('#theMap'),
        {
            zoom: 10,
            center: metMuseum,

        }

    )
    new google.maps.Marker({
        map: theMap,
        position: metMuseum,
        title: "Met museum"
    })
}



function getMarkers() {
    const _id = document.querySelector('#event_id').value
    console.log()
    axios
        .get(`/api/events/details/${_id}`)
        .then(response => {
            console.log(response)
            printEventsMarkers(response.data)
        })
        .catch(err => console.log(err))

}

function printEventsMarkers(event) {

    const position = { lat: event.location.coordinates[1], lng: event.location.coordinates[0] }
    console.log(event)
    new google.maps.Marker({
        map: theMap,
        position,
        title: event.name
    })
}