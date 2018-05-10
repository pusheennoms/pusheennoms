/**
 * check if the input string is blank or white space only
 * @param {str} string - the input string
 * returns true if blank
 * returns false if it has content
 */
function checkBlank(str) {
    if (str.trim() == "") {
        return true;
    } else {
        return false;
    }
}

/**
 * change a non-blank input into an arrary format
 * @param {text} string - the input string
 * @param {list} array - the array that contains existing inputs
 * returns the formatted string with duplicate entries removed as an array
 */
function formatInput(text, list) {
    var temp = text.split(',');
    temp = temp.map(str => str.trim()); // remove all leading and trailing spaces
    temp = temp.filter(x => !list.includes(x)); // remove duplicate entries    
    return temp;
}

/**
 * toggle background color of a dom object based on a boolean variable
 * @param {state} boolean - the boolean variable in question
 * @param {object} object - the dom object to be manipulated
 * returns the flipped boolean state
 */
function delToggle(state, object) {
    if (!state) {
        object.style.backgroundColor = "red";
        return true;
    } else {
        object.style.backgroundColor = "";
        return false;
    }
}

/**
 * find the index of the object in an object array that matches a custom variable in a dom object
 * @param {object} object - the target dom object
 * @param {objList} array - the object data array to search through
 * returns the index of the dom object data in the object array
 */
function searchIndex(object, objList) {
    return objList.findIndex(x => x.id == object.dataset.tag);
}

/**
 * determine the row and column slots of an object based on the slot number assigned
 * @param {slot} integer - the slot number of the object
 * returns the row and column number of this slot
 */
function findPosition(slot) {
    var row = Math.floor(slot / 3);
    var column = slot % 3;
    return [row, column];
}

/**
 * Check if an image file exists
 * @param {source} string - name of the image file
 * @param {item} object - the dom object to attach image to
 */
function checkImg(source, item) {
    var img = new Image();
    img.src = "../imgs/" + source + ".png";
    img.onerror = () => {item.style.backgroundImage = "url(../imgs/box.png)";};
    return true;
}

module.exports = {
    checkBlank,
    formatInput,
    delToggle,
    searchIndex,
    findPosition,
    checkImg
}