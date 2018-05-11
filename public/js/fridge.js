// contents inside fridge
var vegList = [], // object list
    vegListImport = []; // record of created objects for faster processing
/* ------------------- to be changed to blank when merged with hbs ----------------- */
// list of items saved from elsewhere; currently just a default list of items
vegListSaved = ["potato", "carrot", "tomato", "bellPepper", "garlic", "eggplant", "corn", "cucumber", "beef", "chicken"];
emptySlot = []; // un-occupied slots after delete is used

/* ---------- fridge input box ------------- */
var fridgeInput = document.getElementById("inputBox");


// fridge input box event listener
fridgeInput.onkeyup = function (ev) {
    if (ev.keyCode == 13) {
        // disallow blank entry
        if (checkBlank(this.value)) {
            return;
        }
        // add non-duplicate entries into existing array
        var temp = formatInput(this.value, vegListImport);
        vegListImport = vegListImport.concat(temp);
        populate(temp); // create objects associated with non-duplicate entries
    }
};

/* ----------- allow for loading previous saved configurations, currently just a default button --------- */
var saved = document.getElementById("default");
saved.onclick = function () {
    vegList = [];
    freezer.innerHTML = "";
    contents.innerHTML = "";
    emptySlot = [];
    vegListImport = vegListSaved.slice(0);
    populate(vegListImport);
};

// fridge divs
var bgImg = document.getElementById("fridgeBG"),
    contents = document.getElementById("contents"),
    freezer = document.getElementById("freezer"),
    topDoor = document.getElementById("topDoor"),
    botDoor = document.getElementById("botDoor"),
    topClose = document.getElementById("topClose"),
    botClose = document.getElementById("botClose"),
    tempBox = document.getElementById("tempBox");

/* ------------------------------ delete button -------------------------------- */
// delete controller
var delState = false,
    delButton = document.getElementById("fridgeDelete");


// delete button event listener
delButton.onclick = () => {
    delState = delToggle(delState,delButton);
};


/* ------------------------------ fridge content -------------------------------- */


/**
 * move created fridge contents to the correct position
 * @param {object} object - the DOM object to be moved
 */
function movePosition(object) {
    // find the index of this item in vegList
    var index = searchIndex(object,vegList);
    // determine the row and column number
    [row, column] = findPosition(vegList[index].slot);

    // row position
    switch (row) {
        case 0:
        case 1:
        case 2:
            object.style.top = String(230 + row * 90) + "px";
            break;
        case 3:
        case 4:
            object.style.top = String(row * 80 - 170) + "px";

    }

    // column position
    object.style.left = String(230 + column * 65) + "px";
}

/*------------------------------------------- fridge doors -------------------------------- */

/**
 * Deselect all items in the list in fridge
 * @param {list} list of DOM objects to be deselected
 */
function hideItems(list) {
    for (var i = 0; i < list.length; i += 1) {
        var index = searchIndex(list[i],vegList);
        vegList[index].active = 1;
        list[i].style.opacity = 0.2;
    }
}

// fridge door control switch    
var doorState = [1, 1]; // slot 0 top door, slot 1 bottom door, default open

/**
 * Display the fridge based on door open/close state
 */
function displayDoor() {
    bgImg.style.backgroundImage = "url(../imgs/fridge" + doorState[0] + doorState[1] + ".png)";

    // top door
    switch (doorState[0]) {
        case 0: // door closed
            freezer.style.display = "none";
            topDoor.style.display = "none";
            topClose.style.display = "block";
            hideItems(freezer.children);
            break;
        case 1: // door open
            freezer.style.display = "block";
            topDoor.style.display = "block";
            topClose.style.display = "none";
    }

    // bottom door
    switch (doorState[1]) {
        case 0: // door closed
            contents.style.display = "none";
            botDoor.style.display = "none";
            botClose.style.display = "block";
            hideItems(contents.children);
            break;
        case 1: // door open
            contents.style.display = "block";
            botDoor.style.display = "block";
            botClose.style.display = "none";
    }
    print_list();
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
topDoor.onclick = () => {
    changeDoor(0);
};

botDoor.onclick = () => {
    changeDoor(1);
};

topClose.onclick = () => {
    changeDoor(0);
};

botClose.onclick = () => {
    changeDoor(1);
};

/**
 * Auto generate objects for each fridge item and store in VegList
 * @param {list} list - list of names of fridge contents
 */
function populate(list) {
    var extra = vegList.length; // slot shift
    for (var i = 0; i < list.length; i += 1) {
        if (vegList.length >= 15) {  // fridge full
            vegListImport = vegListImport.slice(0, 15);
            return;
        }

        var item = document.createElement('div');
        item.className = "contents";
        item.dataset.tag = list[i];

        // check if image file exist
        if (checkImg(list[i], item)) {
            item.style.backgroundImage = "url(../imgs/" + list[i] + ".png)";
        }

        item.style.display = "block";

        // switch to freezer if fridge is full
        var slots = 0;
        if (emptySlot.length == 0) {
            slots = i + extra;
        } else {
            slots = emptySlot[0];
            emptySlot.shift();
        }

        if (slots < 9) {
            contents.appendChild(item);
        }
        else {
            freezer.appendChild(item);
        }

        vegList.push({id: list[i], active: 1, slot: slots});
        movePosition(item);
    }
}

// event listeners for all created objects
contents.onclick = (ev) => {
    selectVeg(ev.target);
};
contents.onmouseover = (ev) => {
    hoverVeg(ev.target);
};
contents.onmouseout = (ev) => {
    hoverVeg(ev.target, 1);
};

freezer.onclick = (ev) => {
    selectVeg(ev.target);
};
freezer.onmouseover = (ev) => {
    hoverVeg(ev.target);
};
freezer.onmouseout = (ev) => {
    hoverVeg(ev.target, 1);
};

/* -------- formatted output to be sent back to hbs --------- */
var ingBar = document.getElementById("ingredient-bar");

/**
 * format a string to be sent to search box
 * currently just display the string on the screen and return nothing
 */
function print_list() {
    temp = "";
    for (var i = 0; i < vegList.length; i += 1) {
        if (vegList[i].active == 2) {
            if (temp == "") { // no comma for first item
                temp += vegList[i].id;
            } else {
                temp += ", " + vegList[i].id;
            }
        }
    }

    // replace special cases involving spaces
    temp = temp.replace("bellPepper", "bell pepper");

    // formatted output to be sent to search box
    ingBar.value = temp;
}

/*--------------- delete feature insertion here ---------------------------*/

// slice vegList, vegListImport, delete DOM object
/**
 * @param {object} object - the JSON object to be deleted
 * @param {index} index of the JSON object in vegList as found in parent function
 */
function delObject(object, index) {
    temp = vegListImport.indexOf(vegList[index].id);
    vegListImport.splice(temp, 1);
    emptySlot.push(vegList[index].slot);
    if (vegList[index].slot < 9) {
        contents.removeChild(object);
    } else {
        freezer.removeChild(object);
    }
    vegList.splice(index, 1);
}

/**
 * click on an item in the fridge
 * @param {object} object - modify JSON object when the corresponding div is clicked
 */
function selectVeg(object) {
    // find the index of this item in vegList
    var index = searchIndex(object,vegList);

    if (delState == 0) { // delete is inactive, select items
        if (vegList[index].active == 1) {
            object.style.opacity = 1.0;
            vegList[index].active = 2;
        } else {
            object.style.opacity = 0.5;
            vegList[index].active = 1;
        }
    } else { // delete is active, remove item on click
        delObject(object, index);
    }
    print_list();
}

/**
 * click on an item in the fridge
 * @param {object} object - modify JSON object when the corresponding div is hovered on
 * @param {integer} exit - 0 (default) for mouseenter, 1 for mouseexit
 */
function hoverVeg(object, exit = 0) {
    // find the index of this item in vegList   
    var index = searchIndex(object,vegList);

    object.style.cursor = "pointer";
    if (vegList[index].active == 1) {
        if (exit == 0) {
            object.style.opacity = 0.5;
        } else {
            object.style.opacity = 0.2;
            object.style.cursor = "auto";
        }
    }
    print_list();
}

var fridgeDiv = document.getElementById("fridge")
/**
 * fridge display open
 */
function fridgeOpen() {
    fridgeDiv.style.display = "block";
}
/**
 * fridge display close
 */
function fridgeClose() {
    fridgeDiv.style.display = "none";
}
/**
 * fridge display close when clicking outside the window
 */
window.onclick = function (ev) {
    if (ev.target == fridgeDiv) {
        fridgeClose();
    }
}