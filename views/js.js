/*--------------variables--------------*/
var coll = document.getElementsByClassName("collapsible");

var savedSearchHistory = JSON.parse(localStorage.getItem('searchHistory')),
    currentSearchHistory = savedSearchHistory ? savedSearchHistory : {};

var currentResults;

var pushleft = 1;

/*-------------foodDisplay-------------*/
showSearchHistory();

/**
 * Gets all the search form values and populate into object to be POSTED to the server.
 * Also adds the search query to the search history
 */
function submitForms() {
    var healthFormElements = document.getElementById('ingredient-form').elements;
    var dietFormElements = document.getElementById('ingredient-form1').elements;
    var params = {
        q: document.getElementById('ingredient-bar').value,
        healthLabels: [],
        dietLabels: []
    };
    // Get healthLabels
    for (var i = 0; i < healthFormElements.length; i++) {
        if (healthFormElements[i].checked) {
            params.healthLabels.append(healthFormElements[i].value);
        }
    }
    // Get dietLabels
    for (var i = 0; i < dietFormElements.length; i++) {
        if (dietFormElements[i].checked) {
            params.dietLabels.append(dietFormElements[i].value);
        }
    }
    addIngredient(params);
    $('#ingredient-form2').val(JSON.stringify(jQuery.param(params)))
}

/**
 * Adds a query to search history
 * @param {object} queryParams - the query object containing all attributes and values from search form
 */
function addIngredient(queryParams) {
    let q = queryParams.q;
    let health = queryParams.healthLabels.join(',');
    let diet = queryParams.dietLabels.join(',');
    let queryStr = `q=${q}&healthLabels=${health}&dietLabels=${diet}`;


    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Add to search history
    // Do not add duplicate search history
    if (currentSearchHistory[currentUser]) {
        let duplicateSearch = false;
        for (i = 0; i < currentSearchHistory[currentUser].length; i++) {
            if (currentSearchHistory[currentUser][i].value === `${q} ${health}${diet}`) {
                duplicateSearch = true;
                break;
            }
        }
        if (!duplicateSearch) {
            currentSearchHistory[currentUser].push({
                value: `${q} ${health}${diet}`,
                query: queryStr
            })
        }
    } else {
        currentSearchHistory[currentUser] = [{
            value: `${q} ${health}${diet}`,
            query: queryStr
        }]
    }


    localStorage.setItem('searchHistory', JSON.stringify(currentSearchHistory));
}

/**
 * Displays the search history below search bar
 */
function showSearchHistory() {
    var foodList = document.getElementById('food-list');
    foodList.style.display = 'block';

    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    for (i = 0; i < currentSearchHistory[currentUser].length; i++) {
        var ndiv = document.createElement("a");
        ndiv.innerHTML = currentSearchHistory[currentUser][i].value;
        ndiv.className = "added-ingredients";
        ndiv.style.cursor = "pointer";
        ndiv.setAttribute('href', '/search?' + currentSearchHistory[currentUser][i].query);
        ndiv.setAttribute("id", "food-" + i);

        foodList.appendChild(ndiv);
        foodList.appendChild(document.createElement("br"));
    }
}

/**
 * Clears the search history
 */
function clearSearchHist() {
    currentSearchHistory = [];
    localStorage.removeItem('searchHistory');
    document.getElementById('food-list').style.display = 'none';
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
        node.href = currentResults[i].recipe.url;
        node.innerHTML = currentResults[i].recipe.label;
        node.style.display = 'inline-block';
        node.setAttribute('id', i.toString());
        node.setAttribute('target', '_new')

        var nodeInput = document.createElement('input');
        nodeInput.setAttribute('type', 'hidden');
        nodeInput.setAttribute('name', 'recipe')
        var loadRecipes = JSON.parse(localStorage.getItem('currentRecipes'));
        nodeInput.value = JSON.stringify(loadRecipes[node.id].recipe, undefined, 2);

        var addBtn = document.createElement('button');
        addBtn.innerHTML = 'Save';
        addBtn.style.width = '50px';
        addBtn.style.fontSize = '12px';
        addBtn.style.display = 'inline-block';
        addBtn.style.position = 'relative';

        var addBtnForm = document.createElement('form');
        addBtnForm.setAttribute('method', 'POST');
        addBtnForm.setAttribute('action', '/download')
        addBtnForm.appendChild(nodeInput);
        addBtnForm.appendChild(addBtn);

        addBtn.onclick = function (ev) {
            addBtnForm.submit();
            alert('You have saved the recipe!')
        };


        document.getElementById('search-results').appendChild(node);
        document.getElementById('search-results').appendChild(addBtnForm);
        document.getElementById('search-results').appendChild(document.createElement('br'));
    }
}

/*-----------INTERACTIONS--------------*/

document.getElementById("search-ingredients-div").style.display = "block";
document.getElementById("cat-ingredients-div").style.display = "block";

document.getElementById("ingredient-bar").addEventListener("keydown", function (ev) {
    if (ev.keyCode == 13) {
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
var hiddenpush = document.getElementById("hiddenpusheen")

hiddenpush.addEventListener("click", function () {
    if (pushleft == 1) {

        document.getElementById("ctrlpanel").style.left = "-20%"
        hiddenpush.style.left = "-3%"
        pushleft = pushleft + 1

        document.getElementById("big-page-div").style.width = "100%"
    }

    else if (pushleft == 2) {
        document.getElementById("ctrlpanel").style.left = "0px"
        hiddenpush.style.left = "17.5%"
        pushleft = pushleft - 1

        document.getElementById("big-page-div").style.width = "80%"
    }
});