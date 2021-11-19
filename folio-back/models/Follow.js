const mongoose = require('mongoose');

const followSchema = mongoose.Schema({
    myEmail: {
        type: String,
    },
    userEmail: {
        type: String,
    },
});

const Follow = mongoose.model('Follow', followSchema);

module.exports = { Follow };