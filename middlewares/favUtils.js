const fs = require('fs');
const path = require('path');

const favouritesFile = path.join(__dirname, '../data/favourites.json');
var favRecords = {};

/**
 *See if favourites.json exists on drive, if not create file, if so read contents into var chefRecords
 **/
function checkFavRecords() {
    if (fs.existsSync(favouritesFile) && fs.readFileSync(favouritesFile).length !== 0) {
        getFile = fs.readFileSync(favouritesFile);
        favRecords = JSON.parse(getFile);
    }
}

/**
 * Add recipe to favourites.json
 * @param recipe
 */
var addToFavFile = (recipe) => {
    recipe = JSON.parse(recipe);
    var user = recipe.currentUser;

    if (noRepeatFavs(recipe, user)) {
        if (favRecords[user]) {
            favRecords[user].push(recipe);
        } else {
            favRecords[user] = [recipe];
        }

        var newRecord = JSON.stringify(favRecords, undefined, 2);
        fs.writeFileSync(favouritesFile, newRecord);
    }
};

/**
 * Check to see no duplicate favourite recipe
 * @param recipe
 * @returns false if user already exists
 */
var noRepeatFavs = (recipe, user) => {
    checkFavRecords();
    if (favRecords[user]) {
        for (var i = 0; i < favRecords[user].length; i++) {
            if (favRecords[user][i].uri === recipe.uri) {
                return false
            }
        }
    }
    return true
};

module.exports = {
    noRepeatFavs,
    addToFavFile
};
