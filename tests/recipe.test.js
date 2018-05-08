const utils = require('../middlewares/recipeUtils');


describe("testing fetching recipes from Edamam", () => {
    test("valid query", () => {
        expect(utils.getRecipes({
            query: 'q=poke&dietLabels%5B%5D=high-protein&excluded=onions'
        }, undefined)).toBeTruthy();
    });
});
