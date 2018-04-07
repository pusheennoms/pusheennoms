const express = require('express');
const hbs = require('hbs');
const request = require('request');
const fs = require('fs');
const bodyParser = require('body-parser');

const APP_ID = '629ab869';
const APP_KEY = '56dc21e2492074fbd86fd463a035bd73';

var app = express();
var resultRecipes = '';

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/imgs'));
app.use(bodyParser.urlencoded({
	extended:true
}));

hbs.registerHelper('getCopyRights', () => {
	return "Rest in Pepperonis";
})

app.get('/', (request, response) => {    
    response.render('login.hbs')
})

app.get('/home', (request, response) => {
	resultRecipes = JSON.stringify(resultRecipes)
    response.render('main.hbs')
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

app.post('/search', function (req, res) {
	getRecipes = (param, callback) => {
		request({
			url: `https://api.edamam.com/search?app_id=${APP_ID}&app_key=${APP_KEY}&q=${param}`,
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

	getRecipes(req.body.q, (error, results) => {
		resultRecipes = JSON.stringify(results.recipes);
	});

	res.render('main.hbs', {
		resultRecipes: resultRecipes
	})
})

// app.get('/search', function (req, res) {
// 	searchResults = JSON.stringify(resultRecipes);
// 	console.log('FOOOOOOOBAAAAAAAAAR');
	
// })

app.get('/getpass', (request, response) => {
	console.log("lol")
});

app.listen(8081, () => {
    console.log('Server is up on the port 8081');
})