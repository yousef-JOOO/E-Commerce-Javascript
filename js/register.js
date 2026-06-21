let userName = document.querySelector("#user-name")
let email = document.querySelector("#email")
let phone = document.querySelector("#phone")
let password = document.querySelector("#password")
let registerBtn = document.querySelector("#register-btn")


// validation
registerBtn.addEventListener("click",function(){
    if(userName.value ===""||email.value ===""||phone.value ===""||password.value ===""){
    alert("Please Fill Data")
}
else {
    localStorage.setItem("user-name",userName.value)
    localStorage.setItem("email",email.value)
    localStorage.setItem("phone",phone.value)
    localStorage.setItem("password",password.value)
    setTimeout(() => {
        window.location = "login.html"
    }, 1500);
}
})


