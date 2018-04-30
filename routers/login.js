var express = require('express');
var router = express.Router();

const utils = require('../serverUtils');

router.get('/', function (req, res, next) {
    res.render('login.hbs')
});

/**
 * After adding a new chef to the chef file, redirects to home page
 */
router.post('/registerchef', (request, response) => {
    utils.addToChefFile(request.body.username, request.body.password);
    response.redirect('/');
});

/**
 * Handles logging in the user
 */
router.post('/getpass', (request, response) => {
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


module.exports = router;