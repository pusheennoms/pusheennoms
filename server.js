const express = require('express');
const hbs = require('hbs');
const path = require('path');
const bodyParser = require('body-parser');

// const utils = require('./serverUtils');

var app = express();
var loginRouter = require('./routers/login');
var homeRouter = require('./routers/home');

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', loginRouter);
app.use('/search', homeRouter);

//
// /**
//  * Controller for queries through the address bar
//  **/
// app.get('/search', function (req, res, next) {
//     utils.getRecipes(req.query, (error, results) => {
//         resultRecipes = JSON.stringify(results.recipes);
//         res.render('home.hbs', {
//             resultRecipes: resultRecipes
//         });
//     });
// });
//
// /**
//  * The action to download a recipe
//  **/
// app.post('/download', function (req, res) {
//     var recipe = JSON.parse(req.body.recipe);
//     fs.writeFileSync(recipe.label + '.txt', req.body.recipe);
// });

// /**
//  * After adding a new chef to the chef file, redirects to home page
//  */
// app.post('/registerchef', (request, response) => {
//     utils.addToChefFile(request.body.username, request.body.password);
//     response.redirect('/');
// });
//
// /**
//  * Handles logging in the user
//  */
// app.post('/getpass', (request, response) => {
//     inpUsername = request.body.username;
//     inpPassword = request.body.password;
//
//     var authenticationResult = utils.authenticateChef(inpUsername, inpPassword);
//
//     if (authenticationResult === 'authentication failure') {
//         response.redirect('/')
//     } else if (authenticationResult === 'logged in') {
//         response.render('home.hbs', {
//             resultRecipes: JSON.stringify([{
//                 currentUser: inpUsername
//             }])
//         })
//     } else if (authenticationResult === 'no username') {
//         response.render('login.hbs', {
//             usernameDoesNotExist: true
//         })
//     }
// });

// app.listen(process.env.PORT || 8001, () => {
//     console.log('Server is up on the port 8000');
// });

module.exports = app;