/*--------------variables--------------*/
var coll = document.getElementsByClassName("collapsible");
var currentResults, currentUser, currentSearchHistory;
var pushleft = true;

/*-------------foodDisplay-------------*/
showSearchHistory();

/**
 * Displays the search history below search bar
 */
function showSearchHistory() {
    currentSearchHistory = JSON.parse(localStorage.getItem('searchHistory'));

    // Create a search history object if there isn't already one
    if (!currentSearchHistory) {
        currentSearchHistory = {};
        currentSearchHistory[currentUser] = [];

        localStorage.setItem('searchHistory', JSON.stringify(currentSearchHistory));
        currentSearchHistory = JSON.parse(localStorage.getItem('searchHistory'));
    }

    var foodList = document.getElementById('food-list');

    // Create a list for a user if they don't already have a search history
    if (!currentSearchHistory[currentUser]) {
        currentSearchHistory[currentUser] = [];
    }

    foodList.style.display = 'block';

    var ndiv2 = document.createElement('div');
    ndiv2.setAttribute('id', 'searchlist');

    // Create search history items
    for (i = 0; i < currentSearchHistory[currentUser].length; i++) {
        var ndiv = document.createElement("a");
        ndiv.innerHTML = currentSearchHistory[currentUser][i].value;
        var tags = Object.values(currentSearchHistory[currentUser][i]);
        for (j = 1; j < tags.length - 1; j++) {
            if (` ${tags[j]} `.trim() === "exclude") {
                break;
            }
            if (j === 1) { //Health tags
                var ntext1 = document.createElement("i");
                ntext1.style.color = "black";
                ntext1.innerHTML += ` ${tags[j]} `;
                ndiv.appendChild(ntext1);
            }
            if (j === 2) { //Diet tags
                var ntext2 = document.createElement("i");
                ntext2.style.color = "green";
                ntext2.innerHTML += ` ${tags[j]} `;
                ndiv.appendChild(ntext2);
            }
            if (j === 3) { //Exclude tags
                var ntext3 = document.createElement("u");
                ntext3.style.color = "red";
                ntext3.innerHTML += ` ${tags[j]} `;
                ndiv.append(ntext3);
            }
        }

        ndiv.className = "added-ingredients";
        ndiv.style.cursor = "pointer";
        ndiv.setAttribute('href', '/search?' + currentSearchHistory[currentUser][i].query);
        ndiv.setAttribute("id", "food-" + i);
        foodList.appendChild(ndiv2);
        ndiv2.appendChild(ndiv);
        ndiv2.appendChild(document.createElement('br'));
    }
}

/**
 * Display the search results
 */
function showResults() {
    document.getElementById('welcome-div').style.display = 'none';
    hidePusheen();

    for (var i = 0; i < currentResults.length - 1; i++) {

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
        var hiddenFavInp = document.createElement('input');
        hiddenFavInp.setAttribute('type', 'hidden');
        hiddenFavInp.setAttribute('name', 'favRecipe');

        var hiddenFavForm = document.createElement('form');
        hiddenFavForm.id = 'save-' + i.toString();
        hiddenFavForm.appendChild(hiddenFavInp);

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

        nDiv.className = "searchResultDiv col-md-4 col-lg-3 col-sm-6 col-xs-12";

        document.getElementById('search-row').appendChild(nDiv);
        document.getElementById("iconlinks").style.display = 'None';

        // Action for the save to favourites button
        saveFavBtn.onclick = (function (recipe) {
            return function () {
                addToFavoritesList(recipe);
            }
        })(currentResults[i].recipe);
    }
}

/*-----------INTERACTIONS--------------*/
/**
 * once user presses enter on the ingredients search bar, the forms are submitted
 */
document.getElementById("ingredient-bar").addEventListener("keydown", function (ev) {
    if (ev.keyCode === 13) {
        submitForms();
    }
});

/**
 * open collapsibles on click
 */
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

/**
 * Opens the search panel
 */
function showPusheen() {
    document.getElementById("outerpanel").style.left = '0px';
    pushleft = 0;
}

/**
 * Closes the search panel
 */
function hidePusheen() {
    document.getElementById("outerpanel").style.left = '-80%';
    pushleft = 1;
}

/**
 * click the cat, show or hide the control panel
 */
document.getElementById("hiddenpusheen").onclick = function () {
    pushleft = !pushleft;

    if (pushleft) {
        hidePusheen();
    } else if (!pushleft) {
        showPusheen();
    }
};


document.getElementById("searchicon").addEventListener("click", function () {
    showPusheen();
});


document.getElementById("fridgeicon").addEventListener("click", function () {
    document.getElementById("searchBar2").style.display = "block";

});


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
