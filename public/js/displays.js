/*--------------variables--------------*/
var coll = document.getElementsByClassName("collapsible");

var currentResults;
var currentUser = JSON.parse(localStorage.getItem('currentUser'));

var pushleft = 1;

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
    ndiv2.setAttribute('id','searchlist');


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
    document.getElementById('welcome-div').style.display = 'None';
    var msg = document.createElement('h2');
    msg.innerHTML = 'Click the button below the URL to save your recipe!\n';
    document.getElementById('search-results').appendChild(msg);
    localStorage.setItem('currentRecipes', JSON.stringify(currentResults));
    for (var i = 0; i < currentResults.length - 1; i++) {

        var node = document.createElement('a');
        var nodeLABELS = document.createElement('div');
        var nodeIMAGE = document.createElement('img');
        node.href = currentResults[i].recipe.url;
        node.innerHTML = currentResults[i].recipe.label;
        nodeLABELS.innerHTML = "<br> HEALTH: " + currentResults[i].recipe.healthLabels + "<br> DIET: " + currentResults[i].recipe.dietLabels +
            "<br> INGREDIENTS: " + currentResults[i].recipe.ingredientLines;

        node.style.display = 'inline-block';
        node.setAttribute('id', i.toString());
        node.setAttribute('target', '_new');
        node.style.width = '30%';

        var nodeInput = document.createElement('input');
        nodeInput.setAttribute('type', 'hidden');
        nodeInput.setAttribute('name', 'recipe');
        var loadRecipes = JSON.parse(localStorage.getItem('currentRecipes'));
        nodeInput.value = JSON.stringify(loadRecipes[node.id].recipe, undefined, 2);

        var addBtn = document.createElement('button');
        addBtn.innerHTML = 'Save';
        addBtn.className = 'savebutt'


        nodeLABELS.style.width = '50%';
        nodeIMAGE.style.width = 'auto';
        nodeIMAGE.style.height = '40%';
        nodeIMAGE.style.position = 'relative';
        nodeIMAGE.style.left = '0';
        nodeIMAGE.setAttribute("src", currentResults[i].recipe.image );

        var addBtnForm = document.createElement('form');
        addBtnForm.setAttribute('method', 'POST');
        addBtnForm.setAttribute('action', '/download');
        addBtnForm.appendChild(nodeInput);
        addBtnForm.appendChild(addBtn);

        addBtn.onclick = function (ev) {
            addBtnForm.submit();
            alert('You have saved the recipe!')
        };


        document.getElementById('search-results').appendChild(node);
        document.getElementById('search-results').appendChild(document.createElement('br'));
        document.getElementById('search-results').appendChild(nodeIMAGE);
        document.getElementById('search-results').appendChild(nodeLABELS);
        document.getElementById('search-results').appendChild(addBtnForm);
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

/**
 * FUNCTION DEFINITION
*/
var hiddenpush = document.getElementById("hiddenpusheen");

hiddenpush.addEventListener("click", function () {
    if (pushleft == 1) {

        document.getElementById("ctrlpanel").style.left = "-20%";
        hiddenpush.style.left = "-3%";
        pushleft = pushleft + 1;

        document.getElementById("big-page-div").style.width = "100%"
;
    }

    else if (pushleft == 2) {
        document.getElementById("ctrlpanel").style.left = "0px";
        hiddenpush.style.left = "17.5%";
        pushleft = pushleft - 1;

        document.getElementById("big-page-div").style.width = "80%"
;
    }
});
