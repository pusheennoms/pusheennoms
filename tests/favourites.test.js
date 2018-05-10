const utils = require('../middlewares/favUtils');

const fs = require('fs');
const path = require('path');

const favFile = path.join(__dirname, '../data/favourites.json');

describe("testing no repeat favourite recipes", () => {
    const favRecords = JSON.parse(fs.readFileSync(favFile));
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

describe("testing adding new favourite recipe", () => {
    test("add new recipe", () => {
        let record = {
            test: 'test',
            currentUser: 'carson'
        };
        utils.addToFavFile(JSON.stringify(record));
        let favRecords = JSON.parse(fs.readFileSync(favFile));
        expect(favRecords['carson']).toContainEqual(record);
    })
});

describe("delete favourite recipes", () => {
    test("delete recipe", () => {
        let favRecords = JSON.parse(fs.readFileSync(favFile));
        let record = favRecords['carson'][0];
        utils.deleteFavRecipeForUser(record, 'carson');
        let newFavRecords = JSON.parse(fs.readFileSync(favFile));
        expect(newFavRecords['carson']).not.toContainEqual(record);
    });
});