const mongoose = require('mongoose');

const folioSchema = mongoose.Schema({
    email: {
        type: String,
    },
    stacks: {
        type: Array,
    },
    workData: {
        type: Array,
    },
    intro: {
        type: String,
    },
    githubLink: {
        type: String,
    },
});

const Folio = mongoose.model('Folio', folioSchema);

module.exports = { Folio };