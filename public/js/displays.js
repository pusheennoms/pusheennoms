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

    if (!currentSearchHistory) {
        currentSearchHistory = {};
        currentSearchHistory[currentUser] = [];

        localStorage.setItem('searchHistory', JSON.stringify(currentSearchHistory));
        currentSearchHistory = JSON.parse(localStorage.getItem('searchHistory'));
    }

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
            if (` ${tags[j]} `.trim() === "exclude") {
                break;
            }
            if (j===1) { //Health tags
                var ntext1 = document.createElement("i");
                ntext1.style.color = "black";
                ntext1.innerHTML += ` ${tags[j]} `;
                ndiv.appendChild(ntext1);
            }
            if (j===2) { //Diet tags
                var ntext2 = document.createElement("i");
                ntext2.style.color = "green";
                ntext2.innerHTML += ` ${tags[j]} `;
                ndiv.appendChild(ntext2);
            }
            if (j===3) { //Exclude tags
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
    hidePusheen();
    document.getElementById('welcome-div').style.display = 'None';
    for (var i = 0; i < currentResults.length - 1; i++) {

        var node = document.createElement('a');
        var nodeLABELS = document.createElement('div');
        var nodeIMAGE = document.createElement('img');
        var nDiv = document.createElement('div');

        node.href = currentResults[i].recipe.url;
        node.innerHTML = currentResults[i].recipe.label;
        nodeLABELS.innerHTML = "HEALTH: " + currentResults[i].recipe.healthLabels + "<br> DIET: " + currentResults[i].recipe.dietLabels +
            "<br> INGREDIENTS: " + currentResults[i].recipe.ingredientLines;

        node.setAttribute('id', i.toString());
        node.setAttribute('target', '_new');
        node.className = 'searchResultsLink';

        nodeLABELS.style.height = "30vh";
        nodeLABELS.style.overflowY = "auto";
        nodeIMAGE.className = 'searchResultsImgs';
        nodeIMAGE.setAttribute("src", currentResults[i].recipe.image);

        var hiddenFavInp = document.createElement('input');
        hiddenFavInp.setAttribute('type', 'hidden');
        hiddenFavInp.setAttribute('name', 'favRecipe');

        var hiddenFavForm = document.createElement('form');
        hiddenFavForm.setAttribute('method', 'POST');
        hiddenFavForm.setAttribute('action', '/favourite');
        hiddenFavForm.appendChild(hiddenFavInp);

        var saveFavBtn = document.createElement('button');
        saveFavBtn.onclick = (function (recipe) {
            return function () {
                if (noRepeat(recipe)) {
                    addToFavoritesList(recipe);
                    hiddenFavInp.value = JSON.stringify({
                        uri: recipe.uri,
                        label: recipe.label,
                        dietLabels: recipe.dietLabels,
                        healthLabels: recipe.healthLabels,
                        image: recipe.image,
                        ingredientLines: recipe.ingredientLines,
                        currentUser: currentUser
                    });
                    swal('Success', `Added ${recipe.label} to Favourites!`, 'success').then(() => {
                        hiddenFavForm.submit()
                    });
                } else {
                    swal('Error', `${recipe.label} is already in Favourites!`, 'error');
                }
            }
        })(currentResults[i].recipe);
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

        nDiv.className = "col-md-4 col-lg-3 col-sm-6 col-xs-12";
        nDiv.style.display = "inline-block";
        nDiv.style.float = "none";
        nDiv.style.verticalAlign = "top";

        document.getElementById('search-row').appendChild(nDiv);
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
    hiddenpush.style.left = "77.5%";
    pushleft = 0;
}

/**
 * Closes the search pangel
 */
function hidePusheen() {
    document.getElementById("ctrlpanel").style.left = '-80%';
    hiddenpush.style.left = "0%";
    pushleft = 1
}

hiddenpush.onclick = function () {
    pushleft = !pushleft;

    if (pushleft) {
        hidePusheen();
    } else if (!pushleft) {
        showPusheen();
    }
};