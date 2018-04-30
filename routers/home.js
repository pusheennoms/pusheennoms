var express = require('express');
var router = express.Router();

const utils = require('../serverUtils');

var resultRecipes = '';

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

/**
 * The action to download a recipe
 **/
router.post('/download', function (req, res) {
    var recipe = JSON.parse(req.body.recipe);
    fs.writeFileSync(recipe.label + '.txt', req.body.recipe);
});

module.exports = router;