const utils = require('../middlewares/favUtils');

const fs = require('fs');
const path = require('path');

const favFile = path.join(__dirname, '../data/favourites.json');

var favRecords = [];
getFile = fs.readFileSync(favFile);
favRecords = JSON.parse(getFile);

describe("testing no repeat favourite recipes", () => {
    test("repeat recipe", () => {
        expect(utils.noRepeatFavs(favRecords['carson'][0], 'carson')).toBeFalsy();
    });

    test("different recipe", () => {
        expect(utils.noRepeatFavs({
            uri: 123,
            recipeLabel: '123'
        }, 'carson')).toBeTruthy();
    })
});
