// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(queryUrl).then(function (data) {
    // console.log(data)

    createFeatures(data.features)

});

function createFeatures(earthquakeData) {

    function onOurFeature(feature, layer)  {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`)
    
    }
  
    function createMarker(feature, latlng){
        let markers = {
         radius:feature.properties.mag*3,
         fillColor: chooseColor(feature.properties.mag),
         color: chooseColor(feature.properties.mag),
         weight: 0.5,
         opacity: 0.8,
         fillOpacity: 0.7
        } 
        return L.circleMarker(latlng, markers);
     }
     // Create a variable for earthquakes to house latlng, each feature for popup, and cicrle radius/color/weight/opacity
     let earthquakes = L.geoJSON(earthquakeData, {
         onEachFeature: onOurFeature,
         pointToLayer: createMarker
     });
 
     // Send earthquakes layer to the createMap function - will start creating the map and add features
     createMap(earthquakes);
 }
 
 function chooseColor(depth){
    if (depth >= 1 && depth <= 2.5) return "yellow";
    else if (depth >= 2.5 && depth <= 5.0) return "orange";
    else if (depth >= 5.0 && depth <= 10.0) return "green";
    else if (depth >= 10.0 && depth <= 20.0) return "red";
    else return "pink"
}

  function createMap(earthquakes) {
    //BASE MAPS
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  let baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  let overlayMaps = {
    "Earthquakes" : earthquakes
  }

  let myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  
  
  }
