query = document.getElementById("query");

password = localStorage.getItem("password");
username = localStorage.getItem("username");
url = localStorage.getItem("url");

query.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        search();
    }
});

function search(){
    fetch(`${url}/api/search?query=${query.value}`, {
        "headers": {
          "authorization": "Basic "+window.btoa(`${username}:${password}`),
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
      })
      .then(response => response.json())
      .then(data => {
        document.getElementById("results").innerHTML = "";
          for (i in data){
              song = data[i];
              document.getElementById("results").innerHTML = document.getElementById("results").innerHTML + `<div class="song" onclick="setSong(${Number(i)+1})"><img src="${song.cover}"><span><span class ="song_name">${song.song}</span><br><span class ="artist_name">${song.artist}</span></span></div>`
          }
      });
}