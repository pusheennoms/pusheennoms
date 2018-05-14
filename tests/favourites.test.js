const utils = require('../middlewares/favUtils');

const fs = require('fs');
const path = require('path');

const favFile = path.join(__dirname, '../data/favourites.json');
let record = {
    label: 'test',
    uri: 'testuri',
    currentUser: 'carson'
};

describe("testing adding new favourite recipe", () => {
    test("add new recipe", () => {
        utils.addToFavFile(JSON.stringify(record));
        let favRecords = JSON.parse(fs.readFileSync(favFile));
        expect(favRecords['carson']).toContainEqual(record);
    })
});

describe("testing no repeat favourite recipes", () => {
    test("repeat recipe", () => {
        expect(utils.noRepeatFavs(record, 'carson')).toBeFalsy();
    });

    test("different recipe", () => {
        expect(utils.noRepeatFavs({
            uri: 123,
            recipeLabel: '123'
        }, 'carson')).toBeTruthy();
    })
});

describe("delete favourite recipes", () => {
    test("delete recipe", () => {
        let delRecord = {
            uri: record.uri,
            user: 'carson'
        };
        utils.deleteFavRecipeForUser(delRecord);
        let newFavRecords = JSON.parse(fs.readFileSync(favFile));
        expect(newFavRecords['carson']).not.toContainEqual(delRecord);
    });
});