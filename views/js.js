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
	document.getElementById('searchHist').style.display = 'block';
	for(i=0; i < currentSearchHistory.length; i++) {
		var ndiv = document.createElement("div");
		ndiv.innerHTML = currentSearchHistory[i];

		document.getElementById("food-list").appendChild(ndiv);

		document.getElementById("food-list").appendChild(ndiv).className = "added-ingredients";
		document.getElementById("food-list").appendChild(ndiv).style.cursor = "pointer";

		document.getElementById("food-list").appendChild(ndiv).setAttribute("id","food-"+i)
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
	var msg = document.createElement('h1');				
	msg.innerHTML = 'Click + to save your recipe!'
	document.getElementById('search-results').appendChild(msg);

	for (var i = currentResults.length - 1; i >= 0; i--) {

		var node = document.createElement('a');
		node.href =  currentResults[i].recipe.url;
		node.innerHTML = currentResults[i].recipe.label;
		node.setAttribute('target', '_new')

		var addBtn = document.createElement('a');
		addBtn.innerHTML = ' [+] ';
		addBtn.href = node.href;
		addBtn.setAttribute('download', encodeURIComponent(node.innerHTML) + '.html')		

		document.getElementById('search-results').appendChild(node);
		document.getElementById('search-results').appendChild(addBtn);
		document.getElementById('search-results').appendChild(document.createElement('br'));
	}
}

/*-----------INTERACTIONS--------------*/
document.getElementById("type-butt").addEventListener("click",function(){
	document.getElementById("search-ingredients-div").style.display = "block";
	document.getElementById("cat-ingredients-div").style.display = "none";
});

document.getElementById("cat-butt").addEventListener("click",function(){
	document.getElementById("search-ingredients-div").style.display = "none";
	document.getElementById("cat-ingredients-div").style.display = "block";
});

document.getElementById("ingredient-bar").addEventListener("keydown",function(ev){
	if(ev.keyCode == 13) {
		addIngredient();
		showSearchHistory();
		document.getElementById('ingredient-form').submit();
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
