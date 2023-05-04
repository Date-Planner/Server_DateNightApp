'use strict';

const mongoose =  require('mongoose');

const { Schema } = mongoose;

const memorySchema = new Schema({
    date: { type: Number, require: true},
    movie: { type: String, require: false},
    app: { type: String, require: false},
    main: { type: String, require: false},
    dessert: { type: String, require: false},
    restaurant: { type: String, require: false},
    note: { type: String, require: false},

});

const Memory = mongoose.model('memory', memorySchema);

module.exports = Memory;