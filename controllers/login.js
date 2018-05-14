var express = require('express');
var router = express.Router();

const utils = require('../middlewares/loginUtils');
const favUtils = require('../middlewares/favUtils');

router.get('/', function (req, res, next) {
    res.render('login.hbs');
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
        var favRecipes = JSON.stringify(favUtils.getFavRecipesForUser(inpUsername));
        response.render('home.hbs', {
            resultRecipes: JSON.stringify([{
                currentUser: inpUsername
            }]),
            favRecipes: favRecipes
        });
    } else if (authenticationResult === 'no username') {
        response.render('login.hbs', {
            usernameDoesNotExist: true
        });
    }
});


module.exports = router;