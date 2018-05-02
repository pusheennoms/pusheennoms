/*--------------variables--------------*/
var coll = document.getElementsByClassName("collapsible");

var currentResults;
var currentUser = JSON.parse(localStorage.getItem('currentUser'));

var pushleft = 0;

/*-------------foodDisplay-------------*/
showWelcomeUserMsg();
showSearchHistory();

/**
 * Displays the welcome user msg at the top right banner
 */
function showWelcomeUserMsg() {
    document.getElementById('welcome-user-msg').innerHTML = `Welcome, ${currentUser}!`;
}

/**
 * Displays the search history below search bar
 */
function showSearchHistory() {
    var savedSearchHistory = JSON.parse(localStorage.getItem('searchHistory')),
        currentSearchHistory = savedSearchHistory ? savedSearchHistory : {};
    var foodList = document.getElementById('food-list');

    if (!currentSearchHistory[currentUser]) {
        currentSearchHistory[currentUser] = [];
    }

    foodList.style.display = 'block';

    var ndiv2 = document.createElement('div');
    ndiv2.setAttribute('id', 'searchlist');


    for (i = 0; i < currentSearchHistory[currentUser].length; i++) {
        var ndiv = document.createElement("a");

        ndiv.innerHTML = currentSearchHistory[currentUser][i].value;
        var tags = Object.values(currentSearchHistory[currentUser][i]);
        for (j = 1; j < tags.length - 1; j++) {
            ndiv.innerHTML += ` ${tags[j]} `;
        }

        ndiv.className = "added-ingredients";
        ndiv.style.cursor = "pointer";
        ndiv.setAttribute('href', '/search?' + currentSearchHistory[currentUser][i].query);
        ndiv.setAttribute("id", "food-" + i);

        foodList.appendChild(ndiv2);
        ndiv2.appendChild(ndiv);
        ndiv2.appendChild(document.createElement('br'));
        //foodList.appendChild(ndiv);
        //foodList.appendChild(document.createElement("br"));
    }
}

/**
 * Display the search results
 */
function showResults() {
    hidePusheen();
    document.getElementById('welcome-div').style.display = 'None';
    localStorage.setItem('currentRecipes', JSON.stringify(currentResults));
    for (var i = 0; i < currentResults.length - 1; i++) {

        var node = document.createElement('a');
        var nodeLABELS = document.createElement('div');
        var nodeIMAGE = document.createElement('img');

        node.href = currentResults[i].recipe.url;
        node.innerHTML = currentResults[i].recipe.label;
        nodeLABELS.innerHTML = "<br> HEALTH: " + currentResults[i].recipe.healthLabels + "<br> DIET: " + currentResults[i].recipe.dietLabels +
            "<br> INGREDIENTS: " + currentResults[i].recipe.ingredientLines;

        node.setAttribute('id', i.toString());
        node.setAttribute('target', '_new');
        node.className = 'searchResultsLink';

        nodeLABELS.style.width = '50%';
        nodeIMAGE.className = 'searchResultsImgs';
        nodeIMAGE.setAttribute("src", currentResults[i].recipe.image);

        var saveFavBtn = document.createElement('button');
        saveFavBtn.onclick = (function (recipe) {
            return function () {
                addRecipeLabelBtn(recipe);
                swal(`Added ${recipe.label} to Favourites!`);
            }
        })(currentResults[i].recipe);

        saveFavBtn.className = 'saveFavBtn';
        saveFavBtn.innerHTML = 'Save to Favourites';


        document.getElementById('search-results').appendChild(node);
        document.getElementById('search-results').appendChild(document.createElement('br'));
        document.getElementById('search-results').appendChild(nodeIMAGE);
        document.getElementById('search-results').appendChild(nodeLABELS);
        document.getElementById('search-results').appendChild(saveFavBtn);
        document.getElementById('search-results').appendChild(document.createElement('br'));
        document.getElementById('search-results').appendChild(document.createElement('br'));
    }
}

/*-----------INTERACTIONS--------------*/

document.getElementById("ingredient-bar").addEventListener("keydown", function (ev) {
    if (ev.keyCode === 13) {
        submitForms();
    }
});

for (var i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}
;

var hiddenpush = document.getElementById("hiddenpusheen");

/**
 * Opens the search panel
 */

function showPusheen() {
    document.getElementById("ctrlpanel").style.left = '0px';
    hiddenpush.style.left = "18%";
    document.getElementById("big-page-div").style.width = "80%"
    pushleft = 0;
}

/**
 * Closes the search pangel
 */
function hidePusheen() {
    document.getElementById("ctrlpanel").style.left = '-20%';
    hiddenpush.style.left = "0%";
    document.getElementById("big-page-div").style.width = "100%";
    pushleft = 1
}

hiddenpush.addEventListener("click", function () {
    if (pushleft === 1) {
        showPusheen();
    } else if (pushleft === 0) {
        hidePusheen();
    }
});
