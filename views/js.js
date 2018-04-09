/*--------------variables--------------*/
var coll = document.getElementsByClassName("collapsible");

var savedSearchHistory = JSON.parse(localStorage.getItem('searchHistory'));
var currentSearchHistory = savedSearchHistory ? savedSearchHistory : [];

var currentResults;

/*-------------foodDisplay-------------*/
function addIngredient() {
	if (currentSearchHistory.indexOf(document.getElementById("ingredient-bar").value) < 0 ){
		currentSearchHistory.push(document.getElementById("ingredient-bar").value)
	}
	localStorage.setItem('searchHistory', JSON.stringify(currentSearchHistory));
}

function showSearchHistory() {
	document.getElementById('searchHist').style.display = 'inline-block';
	for(i=0; i < currentSearchHistory.length; i++) {
		var ndiv = document.createElement("div");
		ndiv.innerHTML = currentSearchHistory[i];

		document.getElementById("food-list").appendChild(ndiv);

		document.getElementById("food-list").appendChild(ndiv).className = "added-ingredients";
		document.getElementById("food-list").appendChild(ndiv).style.cursor = "pointer";

		document.getElementById("food-list").appendChild(ndiv).setAttribute("id","food-"+i)
	}
}

function clearSearchHistory() {
	localStorage.removeItem('searchHistory');
	var ingredients = document.getElementsByClassName('added-ingredients');
	for (i = 0; i < ingredients.length; i++) {
		ingredients[i].parentNode.removeChild(ingredients[i]);
	}
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
	msg.innerHTML = 'Click the button below the URL to save your recipe!\n'
	document.getElementById('search-results').appendChild(msg);

	localStorage.setItem('currentRecipes', JSON.stringify(currentResults))
	for (var i = currentResults.length - 1; i >= 0; i--) {

		var node = document.createElement('a');
		node.href =  currentResults[i].recipe.url;
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
			addBtnForm.submit()
			alert('You have saved the receipe!')
		}


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

document.getElementById("ingredient-bar").addEventListener("keydown",function(ev){
	if(ev.keyCode == 13) {
		addIngredient();
		submitForms();
	}
});

for (var i = 0; i < coll.length; i++) {
	coll[i].addEventListener("click", function() {
		this.classList.toggle("active");
    	var content = this.nextElementSibling;
	    if (content.style.maxHeight){
	    	content.style.maxHeight = null;
	    } else {
	    	content.style.maxHeight = content.scrollHeight + "px";
	    } 
	});
};
