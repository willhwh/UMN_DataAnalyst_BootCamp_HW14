//data path
var link ='static/data/data.geojson'
var link1 ='static/data/plate.geojson'

//check data
d3.json(link).then(function(data) {
    console.log(data.features)
})


// Creating map object
var myMap = L.map("mapid", {
    center: [ 40.758701, -111.876183],//salt lake city
    zoom: 5
  });

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 12,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);


//color selector function
function colorSelector(depth){
    var color=''
    if (depth <10){
        color='#DAF7A6';
    }
    else if (depth<30){
        color='#FFC300';
    }
    else if (depth<50){
        color='#FF5733';
    }
    else if (depth<70){
        color='#C70039';
    }
    else if (depth<90){
        color='#900C3F';
    }
    else{
        color='#581845';
    }
    return color
}





//check data
d3.json(link).then(function(data) {
    for (i=0;i<data.features.length;i++){
        //catch the needed information
        var location=[data.features[i].geometry.coordinates[1],data.features[i].geometry.coordinates[0]]
        var radius =data.features[i].properties.mag
        var depth = data.features[i].geometry.coordinates[2]

        //the color selector
        color=colorSelector(depth)
        
        //put circle to the layer
        L.circle(location,{
            fillOpacity: 0.75,
            color:'black',
            weight:1,
            fillColor: color,
            // Adjust radius
            radius: radius*15000
          })
          //add popup to the circle
        .addTo(myMap).bindPopup("<h3>" + data.features[i].properties.place +
            "</h3><strong> Magnitude: " +data.features[i].properties.mag+"</strong> <hr><p>" + new Date(data.features[i].properties.time)// create new format of time
               + "</p>");
    };
});






function getColor(d) {
    return d < 10 ? '#DAF7A6' :
           d < 30  ? '#FFC300' :
           d < 50  ? '#FF5733' :
           d < 70  ? '#C70039' :
           d < 90   ? '#900C3F' :
                        '#581845' 
           ;
}


var legend = L.control({position: 'bottomright'});

legend.onAdd = function (myMap) {

    var div = L.DomUtil.create('div', 'info legend');
    var grades = [-10, 10, 30, 50, 70, 90];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(myMap);


//check data
d3.json(link1).then(function(data) {
    console.log(data.features)
});


d3.json(link1).then(function(data) {
    for (i=0;i<data.features.length;i++){
        var polylinePoints = [];
        var lines=(data.features[i].geometry.coordinates[0]);
        for (j=0;j<lines.length;j++){
            var dots=lines[j]
            polylinePoints.push([dots[1],dots[0]])
        };
        //console.log(polylinePoints);
        L.polyline(polylinePoints,{
            color: 'red',
            weight: 3,
            opacity: 0.5,
            smoothFactor: 1
        }).addTo(myMap); 
    };
});

 
