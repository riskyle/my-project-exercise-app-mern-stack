const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workout = new Schema({
    title: {
        type: String,
        required: true,
    },
    reps: {
        type: Number,
        required: true,
    },
    loads: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true,
    }
}, { timestamps: true })

//that exercises will create automatically a collection in the mongodb database
//collection means table in sql      ⬇
const Exercise = mongoose.model('exercises', workout);

module.exports = { Exercise }
