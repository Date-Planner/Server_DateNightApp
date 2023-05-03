'use strict';
const axios = require('axios');

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const mainRecipes = require('./assets/recipes/main/recipe.json');
const getWeather = require('./weather');

const PORT = process.env.PORT || 3002;

app.get('/testRecipe/random', (request, response) => {
  const randomIndex = Math.floor(Math.random() * mainRecipes.recipes.length);
  response.status(200).send(mainRecipes.recipes[randomIndex]);
});

app.get('/weather',  async(req, res, next) => {
  try {
    let lat = req.query.lat;
    let lon = req.query.lon;
    let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}&lat=${lat}&lon=${lon}`;

    // check if endpoint 'weather' works on Thunder lat 47.60621 lon -122.33207
    // res.status(200).send(lat,lon);
    console.log('URL:', url); // request URL

    let weatherAPI = await axios.get(url);
    let forecasts = weatherAPI.data.data.map(obj => new Forecast(obj));

    console.log('Forecasts:', forecasts); // mapped forecasts

    res.status(200).send(forecasts);
  } catch (error) {
    next(error);
  }
});
class Forecast {
  constructor(forecastData) {
    // this.date = forecastData.datetime;
    this.description = forecastData.weather.description;
    this.minTemp = forecastData.min_temp;
    this.maxTemp = forecastData.max_temp;
    this.icon = forecastData.weather.icon;
  }
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));

