function logout(){
    localStorage.removeItem("username")
    localStorage.removeItem("password")
    window.location.replace("index.html")
}