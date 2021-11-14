const mongoose = require('mongoose');

const writingSchema = mongoose.Schema({
    email: {
        type: String,
    },
    text: {
        type: String,
    },
    date: {
        type: Date,
    },
});

const Writing = mongoose.model('Writing', writingSchema);

module.exports = { Writing };