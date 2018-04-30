const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');

const utils = require('./serverUtils');

var app = express();
var resultRecipes = '';
var inpUsername;

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/controllers'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (request, response) => {
    response.render('login.hbs')
});

/**
 * Controller for queries through the address bar
 **/
app.get('/search', function (req, res, next) {
    utils.getRecipes(req.query, (error, results) => {
        resultRecipes = JSON.stringify(results.recipes);
        res.render('home.hbs', {
            resultRecipes: resultRecipes
        });
    });
});

/**
 * The action to download a recipe
 **/
app.post('/download', function (req, res) {
    var recipe = JSON.parse(req.body.recipe);
    fs.writeFileSync(recipe.label + '.txt', req.body.recipe);
});

/**
 * After adding a new chef to the chef file, redirects to home page
 */
app.post('/registerchef', (request, response) => {
    var valid = utils.validateInput(request.body.username, request.body.password);

    if (valid == true) {
        utils.addToChefFile(request.body.username, request.body.password);
        response.render('login.hbs', {
            status: true
        });
    } 
    else if(valid == false) {
        response.render('login.hbs', {
            status: false
        });
        //response.redirect('/')
    }
});

/**
 * Handles logging in the user
 */
app.post('/getpass', (request, response) => {
    inpUsername = request.body.username;
    inpPassword = request.body.password;

    var authenticationResult = utils.authenticateChef(inpUsername, inpPassword);

    if (authenticationResult === 'authentication failure') {
        response.redirect('/')
    } else if (authenticationResult === 'logged in') {
        response.render('home.hbs', {
            resultRecipes: JSON.stringify([{
                currentUser: inpUsername
            }])
        })
    } else if (authenticationResult === 'no username') {
        response.render('login.hbs', {
            usernameDoesNotExist: true
        })
    }
});

app.listen(process.env.PORT || 8001, () => {
    console.log('Server is up on the port 8000');
});