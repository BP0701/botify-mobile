if (localStorage.getItem("url") == null){
    localStorage.setItem("url", "http://127.0.0.1:4000");
}

if (localStorage.getItem("password") != null && localStorage.getItem("username") != null){
    window.location.replace("main.html");
}

function setCredentials(){
    localStorage.setItem("password", document.getElementById("password").value);
    localStorage.setItem("username",document.getElementById("username").value);
    window.location.replace("main.html");
}