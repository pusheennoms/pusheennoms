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
	document.getElementById("ingredient-bar").value = "";	
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
