const utils = require('../middlewares/loginUtils');

const fs = require('fs');
const path = require('path');

const userpassFile = path.join(__dirname, '../data/userpass.json');

var chefRecords = [];
getFile = fs.readFileSync(userpassFile);
chefRecords = JSON.parse(getFile);


describe("testing validating registration", () => {
    test("valid input", () => {
        expect(utils.validateInput("username", "password")).toBeTruthy();
    });

    test("username 4 chars", () => {
    	expect(utils.validateInput("123","password")).toBeFalsy();
    	expect(utils.validateInput("1234","password")).toBeTruthy();
    });

    test("password 4 chars", () => {
    	expect(utils.validateInput("username", "123")).toBeFalsy();
    	expect(utils.validateInput("username", "1234")).toBeTruthy();
    });

    test("user and pass empty", () => {
    	expect(utils.validateInput("", "")).toBeFalsy();
    });
});

describe("testing no repeat users", () => {
	test("repeat user", () => {
		expect(utils.noRepeatUsers(chefRecords[0].username)).toBeFalsy();
	});
    test("different user", () => {
		expect(utils.noRepeatUsers("123")).toBeTruthy();
    });
});

describe("testing authenticate chef", () => {
    test("existing user", () => {
        expect(utils.authenticateChef(chefRecords[0].username, chefRecords[0].password)).toBe("logged in")
    });
    test("wrong password", () => {
        expect(utils.authenticateChef(chefRecords[0].username, "123")).toBe("authentication failure")
    });
    test("nonexisting user", () => {
        expect(utils.authenticateChef("123", "123")).toBe("no username")
    });
});