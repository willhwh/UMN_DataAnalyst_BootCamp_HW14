//data path
var link ='static/data/data.geojson'


//check data
d3.json(link).then(function(data) {
    console.log(data.features)
})


// Creating map object
var myMap = L.map("mapid", {
    center: [44.986656, -93.258133],//minneapolis
    zoom: 2
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


var long_list=[]
var lat_list=[]
var location_list=[]

//check data
d3.json(link).then(function(data) {
    for (i=0;i<data.features.length;i++){
        long_list.push(data.features[i].geometry.coordinates[0])
        lat_list.push(data.features[i].geometry.coordinates[1])
        location_list.push([data.features[i].geometry.coordinates[1],data.features[i].geometry.coordinates[0]])
        var location=[data.features[i].geometry.coordinates[1],data.features[i].geometry.coordinates[0]]
        var radius =data.features[i].properties.mag
        L.circle(location,{
            fillOpacity: 0.75,
            color: "red",
            fillColor: 'red',
            // Adjust radius
            radius: radius*15000
          })
        .addTo(myMap);
    }
})

console.log(location_list)