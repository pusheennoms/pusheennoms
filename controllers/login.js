var express = require('express');
var router = express.Router();

const utils = require('../middlewares/loginUtils');
const favUtils = require('../middlewares/favUtils');
var loggedIn = false;

/**
 * Renders login.hbs by default
 */
router.get('/', function (req, res) {
    loggedIn = false;
    res.render('login.hbs');
});

router.get('/home', function (req, res) {
    if (loggedIn) {
        let favRecipes = JSON.stringify(favUtils.getFavRecipesForUser(loggedIn));
        res.render('home.hbs', {
            resultRecipes: JSON.stringify([{
                currentUser: loggedIn
            }]),
            favRecipes: favRecipes
        });
    } else {
        res.redirect('/');
    }
});

/**
 * After adding a new chef to the chef file, redirects to home page
 */
router.post('/registerchef', (request, response) => {
    var valid = utils.validateInput(request.body.username, request.body.password);
    var noRepeat = utils.noRepeatUsers(request.body.username);

    if (valid === true && noRepeat === true) {
        utils.addToChefFile(request.body.username, request.body.password);
        response.render('login.hbs', {
            status: 0
        });
    }
    else if (noRepeat === false) {
        response.render('login.hbs', {
            status: 2
        });
    }
});

/**
 * Handles logging in the user
 */
router.post('/getpass', (request, response) => {
    var inpUsername = request.body.username;
    var inpPassword = request.body.password;

    var authenticationResult = utils.authenticateChef(inpUsername, inpPassword);
    if (authenticationResult === 'authentication failure') {
        response.render('login.hbs', {
            status: 1
        });
    } else if (authenticationResult === 'logged in') {
        loggedIn = inpUsername;
        response.redirect('/home');
    } else if (authenticationResult === 'no username') {
        response.render('login.hbs', {
            usernameDoesNotExist: true
        });
    }
});

module.exports = router;
