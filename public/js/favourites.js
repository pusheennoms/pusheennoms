var favRecipes;

/**
 * Sets and shows favourite recipes for the current signed in user
 * @param {list} fr - Favourite recipes of the user passed from server
 */
function setFavouriteRecipes(fr) {
    let decodedRecipe = fr.replace(/&quot;/g, '\"');
    favRecipes = JSON.parse(localStorage.getItem('favRecipes') ? localStorage.getItem('favRecipes') : '[]');
    if (!favRecipes || favRecipes.length <= 0) {
        localStorage.setItem('favRecipes', decodedRecipe);
        favRecipes = JSON.parse(localStorage.getItem('favRecipes'));
    }
    showSavedFavRecipes();
}

/**
 * Shows saved favourite recipes to the favourites modal
 */
function showSavedFavRecipes() {
    for (var i = 0; i < favRecipes.length; i++) {
        addRecipeLabelBtn(favRecipes[i]);
    }
}

/**
 * Opens the favourite recipe in the favourites modal when its label is clicked.
 * Hides the rest of the recipes while the one recipe is opened
 * @param {Event} ev - the mouse click event
 * @param {object} recipe - the recipe being opened
 */
function openRecipe(ev, recipe) {
    var content = document.getElementsByClassName("favRecipeContent");
    for (i = 0; i < content.length; i++) {
        content[i].style.display = "none";
    }
    var links = document.getElementsByClassName("recipeLabelLinks");
    for (i = 0; i < links.length; i++) {
        links[i].className = links[i].className.replace(" active", "");
    }

    showRecipe(ev, recipe);
}

/**
 * Shows the opened recipe
 * @param {Event} ev - mouse clicking evetn
 * @param {Object} recipe - the recipe being shown
 */
function showRecipe(ev, recipe) {
    var recipeDiv = document.createElement('div');
    recipeDiv.className = "favRecipeContent";
    ev.currentTarget.className += " active";

    var node = document.createElement('a');
    var nodeLABELS = document.createElement('div');
    var nodeIMAGE = document.createElement('img');
    var nodeIngredients = document.createElement('p');
    nodeIngredients.className = 'favIngredients col-md-12';

    nodeIMAGE.className = 'favImages col-md-6';
    nodeIMAGE.setAttribute("src", recipe.image);

    node.href = recipe.url;
    node.innerHTML = "Link to recipe";
    nodeLABELS.className = 'col-md-6';
    nodeLABELS.innerHTML = `<b>HEALTH: </b> ${recipe.healthLabels } <br> <b>DIET: </b> ${recipe.dietLabels}<br>`;
    nodeIngredients.innerHTML = `<b> INGREDIENTS: </b> ${recipe.ingredientLines}`;

    node.style.display = 'inline-block';
    node.setAttribute('id', i.toString());
    node.setAttribute('target', '_new');
    node.style.width = '100%';

    recipeDiv.appendChild(nodeIMAGE);
    recipeDiv.appendChild(nodeLABELS);
    nodeLABELS.appendChild(node);
    recipeDiv.appendChild(nodeIngredients);
    document.getElementById("favModalRecipe").appendChild(recipeDiv);
}

/**
 * Adds a recipe to the list of favourites
 * @param {object} recipe - the recipe being added
 */
function addToFavoritesList(recipe) {
    favRecipes.push(recipe);
    localStorage.setItem('favRecipes', JSON.stringify(favRecipes));
    addRecipeLabelBtn(recipe);
}

/**
 * Adds the recipe button label to the favourites modal
 * @param {object} recipe - the recipe being added
 */
function addRecipeLabelBtn(recipe) {
    var recipeTab = document.getElementById('favRecipeLabel');

    var recipeLabelBtn = document.createElement('button');
    recipeLabelBtn.className = "recipeLabelLinks";
    recipeLabelBtn.innerHTML = recipe.label;
    recipeLabelBtn.onclick = function (ev) {
        openRecipe(ev, recipe)
    };

    recipeTab.appendChild(recipeLabelBtn);
}

/**
 * Checks whether the recipe has been added to the front end
 * @param {object} recipe - the recipe that is being checked
 * @returns {boolean} - whether the recipe has already been added
 */
function noRepeat(recipe) {
    var repeat = false;
    for (var i = 0; i < favRecipes.length; i++) {
        if (favRecipes[i].uri === recipe.uri) {
            repeat = true;
        }
    }
    return !repeat
}