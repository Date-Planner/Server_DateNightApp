'use strict';

// Hayden 

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const mainRecipes = require('./assets/recipes/main/recipe.json');

const PORT = process.env.PORT || 3002;

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

app.listen(PORT, () => console.log(`listening on ${PORT}`));

// Kenya 


















// Kao 
















// Coriana


















// Cisco 