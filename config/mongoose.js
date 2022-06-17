// '####' --> use your credentials

const mongoose = require('mongoose');

mongoose.connect('####');

// mongoose.connect('mongodb://localhost/authentication_app')

const db = mongoose.connection;


db.on('error',console.error.bind(console,'Error in connecting to db'));

db.once('open',()=>{
    console.log("Successfully connected to db")
});

module.exports = db;
