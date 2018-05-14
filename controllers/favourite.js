var express = require('express');
var router = express.Router();

const utils = require('../middlewares/favUtils');

router.post('/', function (req, res) {
    var recipe = req.body.favRecipe;
    utils.addToFavFile(recipe);
    res.redirect('back');
});

router.post('/delete', function (req, res) {
    utils.deleteFavRecipeForUser(req.body);
});

module.exports = router;