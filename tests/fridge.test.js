const utils = require('../public/js/fridge2');

describe("format a non-blank input string based on an existing array", () => {
    test("no commas, blank existing array", () => {
        expect(utils.formatInput("abcd",[])).toEqual(["abcd"]);
    })
    test("no commas, non-duplicate existing array", () => {
        expect(utils.formatInput("abcd",["a"])).toEqual(["abcd"]);
    })
    test("no commas, duplicate existing array", () => {
        expect(utils.formatInput("abcd",["abcd", "a"])).toEqual([]);
    })
    test("with commas, blank existing array", () => {
        expect(utils.formatInput("ab,cd",[])).toEqual(["ab","cd"]);
    })
    test("with commas, non-duplicate existing array", () => {
        expect(utils.formatInput("ab,cd",["efgh"])).toEqual(["ab","cd"]);
    })
    test("with commas, partially-duplicate existing array", () => {
        expect(utils.formatInput("ab,cd",["ab","efgh"])).toEqual(["cd"]);
    })
    test("with commas, fully-duplicate existing array", () => {
        expect(utils.formatInput("ab,cd",["ab","cd","ef"])).toEqual([]);
    })
});


describe("toggle a boolean variable and modify an object", () => {
    test("false input", () => {
        expect(utils.delToggle(false, document.createElement('div'))).toBeTruthy();
    })
    test("true input", () => {
        expect(utils.delToggle(true, document.createElement('div'))).toBeFalsy();
    })
});

var object = document.createElement('div');
object.dataset.tag = 3;

describe("search for index of a dom object in the associated object data array", () => {
    test("slot 3 of object list", () => {
        expect(utils.searchIndex(object,['a','b','c',{id:3}])).toEqual(3);
    })
    test("slot 1 of object list", () => {
        expect(utils.searchIndex(object,['a',{id:3},'b','c'])).toEqual(1);
    })
});

describe("fidn row and column number of an item in the fridge based on the slot number", () => {
    test("slot number 5", () => {
        expect(utils.findPosition(5,[])).toEqual([1,2]);
    })
    test("slot number 11", () => {
        expect(utils.findPosition(11,[])).toEqual([3,2]);
    })
});

describe("check if an image source exist, replace the dom object background with an default image if it doesn't", () => {
    test("function does not crash", () => {
        expect(utils.checkImg(1,object)).toBeTruthy();
    })
});


describe("check if an input is blank or white space only", () => {
    test("blank", () => {
        expect(utils.checkBlank("")).toBeTruthy();
    })
    test("white space only", () => {
        expect(utils.checkBlank("   ")).toBeTruthy();
    })
    test("non-blank input", () => {
        expect(utils.checkBlank("abcd")).toBeFalsy();
    })
});