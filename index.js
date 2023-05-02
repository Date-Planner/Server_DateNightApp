'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const mainRecipes = require('./assets/recipes/main/recipe.json');

const PORT = process.env.PORT || 3002;

app.get('/testRecipe', (request, response) => {

  response.status(200).send(mainRecipes);

});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
