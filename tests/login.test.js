const utils = require('../middlewares/loginUtils');


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
    })

    test("username 4 chars", () => {
    	expect(utils.validateInput("123","password")).toBeFalsy();
    	expect(utils.validateInput("1234","password")).toBeTruthy();
    })

    test("password 4 chars", () => {
    	expect(utils.validateInput("username", "123")).toBeFalsy();
    	expect(utils.validateInput("username", "1234")).toBeTruthy();
    })

    test("user and pass empty", () => {
    	expect(utils.validateInput("", "")).toBeFalsy();
    })
});

describe("testing no repeat users", () => {
	test("repeat user", () => {
		expect(utils.noRepeatUsers("carson")).toBeFalsy();
		expect(utils.noRepeatUsers("there's no way you'll pick this username")).toBeTruthy();
	})
});
