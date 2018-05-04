var express = require('express');
var router = express.Router();

const utils = require('../middlewares/recipeUtils');

/**
 * Controller for queries through the address bar
 **/
router.get('/', function (req, res, next) {
    utils.getRecipes(req.query, (error, results) => {
        resultRecipes = JSON.stringify(results.recipes);
        res.render('home.hbs', {
            resultRecipes: resultRecipes
        });
    });
});

module.exports = router;