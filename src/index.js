if (localStorage.getItem("password") != null && localStorage.getItem("username") != null){
    window.location.replace("main.html");
}

function setCredentials(){
    localStorage.setItem("password", document.getElementById("password").value);
    localStorage.setItem("username",document.getElementById("username").value);
    window.location.replace("main.html");
}