const express = require('express');
const hbs = require('hbs');
const request = require('request');
const fs = require('fs');
const bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
	extended:true
}));

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

app.post('/registerchef', (request, response) => {
	var chefRecords = [];
	if (fs.readFileSync('userpass.json').length !== 0) {
    	getFile = fs.readFileSync('userpass.json');
    	chefRecords = JSON.parse(getFile);
	}
	AddtoFile(); 
	response.render('login.hbs');

	function openFile () {
		pass
	};

	function AddtoFile() {
		var record = {
			"username": request.body.username,
			"password": request.body.password
		};
		chefRecords.push(record);
		newChef = JSON.stringify(chefRecords);
		fs.writeFileSync('userpass.json', newChef);

	}; 
});

// TRY to open file NOT YET
// write to userpass.json OK 
// CATCH error -> create userpass.json NOT YET


app.get('/getpass', (request, response) => {
	console.log("lol")
});

app.listen(8081, () => {
    console.log('Server is up on the port 8081');
})