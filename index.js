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
const flash = require('connect-flash');
const flashMiddleWare = require('./config/flash-middleware');
const env = require('./config/environment');


app.use(express.static('./assets'));

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.use(expressLayouts);
app.use(express.urlencoded({
    extended: true
}));
app.use(cookieParser());

// using template engine
app.set('view engine', 'ejs');

// using static files
app.set('views', './views');

// using session
app.use(session({
    name: 'authentication_app',
    secret:env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge:(1000*1800)
    },
    // storing  session to mongodb
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://rohan003:000@authentication-app003.cvhvzqi.mongodb.net/?retryWrites=true&w=majority'
    }, (err) => {
        console.log(err || 'connect-mongo setup ok');
    })
}))

// using flash middleware
app.use(flash());
app.use(flashMiddleWare.setFlash);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);



// using routes
app.use('/', require('./routes'));



app.listen(port, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('App is running on port', port);
})