'use strict';

const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect('mongodb+srv://userAdmin:N30zudrhQF4yyBCs@cluster0.6pxjsgt.mongodb.net/?retryWrites=true&w=majority');

const Memory = require('./models/memory');

async function seed() {
    await Memory.create({
        date: Date.now(),
        movie: '{ type: String, require: false }',
        app: '{ type: String, require: false }',
        main: '{ type: String, require: false }',
        dessert: '{ type: String, require: false }',
        restaurant: '{ type: String, require: false }',
        note: '{ type: String, require: false }',
    });

    console.log('Memory 1 was created...');

    mongoose.disconnect();
}

seed();