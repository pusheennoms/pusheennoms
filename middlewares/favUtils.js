const fs = require('fs');
const path = require('path');

const favouritesFile = path.join(__dirname, '../data/favourites.json');
var favRecords = [];

/**
 *See if favourites.json exists on drive, if not create file, if so read contents into var chefRecords
 **/
if (fs.existsSync(favouritesFile) && fs.readFileSync(favouritesFile).length !== 0) {
    getFile = fs.readFileSync(favouritesFile);
    favRecords = JSON.parse(getFile);
}

/**
 * Add recipe to favourites.json
 * @param recipe
 */
var addToFavFile = (recipe) => {
    recipe = JSON.parse(recipe);
    var currentUser = recipe.currentUser;


    if (noRepeatFavs(recipe, currentUser)) {
        if (favRecords[currentUser]) {
            favRecords[currentUser].push(recipe);
        } else {
            favRecords[currentUser] = [recipe];
        }

        var newRecord = JSON.stringify(favRecords, undefined, 2);
        fs.writeFileSync(favouritesFile, newRecord);
    }
};

/**
 * Check to see no duplicate favourite recipe
 * @param recipe
 * @param user
 * @returns false if user already exists
 */
var noRepeatFavs = (recipe, user) => {
    var found = false;

    if (favRecords[user]) {
        for (var i = 0; i < favRecords[user].length; i++) {
            if (favRecords[user][i].uri === recipe.uri) {
                found = true
            }
        }
    }

    return !found;
};

var getFavRecipesForUser = (currentUser) => {
    return favRecords[currentUser] ? favRecords[currentUser] : [];
};

module.exports = {
    addToFavFile,
    getFavRecipesForUser
};
