var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
var cors = require('cors')

const dotenv = require('dotenv');
const cache = require('babel-loader/lib/cache.js')
dotenv.config();

const app = express()
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static('dist'))

console.log(JSON.stringify(mockAPIResponse))

app.get('/', (req, res) =>{
    res.sendFile('dist/index.html')
});

app.get('/test', (req, res) =>{
    res.json(mockAPIResponse);
});

const get_coordinates = async(city) =>{
    const url = encodeURI(`http://api.geonames.org/searchJSON?style=full&maxRows=1&name_startsWith=${city}&username=${process.env.username_geonames}`);
    try{
        const res = await fetch(url);
        const geonames_data = await res.json();
        return {
            lat: geonames_data.geonames[0].lat,
            lng: geonames_data.geonames[0].lng
        }
    }catch(err){
        console.log(err)
    }
}

app.post('/travel-data', (req, res) =>{
    const data = req.body;
    get_coordinates(data.city)
    .then(coordinates => {
        console.log(coordinates);
        res.json(data);
    })
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});
