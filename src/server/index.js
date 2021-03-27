const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
const fetch = require('node-fetch');
const cors = require('cors');

let baseURL = 'https://api.meaningcloud.com/sentiment-2.1?key=';
const apiKEY = process.env.API_KEY;
const lang = '&lang=auto';
console.log(`Your API key is ${process.env.API_KEY}`);

//Instantiate app
const app = express();
app.use(express.static('dist'));

/*Middleware*/
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

console.log(__dirname);

app.get('/', function (req, res) {
  res.sendFile('dist/index.html');
  //res.sendFile(path.resolve('src/client/views/index.html'))
});

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
  console.log('Evaluate news Article app listening on port 8081!');
});

//POST request to API to fetch data
app.post('/apiCall', async (req, res) => {
  const apiData = await fetch(
    `${baseURL}${apiKEY}${lang}&url=${req.body.formUrl}`,
    {
      method: 'POST',
    }
  );
  try {
    const data = await apiData.json();
    console.log(apiData, data);
    res.send(data);
  } catch (err) {
    console.log('error', err);
  }
});
