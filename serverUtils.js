const fs = require('fs');
const request = require('request');
const APP_ID = '9898d34a';
const APP_KEY = 'df03da67ec2c0fb66e7628b0c84c9bec';
const querystring = require('querystring');

var chefRecords = [];

/**
 *See if userpass.json exists on drive, if not create file, if so read contents into var chefRecords
 **/
function checkRecords() {
    if (fs.existsSync('userpass.json') && fs.readFileSync('userpass.json').length !== 0) {
        getFile = fs.readFileSync('userpass.json');
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
    fs.writeFileSync('userpass.json', newChef);
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
                loggedIn = true;
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

/**
 * The main function that does the API call to get the recipes
 * @param {list of object} params - the object from home.hbs, where the keys are the API attributes
 * @param {results of func} callback - prints the results
 */
module.exports.getRecipes = (params, callback) => {
    console.log(params);
    var paramString = querystring.stringify(params);
    console.log(paramString);

    request({
        url: `https://api.edamam.com/search?app_id=${APP_ID}&app_key=${APP_KEY}&q=${params.q}&${paramString}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback("Cannot connect to API");
        } else if (body.hits) {
            callback(undefined, {
                recipes: body.hits
            })
        } else {
            console.log('Error beyond control');
        }
    })
};