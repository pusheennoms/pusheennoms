const express = require('express');
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');

var app = express();
var loginRouter = require('./controllers/login');
var homeRouter = require('./controllers/home');
var favRouter = require('./controllers/favourite');
var errorRouter = require('./controllers/error');

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', loginRouter);
app.use('/search', homeRouter);
app.use('/favourite', favRouter);
app.use('*', errorRouter);

module.exports = app;