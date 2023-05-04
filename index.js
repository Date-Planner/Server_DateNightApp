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

app.listen(PORT, () => console.log(`listening on ${PORT}`));


// Hayden *******************************************************

app.get('/main', (request, response) => {
  const filteredRecipes = mainRecipes.recipes.filter(recipe => recipe.type === "main");
  const randomIndex = Math.floor(Math.random() * filteredRecipes.length);
  const randomRecipe = filteredRecipes[randomIndex];
  response.status(200).send(randomRecipe);
});

app.get('/app', (request, response) => {
  const filteredRecipes = mainRecipes.recipes.filter(recipe => recipe.type === "app");
  const randomIndex = Math.floor(Math.random() * filteredRecipes.length);
  const randomRecipe = filteredRecipes[randomIndex];
  response.status(200).send(randomRecipe);
});

app.get('/dessert', (request, response) => {
  const filteredRecipes = mainRecipes.recipes.filter(recipe => recipe.type === "dessert");
  const randomIndex = Math.floor(Math.random() * filteredRecipes.length);
  const randomRecipe = filteredRecipes[randomIndex];
  response.status(200).send(randomRecipe);
});


// kenya *******************************************************
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

// Kao *******************************************************
app.get('/movies', async (req, res) => {
  let genID = req.query.genID;
  try {
    let data = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.DB_MOVIE_URL}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=2013-01-01&primary_release_date.lte=2023-12-30&vote_average.gte=6&with_genres=${genID}`);
    res.send(data.data.results);
  } catch (error) {
    console.error(error);
    res.status(500).send('Unable to retrieve movies data');
  }
});

















// Coriana *******************************************************

app.get('/go-out-food', (req, res, next) => {

  const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurant&latitude=37.786882&longitude=-122.399972`;
  const apiKey ='VyHjgfW3W8ygv8tKF9Jaum5Dda4PP2yS7jRTETtsJs-jOBl7RHejNE4npR6wV7i0GAGxNOffXelHbMSwmf2sKosd-yiwxWbh8917YO7ICHqebJGR9b9X4DfqefJCZHYx'
  //process.env.YELP_API_KEY;
  
  axios.get(yelpUrl, {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  })
    .then(response => {
      res.status(200).send(response.data);
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    });
  })


















// Cisco *******************************************************