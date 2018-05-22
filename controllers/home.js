var express = require('express');
var router = express.Router();

const utils = require('../middlewares/recipeUtils');

/**
 * Controller for queries through the address bar
 **/
router.get('/', function (req, res) {
    utils.getRecipes(req.query, (error, results) => {
        if (results.recipes.length > 0) {
            res.render('home.hbs', {
                resultRecipes: JSON.stringify(results.recipes)
            });
        } else {
            res.render('error.hbs', {
                errorMsg: 'Your query returned no results :('
            })
        }
    });
});

module.exports = router;
