const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const mockAPIResponse = require('./mockAPI.js')

// Start up an instance of app
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('dist'));

console.log(__dirname);

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
    //res.sendFile(path.resolve('src/client/views/index.html'))
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!');
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse);
});

console.log(`Your API Key is ${process.env.API_KEY}`);
let userInput = [];

// POST Route
app.post('/sentimentAnalysis', async function (req, res) {
    userInput = req.body.txt;
    const response = await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&txt=${userInput}&lang=en`);
    const newData = await response.json();
    //console.log(newData);
    res.send(newData);
});
