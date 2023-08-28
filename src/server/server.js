// Import required modules
var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
var bodyParser = require('body-parser');
var cors = require('cors');

// Load environment variables from .env file
const dotenv = require('dotenv');
dotenv.config();

// Create an instance of Express app
const app = express();

// Set up CORS to allow cross-origin requests
app.use(cors());

// Configure middleware to parse JSON and url-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Serve static files from 'dist' directory
app.use(express.static('dist'));

// Log mockAPIResponse as string
console.log(JSON.stringify(mockAPIResponse));

// Route to serve the main HTML file
app.get('/', (req, res) =>{
    res.sendFile('dist/index.html');
});

// Route to serve mock API response
app.get('/test', (req, res) =>{
    res.json(mockAPIResponse);
});

// Function to get coordinates from Geonames API
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
        console.log(err);
    }
}

// Function to get weather data from Weatherbit API
const get_weather = async(lat, lon, days_left) =>{
    if (days_left <= 7){
        const url = encodeURI(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.api_key_weatherbit}`);
        try{
            const res = await fetch(url);
            const weather_data = await res.json();
            return weather_data.data[0];
        }catch(err){
            console.log(err);
        }
    }
    else{
        const url = encodeURI(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.api_key_weatherbit}`);
        try{
            const res = await fetch(url);
            const weather_data = await res.json();
            return weather_data.data[0];
        }catch(err){
            console.log(err);
        }
    }
}

// Function to get image data from Pixabay API
const get_image = async(city) =>{
    const url = encodeURI(`https://pixabay.com/api/?key=${process.env.api_key_pixabay}&q=${city}&image_type=photo`);
    try{
        const res = await fetch(url);
        const image_data = await res.json();
        if (image_data && image_data.hits && image_data.hits.length > 0) {
            return {
                image: image_data.hits[0].webformatURL
            };
        } else {
            throw new Error("No image data found");
        }
    }catch(err){
        console.log(err);
        throw err;
    }
}

// Route to handle POST request for travel data
app.post('/travel-data', async (req, res) =>{
    const {city, days_left} = req.body;
    const coordinates = await get_coordinates(city);
    const weather = await get_weather(coordinates.lat, coordinates.lng, days_left);
    try{
        const image = await get_image(city);
        return res.send({image, weather:{
            temp: weather.temp,
            description: weather.weather.description
        }});
    }catch(err){
        console.log("No image data found, please enter valid city");
    }
});

// Start the server on port 3000
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

// Export the app instance
module.exports = app;


// Software Engineer Joseph

