const express = require('express');
const hbs = require('hbs')
const layouts = require('handlebars-layouts');
const cookieParser = require('cookie-parser');
const fs = require('fs');

// 1. create the app
var app = express();

// 2. setup the view engine
app.set('view engine', 'hbs');

// parse and process JSON
app.use(express.json());

// process form
app.use(express.urlencoded({ extended: false }));

// set up static folder
app.use(express.static('public'));

// coookie parser
app.use(cookieParser());

// setup handlebars to use layouts
layouts.register(hbs.handlebars);

// register template
hbs.registerPartial('layout', fs.readFileSync('views/base.hbs', 'utf8'))

// 3. Routes
/** YOUR ROUTES HERE **/

// This is the base route
app.get('/', (req, res) => {
    // res.send('Hello Express app');
    res.render('index')
});

/** NO ROUTES AFTERWARDS */


// 4. enable express
app.listen(3000, () => console.log('server started'));