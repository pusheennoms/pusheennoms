function checkBlank(str) {
    if (str.trim() == "") {
        return true;
    } else {
        return false;
    }
}

function formatInput(text, list) {
    var temp = text.split(',');
    temp = temp.map(str => str.trim());
    temp = temp.filter(x => !list.includes(x));
    return temp;
}

function delToggle(state, object) {
    if (!state) {
        object.style.backgroundColor = "red";
        return true;
    } else {
        object.style.backgroundColor = "";
        return false;
    }
}

function searchIndex(object, objList) {
    return objList.findIndex(x => x.id == object.dataset.tag);
}

function findPosition(slot) {
    var row = Math.floor(slot / 3);
    var column = slot % 3;
    return [row, column];
}

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