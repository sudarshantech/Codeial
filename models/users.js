const mongoose = require('mongoose');

const usersScheama = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }

}, {
    timestamps : true
});
    

const User = mongoose.model('User', usersScheama);
module.exports = User;