/*--------------variables--------------*/
var coll = document.getElementsByClassName("collapsible");
var currentResults, currentUser, currentSearchHistory;

/**
 * Set the results taken from the server after the search and calls the function to show results on page
 * @param {string} res - the stringified JSON object from the search results
 */
function setCurrentResults(res) {
    currentResults = JSON.parse(res.replace(/&quot;/g, '\"'));
    if (currentResults && currentResults.length) {
        if (currentResults[currentResults.length - 1].currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentResults[currentResults.length - 1].currentUser));
        } else {
            showResults();

        }
    }
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    document.getElementById('welcome-user-msg').innerHTML =
        `Welcome, ${currentUser}!`;
}

/**
 * log outs user and cleans the current recipes, the faved recipes, and the welcome user name
 */
function logout() {
    try {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentRecipes');
        localStorage.removeItem('favRecipes');
    } finally {
        window.location.href = '/';
    }
}

/**
 * Display the search results
 */
function showResults() {
    document.getElementById('welcome-div').style.display = 'none';
    hidePusheen();

    for (var i = 0; i < currentResults.length; i++) {

        // Displaying a recipe result
        var node = document.createElement('a');
        var nodeLABELS = document.createElement('div');
        var nodeIMAGE = document.createElement('img');
        var nDiv = document.createElement('div');

        node.href = currentResults[i].recipe.url;
        node.innerHTML = currentResults[i].recipe.label;
        nodeLABELS.innerHTML = "HEALTH: " + currentResults[i].recipe.healthLabels + "<br>DIET: " + currentResults[i].recipe.dietLabels +
            "<br>INGREDIENTS: " + currentResults[i].recipe.ingredientLines;

        node.setAttribute('id', i.toString());
        node.setAttribute('target', '_new');
        node.className = 'searchResultsLink';

        nodeLABELS.style.maxHeight = "20vh";
        nodeLABELS.style.overflowY = "auto";
        nodeIMAGE.className = 'searchResultsImgs';
        nodeIMAGE.setAttribute("src", currentResults[i].recipe.image);

        // Save to favourites form and input
        var hiddenFavForm = document.createElement('form');
        hiddenFavForm.id = 'save-' + i.toString();

        var saveFavBtn = document.createElement('button');
        saveFavBtn.className = 'saveFavBtn';
        saveFavBtn.innerHTML = 'Save to Favourites';

        nDiv.appendChild(nodeIMAGE);
        nDiv.appendChild(document.createElement('br'));
        nDiv.appendChild(node);
        nDiv.appendChild(nodeLABELS);
        nDiv.appendChild(hiddenFavForm);
        nDiv.appendChild(saveFavBtn);
        nDiv.appendChild(document.createElement('br'));
        nDiv.appendChild(document.createElement('br'));

        nDiv.className = "searchResultDiv  col-lg-3 col-md-4 col-sm-6 col-xs-12";

        document.getElementById('search-row').appendChild(nDiv);
        document.getElementById("iconlinks").style.display = 'none';

        // Action for the save to favourites button
        saveFavBtn.onclick = (function (recipe) {
            return function () {
                addToFavoritesList(recipe);
            }
        })(currentResults[i].recipe);
    }
}

/*-----------INTERACTIONS--------------*/
var infoModal = document.getElementById("infoModal");

function openInfo() {
    infoModal.style.display = "block";
}

function closeInfo() {
    infoModal.style.display = "none";
}

var logo = document.getElementById("logo");

logo.addEventListener("click", function () {
    openInfo();
});

/**
 * fridge display close when clicking outside the window
 */
window.addEventListener("click", function (ev) {
    if (ev.target === infoModal) {
        infoModal.style.display = "none";
    }
});
