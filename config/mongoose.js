// Creating Mongodb Server -------->

// required library
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/codeial_development');

const db = mongoose.connection;

// if error

// db.on('err', console.error.bind(console, "Error in Connecting To mongodb"));
db.on('error', function(err) { 
    console.log(err.message); 
});

// connecting to server 
db.once('open', function(){
    console.log("Connected To Database :: Mongodb On 27017");
});

module.exports = db

