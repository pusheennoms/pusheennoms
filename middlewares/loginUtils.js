const fs = require('fs');
const path = require('path');
const cryptoJS = require('crypto-js');

const userpassFile = path.join(__dirname, '../data/userpass.json');
var chefRecords = [];

/**
 * See if userpass.json exists on drive, if not create file, if so read contents into var chefRecords
 **/
if (fs.existsSync(userpassFile) && fs.readFileSync(userpassFile).length !== 0) {
    let getFile = fs.readFileSync(userpassFile);
    chefRecords = JSON.parse(getFile);
}

/**
 * Hashes information
 * @param the information that is to be hashed
 * @returns the hashed array
 */
var hash_info = (info) => {
    return cryptoJS.SHA1(info)
};

/**
 * Add username and password to userpass.json
 * @param username
 * @param password
 */
var addToChefFile = (username, password) => {
    var ciphertext = hash_info(password);
    var record = {
        "username": username,
        "password": ciphertext
    };
    chefRecords.push(record);
    var newChef = JSON.stringify(chefRecords);
    fs.writeFileSync(userpassFile, newChef);
};
/**
 * Ensure that username and password are greater than 3 characters
 * @param userInp the username
 * @param passInp the password
 * @returns {boolean}
 */
var validateInput = (userInp, passInp) => {
    return userInp.length >= 4 && passInp.length >= 4 && userInp.length < 12;
};

/**
 * Check to see no duplicate username
 * @param newUser
 * @returns false if user already exists
 */
var noRepeatUsers = (newUser) => {
    for (var i = 0; i < chefRecords.length; i++) {
        if (chefRecords[i].username === newUser) {
            return false;
        }
    }
    return true;
};

/**
 * Checks if username and password are in userpass.json, if not then request user to log in again
 **/
var authenticateChef = (inpUsername, inpPassword) => {
    var usernameFound = false;
    var hashInpPass = hash_info(inpPassword);
    for (var i = 0; i < chefRecords.length; i++) {
        if (chefRecords[i].username.toLowerCase() === inpUsername.toLowerCase()) {
            usernameFound = true;
            if (JSON.stringify(chefRecords[i].password) === JSON.stringify(hashInpPass)) {
                return 'logged in';
            } else {
                return 'authentication failure';
            }
        }
    }
    if (!usernameFound) {
        return 'no username';
    }
};

module.exports = {
    addToChefFile,
    validateInput,
    authenticateChef,
    noRepeatUsers
};
