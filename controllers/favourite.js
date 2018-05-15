var express = require('express');
var router = express.Router();

const utils = require('../middlewares/favUtils');

/**
 * Posts a new favourite recipe for a user
 */
router.post('/', function (req, res) {
    var recipe = req.body.favRecipe;
    utils.addToFavFile(recipe);
    res.redirect('back');
});

/**
 * Controller for deleting a favourite recipe
 */
router.post('/delete', function (req, res) {
    utils.deleteFavRecipeForUser(req.body);
});

module.exports = router;
