'use strict';

const mongoose =  require('mongoose');

const { Schema } = mongoose;

const memorySchema = new Schema({
    date: { type: String, require: true},
    movie: { type: String, require: false},
    app: { type: String, require: false},
    main: { type: String, require: false},
    dessert: { type: String, require: false},
    bushinessName: { type: String, require: false},
    bushinessPrice: { type: String, require: false},
    bushinessUrl: { type: String, require: false},
    fav: { type: Number, require: true},
    email: String

});

const Memory = mongoose.model('memory', memorySchema);

module.exports = Memory;