var active = [0,1], //[0] for register, [1] for login
    regForm = document.getElementById('registerform'),
    logForm = document.getElementById('loginform');

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

/**
 * Function to check whether a username exists. If the username does not exist, alert the user.
 * @param {boolean} usernameDoesNotExist - variable indicating whether a username exists
 */
function checkCredentials(usernameDoesNotExist) {
    if (usernameDoesNotExist) {
        swal('Error','Username does not exist!','error');
    } 
}

/**
 * Function to check whether the user has entered valid username and password when registering for an account
 * @param {boolean} state - variable indicating whether the registered username and passwords are valid
 */
function notifyuser(state){
    if (state) {
        swal('Success','You have created a new account.','success')
    }
    else if (state === false) {
        swal('Error','Username and password must have more than 3 characters or username already exists','error')
    }
}