// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(queryUrl).then(function (data) {
    // console.log(data)

    createFeatures(data.features)

});

function createFeatures(earthquakeData) {

    function onOurFeature(feature, layer)  {
        // layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`)
        layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><p>Date: ${new Date(feature.properties.time)}</p><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
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
    if (depth < 10) return "yellowgreen";
    else if (depth < 30) return "khaki";
    else if (depth < 50) return "yellow";
    else if (depth < 70) return "darkorange";
    else if (depth < 90) return "lightsalmon";
    else return "red";
}


// let legend = L.control({position: 'bottomright'});

// legend.onAdd = function() {
//     var div = L.DomUtil.create('div', 'info legend');
//     var grades = [1.0, 2.5, 4.0, 5.5, 8.0];
//     var labels = [];
//     var legendInfo = "<h4>Magnitude</h4>";

//     div.innerHTML = legendInfo

//     // go through each magnitude item to label and color the legend
//     // push to labels array as list item
//     for (var i = 0; i < grades.length; i++) {
//           labels.push('<ul style="background-color:' + chooseColor(grades[i] + 1) + '"> <span>' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '' : '+') + '</span></ul>');
//         }

//       // add each label list item to the div under the <ul> tag
//       div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    
//     return div;
//   };


// let legend = L.control({position: 'bottomright'});

// legend.onAdd = function (map) {
//     let div = L.DomUtil.create('div', 'info legend'),
//         grades = [1.0, 2.5, 4.0, 5.5, 8.0],
//         labels = [];

//     // loop through density intervals
//     for (let i = 0; i < grades.length; i++) {
//         div.innerHTML +=
//             '<i style="background:' + chooseColor(grades[i] + 1) + '"></i> ' +
//             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
//     }
//     return div;
// };


let legend = L.control({position: 'bottomright'});

legend.onAdd = function() {
    var div = L.DomUtil.create('div', 'info legend');
    var grades = [1.0, 2.5, 4.0, 5.5, 8.0];
    var labels = [];
    var legendInfo = "<h4>Magnitude</h4>";

    div.innerHTML = legendInfo

    // go through each magnitude item to label and color the legend
    // push to labels array as list item
    for (var i = 0; i < grades.length; i++) {
          labels.push('<ul style="background-color:' + chooseColor(grades[i] + 1) + '"> <span>' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '' : '+') + '</span></ul>');
        }

      // add each label list item to the div under the <ul> tag
      div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    
    return div;
  };

    legend.addTo(myMap);
        

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

