const utils = require('../middlewares/loginUtils');


describe("testing validating registration", () => {
    test("valid input", () => {
        expect(utils.validateInput("username", "password")).toBeTruthy();
    })
});
