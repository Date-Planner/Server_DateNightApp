'use strict';
const axios = require('axios');

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const Memory = require('./models/memory');
const verifyUser = require('./authorize')

const app = express();
app.use(cors());


const mainRecipes = require('./assets/recipes/main/recipe.json');
const getWeather = require('./weather');

const PORT = process.env.PORT || 3002;

app.use(express.json());

app.listen(PORT, () => console.log(`listening on ${PORT}`));

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;  
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log('Mongoose is Connected');
});


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
    // console.log('URL:', url); // request URL
    
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
    this.minTemp = `${((forecastData.min_temp * 9 / 5) + 32)} \u00B0 F`;
    this.maxTemp = `${((forecastData.max_temp * 9 / 5) + 32)} \u00B0 F`;
    this.icon = forecastData.weather.icon;
  }
}

// Kao *******************************************************
app.get('/movies', async (req, res) => {
  let genID = req.query.genID;
  console.log(genID);
  try {
    let data = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.DB_MOVIE_URL}&with_original_language=en&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=2010-01-01&primary_release_date.lte=2022-12-31&vote_average.gte=6&with_genres=${genID}`);
    const randomIndex = Math.floor(Math.random() * data.data.results.length);
    let randomMovie = data.data.results[randomIndex];
    randomMovie = new FilteredMovie(randomMovie);
    res.status(200).send(randomMovie);
  } catch (error) {
    console.error(error);
    res.status(500).send('Unable to retrieve movies data');
  }
});


// Coriana ******************************************************

app.get('/go-out-food', (req, res, next) => {

  let lon = req.query.lon;
  let lat = req.query.lat;
  let foodType = req.query.foodType;
  // const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=tacos&categories=restaurants&latitude=37.786882&longitude=-122.399972`;
  const apiKey = process.env.YELP_API_KEY;
  
  const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=${foodType}&latitude=${lat}&longitude=${lon}&categories=restaurants`;

  axios.get(yelpUrl, {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  })
    .then(response => {
      res.status(200).send(response.data);
      // console.log(response.data);
      // console.log(yelpUrl);
    })
    .catch(error => {
      console.log(error);
    });
  })
  
  // Cisco *******************************************************

  class FilteredMovie{
    constructor(movieObj){
      this.title = movieObj.original_title,
      this.releaseDate = movieObj.release_date,
      this.description = movieObj.overview,
      this.poster = 'https://image.tmdb.org/t/p/w500' + movieObj.poster_path
      this.genre = movieObj.genre_ids
    }
  }

  
  // app.use(verifyUser);

  app.get('/memories', async (request, response) => { 
    try {
      let allMemories = await Memory.find({});
      // let allMemories = await Memory.find({email: request.user.email}); 
      response.status(200).send(allMemories); 
    } catch (error) {
      response.status(500).send('error retrieving memories');
    }
  });

  app.post('/memories', async (request, response) => {

  try {
    let memory  = request.body;
    let newMemory = await Memory.create(memory);
    response.status(200).send(newMemory);
  } catch (error) {
    response.status(500).send('error creating memory');
  }
});

app.delete('/memories/:id', async (request, response) => {

  try {
    let id = request.params.id;
    // console.log(id);
    let deletedMemory = await Memory.findByIdAndDelete(id); 
    response.status(200).send(`${id} deleted`);
  } catch (error) {
    console.error(error);
    response.status(500).send(`Error deleting ${id}`);

  }
});

app.put('/memories/:id', async (request, response) => {
  let id = request.params.id; 
  console.log('testing');
  try {
    let memoryInput = request.body; 
    const updateOptions = { new: true, overwrite: true }; 
    let updatedMemory = await Memory.findByIdAndUpdate(id, memoryInput, updateOptions ); 
    response.status(200).send(updatedMemory);
  } catch (error) {
    console.error(error);
    response.status(500).send(`Error updating ${id}`);
  }
});