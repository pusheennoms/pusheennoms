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
    node.href = recipe.url;
    node.innerHTML = "Link to recipe";
    nodeLABELS.innerHTML = "HEALTH: " + recipe.healthLabels + "<br> DIET: " + recipe.dietLabels;

    node.style.display = 'inline-block';
    node.setAttribute('id', i.toString());
    node.setAttribute('target', '_new');
    node.style.width = '100%';

    nodeLABELS.style.width = '50%';

    recipeDiv.appendChild(node);
    recipeDiv.appendChild(nodeLABELS);
    document.getElementById("favModalRecipe").appendChild(recipeDiv);
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