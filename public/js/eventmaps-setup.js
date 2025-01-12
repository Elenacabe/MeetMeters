const metMuseum = { lat: 40.779546247874414, lng: -73.96322254582404 };
let theMap;

function init() {
  renderMap();
  getMarkers();
}

function renderMap() {
  nyMap = new google.maps.Map(document.querySelector("#nyMap"), {
    zoom: 11,
    center: metMuseum,
  });
  new google.maps.Marker({
    map: nyMap,
    position: metMuseum,
    title: "Met museum",
  });
}

function getMarkers() {
  const _id = document.querySelector("#event_id").value;

  axios
    .get(`/api/events/details/${_id}`)
    .then((response) => {
      if (response.data) {
        printEventsMarkers(response.data);
      } else {
        console.error("No se encontraron datos del evento");
      }
    })
    .catch((err) => console.error("Error al obtener los marcadores:", err));
}

function printEventsMarkers(event) {
  const position = {
    lat: event.location.coordinates[1],
    lng: event.location.coordinates[0],
  };

  new google.maps.Marker({
    map: theMap,
    position,
    title: event.name,
  });
}
