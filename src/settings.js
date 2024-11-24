document.getElementById("url").value = localStorage.getItem("url")
function updateUrl() {
    localStorage.setItem('url', document.getElementById('url').value)
}