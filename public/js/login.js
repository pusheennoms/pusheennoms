var active = [0,1], //[0] for register, [1] for login
    regForm = document.getElementById('registerform'),
    logForm = document.getElementById('loginform'),
    credForm = document.getElementById('credentialsForm'),
    newReg = document.getElementById('newRegister');

/** Hally
 * @param {list of object} params - 
 * @param {results of func} callback - 
 */
// click register button to show menu, second click hide menu
function register() {
    if (active[0] == 0) {
        regForm.style.display="block";
        logForm.style.display="none";
        active = [1,0];
    } else {
        regForm.style.display="none";
        active = [0,0];
    }
}

//Hally
// click login button to show menu, second click hide menu
function login() {
    if (active[1] == 0) {
        regForm.style.display="none";
        logForm.style.display="block";
        active = [0,1];
    } else {
        logForm.style.display="none";
        active = [0,0];
    }
}

//Emilie
// attempt to log in
function checkCredentials(usernameDoesNotExist) {
    if (usernameDoesNotExist) {
        alert('Username does not exist!');
    } 
}

// Alert user of registration status
function notifyuser(state){
    if (state){
        alert('You have created a new account.')
    }
    else if (state === false) {
        alert('Username and password must have more than 3 characters.')
    }
}