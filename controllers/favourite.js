var express = require('express');
var router = express.Router();

const utils = require('../middlewares/favUtils');

/**
 * Adds a recipe to favourites
 */
router.post('/', function (req) {
    utils.addToFavFile(req.body);
});

/**
 * Controller to delete a favourite recipe for a user
 */
router.post('/delete', function (req) {
    utils.deleteFavRecipeForUser(req.body);
});

module.exports = router;