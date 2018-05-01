const fs = require('fs');
const path = require('path');

const userpassFile = path.join(__dirname, '../data/userpass.json');
var chefRecords = [];

/**
 *See if userpass.json exists on drive, if not create file, if so read contents into var chefRecords
 **/
function checkRecords() {
    if (fs.existsSync(userpassFile) && fs.readFileSync(userpassFile).length !== 0) {
        getFile = fs.readFileSync(userpassFile);
        chefRecords = JSON.parse(getFile);
    }
}

/**
 * The function adds the username & password to a JSON file 'userpass.json'
 */
module.exports.addToChefFile = (username, password) => {
    checkRecords();
    var record = {
        "username": username,
        "password": password
    };
    chefRecords.push(record);
    var newChef = JSON.stringify(chefRecords);
    fs.writeFileSync(userpassFile, newChef);
};

module.exports.validateInput = (userInp, passInp) => {
    if ((userInp.length <= 3) || (passInp.length <= 3)) {
        return false;
    }
    else {
        return true;
    }
};

/**
 *Checks if username and password are in userpass.json, if not then request user to log in again
 **/
module.exports.authenticateChef = (inpUsername, inpPassword) => {
    checkRecords();

    var usernameFound = false;
    for (var i = 0; i < chefRecords.length; i++) {
        if (chefRecords[i].username == inpUsername) {
            usernameFound = true;
            if (chefRecords[i].password == inpPassword) {
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