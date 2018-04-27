const express = require('express');
const hbs = require('hbs');
const request = require('request');
const fs = require('fs');
const bodyParser = require('body-parser');

const APP_ID = '9898d34a';
const APP_KEY = 'df03da67ec2c0fb66e7628b0c84c9bec';

var app = express();
var resultRecipes = '';
var loggedIn = false;
var inpUsername;
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
            resultRecipes: JSON.stringify([{
                currentUser: inpUsername
            }])
        })
    } else {
        response.redirect('/');
    }
});

/**
 * The main function that does the API call to get the recipes
 * @param {list of object} params - the object from home.hbs, where the keys are the API attributes
 * @param {results of func} callback - prints the results 
 */
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
            body.hits.push({
                currentUser: inpUsername
            });
            callback(undefined, {
                recipes: body.hits
            })
        } else {
            console.log('Error beyond control');
        }
    })
};

/**Emilie
**/ 
app.get('/search', function (req, res, next) {
    getRecipes(req.query, (error, results) => {
        resultRecipes = JSON.stringify(results.recipes);
        res.render('home.hbs', {
            resultRecipes: resultRecipes
        });
    });
});

/**Emilie
**/ 
app.post('/search', function (req, res) {
    getRecipes(req.body, (error, results) => {
        resultRecipes = JSON.stringify(results.recipes);
        res.render('home.hbs', {
            resultRecipes: resultRecipes
        });
    });
});

/**Emilie
**/ 
app.post('/download', function (req, res) {
    var recipe = JSON.parse(req.body.recipe);
    fs.writeFileSync(recipe.label + '.txt', req.body.recipe);
});

var chefRecords = [];

app.post('/registerchef', (request, response) => {
    /**
     * The function adds the username & password to a JSON file 'userpass.json'
     */
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

/**P
**/ 
app.post('/getpass', (request, response) => {
    checkRecords();
    inpUsername = request.body.username;
    inpPassword = request.body.password;

    function AuthenticateChef(inpUsername, inpPassword) {
        var usernameFound = false;
        for (var i = 0; i < chefRecords.length; i++) {
            if (chefRecords[i].username == inpUsername) {
                usernameFound = true;
                if (chefRecords[i].password == inpPassword) {
                    loggedIn = true;
                    response.render('home.hbs', {
                        resultRecipes: JSON.stringify([{
                            currentUser: inpUsername
                        }])
                    })
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

/**P
**/ 
function checkRecords() {
    if (fs.existsSync('userpass.json') && fs.readFileSync('userpass.json').length !== 0) {
        getFile = fs.readFileSync('userpass.json');
        chefRecords = JSON.parse(getFile);
    }
}

app.listen(process.env.PORT || 8001, () => {
    console.log('Server is up on the port 8000');
});