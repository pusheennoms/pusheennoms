const express = require('express');
const hbs = require('hbs');
const request = require('request');

var app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCopyRights', () => {
	return "Rest in Pepperonis";
})

app.get('/', (request, response) => {    
    response.render('login.hbs')
})

app.get('/recipes', (request, response) => {
	// request({
	// 	url: `https://choppingboard.recipes/api/v0/recipe?key=8dc8a18d5f226439ad6eca4c305f90f1&q=http://www.taste.com.au/recipes/traditional-fruit-salad/0e478cd0-78a6-4e01-8411-0eedbaf98ae2`,
	// 	json: true
	// }, (error, response, body) => {
	// 	result = body
	// });

	response.render('recipes.hbs', {
		item1:'https://choppingboard.recipes/api/v0/recipe?key=8dc8a18d5f226439ad6eca4c305f90f1&q=http://www.taste.com.au/recipes/traditional-fruit-salad/0e478cd0-78a6-4e01-8411-0eedbaf98ae2'
	});
})

app.listen(8081, () => {
    console.log('Server is up on the port 8081');
})