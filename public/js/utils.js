var savedSearchHistory = JSON.parse(localStorage.getItem('searchHistory')),
    currentSearchHistory = savedSearchHistory ? savedSearchHistory : {};

var currentResults;

if (currentResults && currentResults.length > 1) {
    showResults();
}

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
        dietLabels: [],
        excluded: document.getElementById('allergies-bar').value
    };
    // Get healthLabels
    for (var i = 0; i < healthFormElements.length; i++) {
        if (healthFormElements[i].checked) {
            params.healthLabels.push(healthFormElements[i].value);
        }
    }
    // Get dietLabels
    for (var i = 0; i < dietFormElements.length; i++) {
        if (dietFormElements[i].checked) {
            params.dietLabels.push(dietFormElements[i].value);
        }
    }

    // Add search parameters to search history
    addIngredient(params);

    // Submit final search form
    document.getElementById('final-search-query').value = jQuery.param(params);
    document.getElementById('final-form').submit();
}

/**
 * Adds a query to search history
 * @param {object} queryParams - the query object containing all attributes and values from search form
 */
function addIngredient(queryParams) {
    let queryStr = jQuery.param(queryParams);
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Add to search history
    // Do not add duplicate search history
    if (currentSearchHistory[currentUser]) {
        let duplicateSearch = false;
        for (i = 0; i < currentSearchHistory[currentUser].length; i++) {
            if (currentSearchHistory[currentUser][i].query === `${queryStr}`) {
                duplicateSearch = true;
                break;
            }
        }
        if (!duplicateSearch) {
            currentSearchHistory[currentUser].push({
                value: `${queryParams.q}`,
                healthLabels: `${queryParams.healthLabels}`,
                dietLabels: `${queryParams.dietLabels}`,
                excluded: `exclude ${queryParams.excluded}`,
                query: queryStr
            })
        }
    } else {
        currentSearchHistory[currentUser] = [{
            value: `${queryParams.q}`,
            healthLabels: `${queryParams.healthLabels}`,
            dietLabels: `${queryParams.dietLabels}`,
            excluded: `exclude ${queryParams.excluded}`,
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
    /*document.getElementById('food-list').style.display = 'none';*/
    var list = document.getElementById('searchlist');
    while(list.hasChildNodes()){
        list.removeChild(list.firstChild);
    }    
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '/'
}