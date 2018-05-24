const utils = require('../middlewares/loginUtils');

const fs = require('fs');
const path = require('path');
const cryptoJS = require('crypto-js');

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

    test("username 12 chars", () => {
        expect(utils.validateInput("123456789011123", "password")).toBeFalsy();
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
    utils.addToChefFile('user', 'password');
    test("repeat user", () => {
        expect(utils.noRepeatUsers('user')).toBeFalsy();
	});
    test("different user", () => {
        expect(utils.noRepeatUsers('uzer')).toBeTruthy();
    });
});

describe("testing authenticate chef", () => {
    test.skip("existing user", () => {
        expect(utils.authenticateChef(chefRecords[0].username, chefRecords[0].password)).toBe("logged in")
    });
    test("wrong password", () => {
        expect(utils.authenticateChef('user', "123")).toBe("authentication failure")
    });
    test("nonexisting user", () => {
        expect(utils.authenticateChef("uzer", "password")).toBe("no username")
    });
});