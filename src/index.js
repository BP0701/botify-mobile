password = localStorage.getItem("password");
username = localStorage.getItem("username");
url = localStorage.getItem("url");

songs = document.getElementById("songs")

function loadSongs(){
    fetch(`${url}/api/songs`, {
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
        for (i in data){
            song = data[i];
            songs.innerHTML = songs.innerHTML + `<div class="song" onclick="setSong(${Number(i)+1})"><img src="${song.cover}"><span><span class ="song_name">${song.song}</span><br><span class ="artist_name">${song.artist}</span></span></div>`
        }
    });
}

loadSongs();