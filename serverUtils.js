const fs = require('fs');
const request = require('request');
const APP_ID = '9898d34a';
const APP_KEY = 'df03da67ec2c0fb66e7628b0c84c9bec';
const querystring = require('querystring');

const userpassFile = __dirname + '/userpass.json';
var chefRecords = [];

/**
 *See if userpass.json exists on drive, if not create file, if so read contents into var chefRecords
 **/
function checkRecords() {
    console.log(userpassFile);
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

/**
 *Checks if username and password are in userpass.json, if not then request user to log in again
 **/
module.exports.authenticateChef = (inpUsername, inpPassword) => {
    checkRecords();

    var usernameFound = false;
    for (var i = 0; i < chefRecords.length; i++) {
        console.log(chefRecords[i].username);
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

/**
 * The main function that does the API call to get the recipes
 * @param {list of object} params - the object from home.hbs, where the keys are the API attributes
 * @param {results of func} callback - prints the results
 */
module.exports.getRecipes = (params, callback) => {

    // Stringify the params if it is not already a query string
    var paramStr = params.query ? params.query : querystring.stringify(params);

    request({
        url: `https://api.edamam.com/search?app_id=${APP_ID}&app_key=${APP_KEY}&${paramStr}`,
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