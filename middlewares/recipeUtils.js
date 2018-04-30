const request = require('request');
const APP_ID = '9898d34a';
const APP_KEY = 'df03da67ec2c0fb66e7628b0c84c9bec';
const querystring = require('querystring');

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