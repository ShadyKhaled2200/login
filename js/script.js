
const usernameInput = document.getElementById("usernameInput"); 
const userEmailInput = document.getElementById("userEmailInput"); 
const userPasswordInput = document.getElementById("userPasswordInput"); 
const signupBtn = document.getElementById("signupBtn"); 
const loginBtn = document.getElementById("loginBtn");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const wrongMsg = document.getElementById("wrongMsg");
const usernameAlert = document.getElementById("usernameAlert");
const userPasswordAlert = document.getElementById("userPasswordAlert");
const userEmailAlert = document.getElementById("userEmailAlert");
const confirmMsg = document.getElementById("confirmMsg");
const tryAgainMsg = document.getElementById("tryAgainMsg");
const accountExistMsg = document.getElementById("accountExistMsg");
const fillMsg = document.getElementById("fillMsg");
const signin = document.getElementById("signin")
const username = localStorage.getItem("sessionUsername");

let usersinfo;


if(localStorage.getItem("users") == null)
{
    usersinfo = [];
}
else
{
    usersinfo = JSON.parse(localStorage.getItem("users"));
}
function signUp()
{

    userInputsValidation();
    isExist();

    if(userInputsValidation() == true && isExist() == false)
    {
        let user = 
        {
            name:usernameInput.value,
            email:userEmailInput.value,
            password:userPasswordInput.value
        }

        usersinfo.push(user)
        localStorage.setItem("users", JSON.stringify(usersinfo));
        confirmMsg.classList.replace("d-none", "d-block");
        signin.classList.replace("d-none", "d-block");
    }
    else
    {
        tryAgainMsg.classList.replace("d-none", "d-block");
    }

}

function usernameValidation()
{

    let regex = /^[A-Za-z]{3,10}(\s?[A-Za-z]{3,10})?$/
    if( regex.test(usernameInput.value) == true && usernameInput.value != "")
    {
        usernameInput.classList.add("is-valid");
        usernameInput.classList.remove("is-invalid");
        usernameAlert.classList.replace("d-block", "d-none");

        return true
    }
    else
    {
        
        usernameInput.classList.add("is-invalid");
        usernameInput.classList.remove("is-valid");
        usernameAlert.classList.replace("d-none", "d-block");

        return false
    }
}
function userPasswordValidation()
{
    let regex = /^.{5,15}$/;

    if( regex.test(userPasswordInput.value) == true && userPasswordInput.value != "")
    {
        userPasswordInput.classList.add("is-valid");
        userPasswordInput.classList.remove("is-invalid");
        userPasswordAlert.classList.replace("d-block", "d-none");

        return true
    }
    else
    {
        
        userPasswordInput.classList.add("is-invalid");
        userPasswordInput.classList.remove("is-valid");
        userPasswordAlert.classList.replace("d-none", "d-block");

        return false
    }
}

function userEmailValidation()
{

    let regex = /@[a-z]{5,10}(\.com)$/;
    if( regex.test(userEmailInput.value) == true && userEmailInput.value != "")
    {
        userEmailInput.classList.add("is-valid");
        userEmailInput.classList.remove("is-invalid");
        userEmailAlert.classList.replace("d-block", "d-none");

        return true
    }
    else
    {
        
        userEmailInput.classList.add("is-invalid");
        userEmailInput.classList.remove("is-valid");
        userEmailAlert.classList.replace("d-none", "d-block");

        return false
    }
}

function isExist()
{
    
    for(let i = 0; i < usersinfo.length; i++)
    {

        if(usersinfo[i].name.toLowerCase() == usernameInput.value.toLowerCase() || usersinfo[i].email.toLowerCase() == userEmailInput.value.toLowerCase())
        {
            accountExistMsg.classList.replace("d-none", "d-block");
            usernameInput.classList.remove("is-valid");
            userEmailInput.classList.remove("is-valid");
            userPasswordInput.classList.remove("is-valid");

            return true
        }
    }
    return false
}
function userInputsValidation()
{
    usernameValidation();   
    userEmailValidation();
    userPasswordValidation();

    if( (usernameValidation() == true && userEmailValidation() == true && userPasswordValidation() == true))
    {
        return true
    }
    else
    {
        return false
    }
}



function login()
{

    if(loginEmail.value == "" || loginPassword.value == "")
    {
        fillMsg.classList.replace("d-none", "d-block");
        return false
    }

    for(var i = 0; i < usersinfo.length; i++)
    {
        if(usersinfo[i].email.toLowerCase() == loginEmail.value.toLowerCase() && usersinfo[i].password.toLowerCase() == loginPassword.value.toLowerCase())
        {
            
            localStorage.setItem('sessionUsername', usersinfo[i].name)
            loginBtn.setAttribute("href", "welcome.html");
        }
        else
        {
            wrongMsg.classList.replace("d-none", "d-block");
        }
    }
}
function displayWelcomeUser()
{
    document.getElementById("username").innerHTML = "Welcome "+ username;

}

function logout() {
    localStorage.removeItem('sessionUsername')
}
