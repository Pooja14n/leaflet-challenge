// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(queryUrl).then(function (data) {
    // console.log(data)

    createFeatures(data.features)

});

function createFeatures(earthquakeData) {

    function onOurFeature(feature, layer)  {       
        layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><p>Date: ${new Date(feature.properties.time)}</p><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
    }
  
    function createMarker(feature, latlng){
        let markers = {
         radius:feature.properties.mag*3,
         fillColor: chooseColor(feature.geometry.coordinates[2]),
         color: "black",
         weight: 0.5,
         opacity: 0.8,
         fillOpacity: 0.7
        } 
        return L.circleMarker(latlng, markers);
     }
     
     let earthquakes = L.geoJSON(earthquakeData, {
         onEachFeature: onOurFeature,
         pointToLayer: createMarker
     });
 
     
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


let legend = L.control({position: 'bottomright'});

legend.onAdd = function() {
    let div = L.DomUtil.create('div', 'info legend');
    let grades = [-10, 10, 30, 50, 70, 90];
    let labels = [];
    let legendInfo = "<h4></h4>";

    // div.innerHTML = legendInfo
    
    // for (let i = 0; i < grades.length; i++) {
    //       labels.push('<ul style="background-color:' + chooseColor(grades[i] + 1) + '"> <span>' + grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '' : '+') + '</span></ul>');
    //     }
      
    //   div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + chooseColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
  };

    
        

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
  legend.addTo(myMap);
  
  
  }

