const express = require('express');
const app = express();
const port = 8001;
const expressLayouts = require('express-ejs-layouts');

app.use(express.static('./assets'));

app.set('layout extractStyles',true);
app.set('layout expressScripts',true);


app.use(expressLayouts);
app.use(express.urlencoded({extended: false}));

app.set('view engine','ejs');
app.set('views','./views');

app.use('/',require('./routes'));


app.listen(port,(err)=>{
    if(err){
        console.log(err);
    }
    console.log('App is running on port',port);
})