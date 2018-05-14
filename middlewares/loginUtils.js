const fs = require('fs');
const path = require('path');

const userpassFile = path.join(__dirname, '../data/userpass.json');
var chefRecords = [];

/**
 *See if userpass.json exists on drive, if not create file, if so read contents into var chefRecords
 **/
if (fs.existsSync(userpassFile) && fs.readFileSync(userpassFile).length !== 0) {
    let getFile = fs.readFileSync(userpassFile);
    chefRecords = JSON.parse(getFile);
}

/**
 * Add username and password to userpass.json
 * @param username
 * @param password
 */
var addToChefFile = (username, password) => {
    var record = {
        "username": username,
        "password": password
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
    if ((userInp.length <= 3) || (passInp.length <= 3)) {
        return false;
    }
    else {
        return true;
    }
};

/**
 * Check to see no duplicate username
 * @param newUser
 * @returns false if user already exists
 */
var noRepeatUsers = (newUser) => {
    for (var i = 0; i < chefRecords.length; i++) {
        if (chefRecords[i].username.indexOf(newUser) === 0) {
            return false;
        }
    }
    return true;
};

/**
 *Checks if username and password are in userpass.json, if not then request user to log in again
 **/
var authenticateChef = (inpUsername, inpPassword) => {
    var usernameFound = false;
    for (var i = 0; i < chefRecords.length; i++) {
        if (chefRecords[i].username === inpUsername) {
            usernameFound = true;
            if (chefRecords[i].password === inpPassword) {
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