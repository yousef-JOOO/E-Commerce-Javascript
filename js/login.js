let userName = document.querySelector("#user-name")
let password = document.querySelector("#password")
let loginBtn = document.querySelector("#login-btn")
let getUserName = localStorage.getItem("user-name")
let getPassword = localStorage.getItem("password")


//validation

loginBtn.addEventListener("click",function(){
    if(userName.value === ""||password.value === ""){
        alert("Please Fill Data")
    }
    else{
        if((userName.value.trim() === getUserName &&getUserName.trim())&&(password.value.trim() === getPassword&&getPassword.trim())){
            setTimeout(() => {
                window.location = "./index.html"
            }, 1500);
        }
        else{
            alert("The User Name or Password Is Not Valid")
        }
    }
})