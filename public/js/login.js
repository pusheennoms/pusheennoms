var active = [0, 1], //[0] for register, [1] for login, default has login open
    regForm = document.getElementById('registerform'),
    logForm = document.getElementById('loginform'),
    credForm = document.getElementById('credentialsForm'),
    newReg = document.getElementById('newRegister');

/** click register button to show registration menu, second click hide menu
 */
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

/** click login button to show login menu, second click hide menu
 */
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

/** attempt to log in
 *
 */
function checkCredentials(usernameDoesNotExist) {
    if (usernameDoesNotExist) {
        swal('Error','Username does not exist!','error');
    } 
}

// Alert user of registration status
function notifyuser(state){
    if (state === 0) {
        swal('Congratulations!', 'You have created a new account.', 'success')
    }
    else if (state === 1) {
        swal('Error', 'Username and password must have more than 3 characters.', 'error')
    }
    else if (state === 2) {
        swal('Error', 'Username already exists.', 'error')
    }
}