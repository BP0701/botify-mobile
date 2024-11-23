current_song_id = null;
current_song = null;
current_audio = null;
playing = false;

player_info = document.getElementById("player-info");
player = document.getElementById("player");



localStorage.setItem("url", "http://127.0.0.1:4000");

password = localStorage.getItem("password");
username = localStorage.getItem("username");
url = localStorage.getItem("url");

mouse_down_on_progress = false;

document.getElementById("progress").addEventListener("change", function() {
    if (current_audio) {
        current_audio.currentTime = (current_audio.duration || 0) * (this.value / 1000);
    }
})

document.getElementById("progress").addEventListener("mousedown", function() {
    mouse_down_on_progress = true;
})

document.getElementById("progress").addEventListener("mouseup", function() {
    mouse_down_on_progress = false;
})

function play() {
    current_audio.volume = 0.2; //TODO remove this
    current_audio.play();
    playing = true;

    document.getElementById("play").innerHTML = "pause_circle";

    current_audio.addEventListener('ended', function() {
        next_song();
    });

    current_audio.addEventListener('timeupdate', function() {
        if (!mouse_down_on_progress) {
            document.getElementById("progress").value = (current_audio.currentTime / current_audio.duration) * 1000;
        }
    });
}

function pause() {
    document.getElementById("play").innerHTML = "play_circle";
    current_audio.pause()
    playing = false;
}

function togglePlay(){
    if (playing){
        pause()
    }
    else {
        play()
    }
}

function setSong(id) {
    if(playing){current_audio.pause();}
    current_song_id = id;
    fetch(`${url}/api/song/${id}`, {
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
        current_song = data;
        fetch(`${url}/api/audio/${id}`, {
            "headers": {
              "authorization": "Basic "+window.btoa(`${username}:${password}`),
            },
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": null,
            "method": "GET",
            "mode": "cors",
            "credentials": "include"
          }).then((response) => {
            const reader = response.body.getReader();
            return new ReadableStream({
              start(controller) {
                return pump();
                function pump() {
                  return reader.read().then(({ done, value }) => {
                    // When no more data needs to be consumed, close the stream
                    if (done) {
                      controller.close();
                      return;
                    }
                    // Enqueue the next data chunk into our target stream
                    controller.enqueue(value);
                    return pump();
                  });
                }
              },
            });
          })
          // Create a new response out of the stream
          .then((stream) => new Response(stream))
          // Create an object URL for the response
          .then((response) => response.blob())
          .then((blob) => URL.createObjectURL(blob))
          // Update image
          .then((url) => {
            current_audio = new Audio(url);
            play()
          })
        
        
        document.getElementById("cover").src = current_song.cover;
        document.getElementById("artist_name").innerHTML = current_song.artist;
        document.getElementById("song_name").innerHTML = current_song.song;
        
        player.style.visibility = "visible";

        document.title = current_song.song;
    });
}