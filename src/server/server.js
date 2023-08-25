var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
var bodyParser = require('body-parser')
var cors = require('cors')

const dotenv = require('dotenv');
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

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});

