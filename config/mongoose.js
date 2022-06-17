// '####' --> use your credentials

const mongoose = require('mongoose');

// mongoose.connect('####');

// connecting with mongnodb
mongoose.connect('mongodb://localhost/authentication_app')

const db = mongoose.connection;

//  if error
db.on('error',console.error.bind(console,'Error in connecting to db'));

// if successfully connected to db
db.once('open',()=>{
    console.log("Successfully connected to db")
});

module.exports = db;
