
//data path
var link ='static/data/data.geojson'


//check data
d3.json(link).then(function(data) {
    console.log(data)
})
