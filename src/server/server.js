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

const get_weather = async(lat, lon, days_left) =>{
    if (days_left <= 7){
        const url = encodeURI(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.api_key_weatherbit}`);
        try{
            const res = await fetch(url);
            const weather_data = await res.json();
            return weather_data.data[0]
        
        }catch(err){
            console.log(err)
        }
    }
    else{
        const url = encodeURI(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.api_key_weatherbit}`);
        try{
            const res = await fetch(url);
            const weather_data = await res.json();
            return weather_data.data[0]
        }catch(err){
            console.log(err)
        }
    }
}

const get_image = async(city) =>{
    const url = encodeURI(`https://pixabay.com/api/?key=${process.env.api_key_pixabay}&q=${city}&image_type=photo`);
    try{
        const res = await fetch(url);
        const image_data = await res.json();
        return {
            image: image_data.hits[0].webformatURL
        }
    }catch(err){
        console.log(err)
    }
}

app.post('/travel-data', async (req, res) =>{
    const {city, days_left} = req.body;
    const coordinates = await get_coordinates(city);
    const weather = await get_weather(coordinates.lat, coordinates.lng, days_left);
    const image = await get_image(city);
    return res.send({image, weather:{
        temp: weather.temp,
        description: weather.weather.description
    }})
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});


module.exports = app;
