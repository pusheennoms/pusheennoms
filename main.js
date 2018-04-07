const express = require('express');
const hbs = require('hbs');
const request = require('request');

const APP_ID = '629ab869';
const APP_KEY =  '56dc21e2492074fbd86fd463a035bd73';

var app = express();
var resultRecipes;

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use('/public', express.static(__dirname + '/public'));


hbs.registerHelper('getCopyRights', () => {
	return "Rest in Pepperonis";
})


app.get('/', (request, response) => {
	resultRecipes = JSON.stringify(resultRecipes)
    response.render('main.hbs', {
    	recipes: resultRecipes
    })
})

app.listen(8081, () => {
    console.log('Server is up on the port 8081');

	getRecipes = (params, callback) => {
		var paramStr = params.join('&');
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
				console.log(body + 'FOOOOOOOBAAAAAAAAAR');			
			}
		})
	}

	getRecipes(['q=chicken'], (error, results) => {
		resultRecipes = results.recipes;
	});
})