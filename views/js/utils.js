var savedSearchHistory = JSON.parse(localStorage.getItem('searchHistory')),
    currentSearchHistory = savedSearchHistory ? savedSearchHistory : {};

var currentResults;

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
 * Clears the search history
 */
function clearSearchHist() {
    currentSearchHistory = [];
    localStorage.removeItem('searchHistory');
    document.getElementById('food-list').style.display = 'none';
}