/*--------------variables--------------*/
var coll = document.getElementsByClassName("collapsible");

/*-------------foodDisplay-------------*/
function addIngredient() {
	var ndiv = document.createElement("div");
	ndiv.innerHTML = foodInput;

	document.getElementById("food-list").appendChild(ndiv);

	document.getElementById("food-list").appendChild(ndiv).className = "added-ingredients";
	document.getElementById("food-list").appendChild(ndiv).style.cursor = "pointer";

	for(i=0; i < 26; i++) {
		document.getElementById("food-list").appendChild(ndiv).setAttribute("id","food-"+i)
	}
}

function getIngredient() {
	foodInput = document.getElementById("ingredient-bar").value;
}

function showResults(toshow) {
	document.getElementById('welcome-div').style.display = 'None';
	var msg = document.createElement('h1');				
	msg.innerHTML = 'Click + to save your recipe!'
	document.getElementById('search-results').appendChild(msg);

	for (var i = toshow.length - 1; i >= 0; i--) {

		var node = document.createElement('a');
		node.href =  toshow[i].recipe.url;
		node.innerHTML = toshow[i].recipe.label + '[+]';
		document.getElementById('search-results').appendChild(node);
		document.getElementById('search-results').appendChild(document.createElement('br'));
	}
	document.getElementById('ingredient-form').reset();
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
		getIngredient();
		addIngredient();
		console.log(document.getElementById("ingredient-bar").value + 'hahahahah')
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
