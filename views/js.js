/*--------------variables--------------*/
var coll = document.getElementsByClassName("collapsible");

var savedSearchHistory = JSON.parse(localStorage.getItem('searchHistory'));
var currentSearchHistory = savedSearchHistory ? savedSearchHistory : [];

var currentResults;

/*-------------foodDisplay-------------*/
function addIngredient(queryParams) {
    let q = queryParams.q;
    let health = queryParams.healthLabels.join(',');
    let diet = queryParams.dietLabels.join(',');
    let queryStr = `q=${q}&healthLabels=${health}&dietLabels=${diet}`;

    // Add to search history
    // Do not add duplicate search history
    let duplicateSearch = false;
    for (i = 0; i < currentSearchHistory.length; i++) {
        if (currentSearchHistory[i].value === `${q} ${health}${diet}`) {
            duplicateSearch = true;
            break;
        }
    }
    if (!duplicateSearch) {
        currentSearchHistory.push({
            value: `${q} ${health}${diet}`,
            query: queryStr
        })
    }

    localStorage.setItem('searchHistory', JSON.stringify(currentSearchHistory));
}

function showSearchHistory() {
    document.getElementById('food-list').style.display = 'block';
    for (i = 0; i < currentSearchHistory.length; i++) {
        var ndiv = document.createElement("a");
        ndiv.innerHTML = currentSearchHistory[i].value;
        ndiv.className = "added-ingredients";
        ndiv.style.cursor = "pointer";
        ndiv.setAttribute('href', '/search?' + currentSearchHistory[i].query);
        ndiv.setAttribute("id", "food-" + i);

        document.getElementById("food-list").appendChild(ndiv);
        document.getElementById("food-list").appendChild(document.createElement("br"));
    }
}

function clearSearchHist() {
    currentSearchHistory = [];
    localStorage.removeItem('searchHistory');
    document.getElementById('food-list').style.display = 'none';
}

function setCurrentResults(res) {
    currentResults = res;
    if (currentResults && currentResults.length > 0) {
        showResults();
    }

}

function showResults() {
    document.getElementById('welcome-div').style.display = 'None';
    var msg = document.createElement('h2');
    msg.innerHTML = 'Click the button below the URL to save your recipe!\n';
    document.getElementById('search-results').appendChild(msg);
    localStorage.setItem('currentRecipes', JSON.stringify(currentResults));
    for (var i = 0; i < currentResults.length; i++) {

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
            alert('You have saved the receipe!')
        };


        document.getElementById('search-results').appendChild(node);
        document.getElementById('search-results').appendChild(addBtnForm);
        document.getElementById('search-results').appendChild(document.createElement('br'));
    }
}

/*-----------INTERACTIONS--------------*/

document.getElementById("search-ingredients-div").style.display = "block";
document.getElementById("cat-ingredients-div").style.display = "block";

// document.getElementById("cat-butt").addEventListener("click",function(){
// 	document.getElementById("search-ingredients-div").style.display = "none";
// 	document.getElementById("cat-ingredients-div").style.display = "block";
// });

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
