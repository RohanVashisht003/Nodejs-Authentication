const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('./config/passport-local-strategy');
const googleStrategy = require('./config/passport-google-strategy');
const MongoStore = require('connect-mongo');


app.use(express.static('./assets'));

app.set('layout extractStyles', true);
app.set('layout expressScripts', true);


app.use(expressLayouts);
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: 'authentication_app',
    secret: 'blabla',
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://rohan003:000@authentication-app003.cvhvzqi.mongodb.net/?retryWrites=true&w=majority'
    }, (err) => {
        console.log(err || 'connect-mongo setup ok');
    })
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use('/', require('./routes'));


app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('App is running on port', port);
})