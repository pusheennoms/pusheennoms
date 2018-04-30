const express = require('express');
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');

var app = express();
var loginRouter = require('./controllers/login');
var homeRouter = require('./controllers/home');

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', loginRouter);
app.use('/search', homeRouter);

<<<<<<< HEAD
app.listen(process.env.PORT || 8001, () => {
    console.log('Server is up on the port 8000');

});

=======
module.exports = app;
>>>>>>> 55e98f189ab7d9ea3da1efd2bcc065c211e3f3c1
