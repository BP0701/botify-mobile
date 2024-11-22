current_song_id = null;
current_song = null;
current_audio = null;

player_info = document.getElementById("player-info");
player = document.getElementById("player");



localStorage.setItem("password", "test"); //TODO change that!
localStorage.setItem("username", "test");
localStorage.setItem("url", "http://localhost:5000");

password = localStorage.getItem("password");
username = localStorage.getItem("username");
url = localStorage.getItem("url");

function Play() {
    current_audio.play();

    current_audio.addEventListener('ended', function() {
        next_song();
    });

    current_audio.addEventListener('timeupdate', function() {
        if (!mouse_down_on_progress) {
            document.getElementById("progress").value = (current_audio.currentTime / current_audio.duration) * 1000;
        }
    });
}

function setSong(id) {
    current_song_id = id;
    fetch(`${url}/song/${id}`, {
        "headers": {
          "authorization": "Basic dGVzdDp0ZXN0",
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
      })
    .then(response => response.json())
    .then(data => {
        current_song = data;
        current_audio = new Audio(current_song.url);
        player_info.innerHTML = `<img src="${current_song.cover}"><span><span class ="song_name" id ="song_name">${current_song.song}</span><br><span class ="artist_name" id ="artist_name">${current_song.artist}</span></span>`

        console.log(current_song);
    });
}