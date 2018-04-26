const express = require('express');
const hbs = require('hbs');
const request = require('request');
const fs = require('fs');
const bodyParser = require('body-parser');

const APP_ID = '9898d34a';
const APP_KEY = 'df03da67ec2c0fb66e7628b0c84c9bec';

var app = express();
var resultRecipes = '';
var inpUsername = '';
var loggedIn = false;
var port = process.env.PORT || 8000;

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/imgs'));
app.use(bodyParser.urlencoded({
    extended: true
}));

hbs.registerHelper('getCopyRights', () => {
    return "Rest in Pepperoni";
});

app.get('/', (request, response) => {
    response.render('login.hbs')
});

app.get('/home', (request, response) => {
    if (loggedIn) {
        response.render('home.hbs', {
            resultRecipes: '{}',
            user: inpUsername
        })
    } else {
        response.redirect('/');
    }
});

var getRecipes = (params, callback) => {
    var paramString = '';
    if (params.diet) {
        paramString += 'dietLabels=' + params.diet + '&';
    }

    if (params.health) {
        paramString += 'healthLabels=' + params.health;
    }

    request({
        url: `https://api.edamam.com/search?app_id=${APP_ID}&app_key=${APP_KEY}&q=${params.q}&${paramString}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback("Cannot connect to API");
        } else if (body.hits) {
            callback(undefined, {
                recipes: body.hits
            })
        } else {
            console.log('Error beyond control');
        }
    })
};

app.get('/search', function (req, res, next) {
    getRecipes(req.query, (error, results) => {
        resultRecipes = JSON.stringify(results.recipes);
        res.render('home.hbs', {
            resultRecipes: resultRecipes
        });
    });
});

app.post('/search', function (req, res) {
    getRecipes(req.body, (error, results) => {
        resultRecipes = JSON.stringify(results.recipes);
        res.render('home.hbs', {
            resultRecipes: resultRecipes
        });
    });
});

app.post('/download', function (req, res) {
    var recipe = JSON.parse(req.body.recipe);
    fs.writeFileSync(recipe.label + '.txt', req.body.recipe);
});

var chefRecords = [];

app.post('/registerchef', (request, response) => {
    function AddtoFile() {
        var record = {
            "username": request.body.username,
            "password": request.body.password
        };
        chefRecords.push(record);
        newChef = JSON.stringify(chefRecords);
        fs.writeFileSync('userpass.json', newChef);
    }

    checkRecords();
    AddtoFile();
    response.redirect('/');
});

app.post('/getpass', (request, response) => {
    checkRecords()
    inpUsername = request.body.username;
    inpPassword = request.body.password;

    function AuthenticateChef(inpUsername, inpPassword) {
        var usernameFound = false;
        for (var i = 0; i < chefRecords.length; i++) {
            if (chefRecords[i].username == inpUsername) {
                usernameFound = true;
                if (chefRecords[i].password == inpPassword) {
                    loggedIn = true;
                    response.redirect('/home');
                } else {
                    response.redirect('/')
                }
            }
        }
        if (!usernameFound) {
            response.render('login.hbs', {
                usernameDoesNotExist: true
            })
        }
    }

    AuthenticateChef(inpUsername, inpPassword);

});

function checkRecords() {
    if (fs.existsSync('userpass.json') && fs.readFileSync('userpass.json').length !== 0) {
        getFile = fs.readFileSync('userpass.json');
        chefRecords = JSON.parse(getFile);
    }
}

app.listen(process.env.PORT || 8001, () => {
    console.log('Server is up on the port 8000');
});
