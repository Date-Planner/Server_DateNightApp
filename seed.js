'use strict';

const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DATABASE_URL);

const Memory = require('./models/memory');

const date = new Date();

async function seed() {
    await Memory.create({
        date: `${date.toDateString()}`,
        movie: '{ type: String, require: false  }',
        app: '{ type: String, require: false }',
        main: '{ type: String, require: false }',
        dessert: '{ type: String, require: false }',
        bushinessName: '{ type: String, require: false }',
        bushinessPrice: '{ type: String, require: false }',
        bushinessUrl: '{ type: String, require: false }',
        fav: 0,
        email: 'thisIsNotYourEmail@notyours.com'
    });

    console.log('Memory 1 was created...');

    mongoose.disconnect();
}

seed();