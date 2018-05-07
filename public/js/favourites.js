var favRecipes;

function setFavouriteRecipes(fr) {
    let decodedRecipe = fr.replace(/&quot;/g, '\"');
    favRecipes = JSON.parse(localStorage.getItem('favRecipes'));
    if (!favRecipes) {
        localStorage.setItem('favRecipes', decodedRecipe);
        favRecipes = JSON.parse(localStorage.getItem('favRecipes'));
    }
    showFavRecipes();
}

function showFavRecipes() {
    for (var i = 0; i < favRecipes.length; i++) {
        addRecipeLabelBtn(favRecipes[i]);
    }
}

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

function addToFavoritesList(recipe) {
    favRecipes.push(recipe);
    localStorage.setItem('favRecipes', JSON.stringify(favRecipes));
}

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