// contents inside fridge
var vegList = [],
    vegListImport = ["potato","carrot","tomato","bellPepper","garlic","eggplant","corn","cucumber","beef","chicken"];

// fridge divs
var bgimg = document.getElementById("fridgeBG"),
    contents = document.getElementById("contents"),
    freezer = document.getElementById("freezer"),
    topDoor = document.getElementById("topDoor"),
    botDoor = document.getElementById("botDoor"),
    topClose = document.getElementById("topClose"),
    botClose = document.getElementById("botClose"),
    tempBox = document.getElementById("tempBox");

// fridge door control switch    
var doorState = [1,1]; // slot 0 top door, slot 1 bottom door, default open

/**
 * Display the fridge based on door open/close state
 */
function displayDoor() {
    bgimg.style.backgroundImage = "url(imgs/fridge" + doorState[0] + doorState[1] +".png)";
    
    // top door
    switch(doorState[0]) {
        case 0: // door closed
            freezer.style.display = "none";
            topDoor.style.display = "none";
            topClose.style.display = "block";
            break;
        case 1: // door open
            freezer.style.display = "block";    
            topDoor.style.display = "block";
            topClose.style.display = "none";
    }
    
    // bottom door
    switch(doorState[1]) {
        case 0: // door closed
            contents.style.display = "none";
            botDoor.style.display = "none";
            botClose.style.display = "block";
            break;
        case 1: // door open
            contents.style.display = "block";
            botDoor.style.display = "block";
            botClose.style.display = "none";
        }
}

/**
 * Change fridge door state from event listener
 * @param {integer} door - 0 refer to top door, 1 refer to bottom door
 */
function changeDoor(door) {
    if (doorState[door] == 0) {
        doorState[door] = 1;
    } else {
        doorState[door] = 0;        
    }
    displayDoor();
}

// fridge door event listeners
topDoor.addEventListener("click", function() {
    changeDoor(0);
});

botDoor.addEventListener("click", function() {
    changeDoor(1);
});

topClose.addEventListener("click", function() {
    changeDoor(0);
});

botClose.addEventListener("click", function() {
    changeDoor(1);
});

/** 
* Auto generate objects for each fridge item and store in VegList
* @param {list} list - list of names of fridge contents
*/
function populate(list) {
    for (var i = 0; i < list.length; i+= 1) {
        var item = document.getElementById(list[i]);
                
        item.onclick = function() {selectVeg(this);};
        item.onmouseenter = function() {hoverVeg(this);};
        item.onmouseleave = function() {hoverVeg(this,1);};
        item.style.display = "block";
        
        vegList.push({id:list[i], active:0, slot:i, div:item});
    }
}

/* -------- to be called when entering fridge screen ---------- */
populate(vegListImport);

/* -------- formatted output to be sent to search box --------- */
/**
* format a string to be sent to search box
* currently just display the string on the screen and return nothing
*/
function print_list() {
    temp = "";
    for (var i = 0; i < vegList.length; i+=1) {
        if (vegList[i].active == 1) {
            if (temp == "") { // no comma for first item
                temp += vegList[i].id;
            } else {
                temp += ", " + vegList[i].id;
            }
        }
    }
    
    // replace special cases involving spaces
    temp = temp.replace("bellPepper","bell pepper");   

    // formatted output to be sent to search box
    tempBox.innerText = temp;
}

/**
* click on an item in the fridge
* @param {object} object - modify JSON object when the corresponding div is clicked
*/
function selectVeg(object) {
    slot = (vegList.filter(function(obj) {return obj.id == object.id;}))[0].slot;
    
    if (vegList[slot].active == 0){
        object.style.opacity = 1.0;
        vegList[slot].active = 1;
    } else {
        object.style.opacity = 0.5;
        vegList[slot].active = 0;
    }
    print_list()
}

/**
* click on an item in the fridge
* @param {object} object - modify JSON object when the corresponding div is hovered on
* @param {integer} exit - 0 (default) for mouseenter, 1 for mouseexit
*/
function hoverVeg(object,exit=0) {
    slot = (vegList.filter(function(obj) {return obj.id == object.id;}))[0].slot;

    object.style.cursor = "pointer"; 
    if (vegList[slot].active == 0){
        if (exit == 0) {
            object.style.opacity = 0.5;
        } else {
            object.style.opacity = 0.2;
            object.style.cursor = "auto";
        }
    }
    print_list()
}