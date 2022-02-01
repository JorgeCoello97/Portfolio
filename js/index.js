var player = document.getElementById("player");
var title_song = document.getElementById("title_song");
var cover_img = document.getElementsByClassName("cover")[0].children[0]
var player_duration = document.getElementById("player_duration");
var playButton = document.getElementById("play");
var pauseButton = document.getElementById("pause");
var step_backwardButton = document.getElementsByClassName("step-backward")[0];
var step_forewardButton = document.getElementsByClassName("step-foreward")[0];

pauseButton.style.display = "none";
player_duration.style.display = "none";
var list_songs;
var current_song = 0;
var current_song_time = 0;

$.getJSON("files/list_songs.json", function (json) {
    list_songs = json.songs;

    if (sessionStorage.currentSong) {
        current_song = sessionStorage.currentSong;
        player.src = 'mp3/' + list_songs[current_song].file;
        title_song.innerHTML = list_songs[current_song].title;
        player.load();
        player.onloadeddata = function () {
            if (sessionStorage.currentSong) {
                var position = Math.round(sessionStorage.currentSongTime);
                player.currentTime = position;

                player.play();
                player_duration.innerHTML = formatTime(player.duration);
                cover_img.style.animation = "rotateDisc 4s linear infinite";
                playButton.style.display = "none";
                pauseButton.style.display = "initial";
                player_duration.style.display = "initial";

                sessionStorage.removeItem("currentSong");
                sessionStorage.removeItem("currentSongTime");
            }
        };
    } /*else {
        if (!sessionStorage.noFirstTime) {
            player.src = 'mp3/' + list_songs[current_song].file;
            player.load();
            player.onloadeddata = function () {
                var promise = player.play();
                if (promise !== undefined) {
                    promise.then(_ => {
                        cover_img.style.animation = "rotateDisc 4s linear infinite";
                        playButton.style.display = "none";
                        pauseButton.style.display = "initial";
                        sessionStorage.noFirstTime = "yes";
                        
                        player_duration.innerHTML = formatTime(player.duration);
                    }).catch(error => {
                        cover_img.style.animation = "rotateDisc 0s linear infinite";
                        playButton.style.display = "initial";
                        pauseButton.style.display = "none";
                    });
                }
            };
        }
    }*/

    title_song.innerHTML = json.songs[current_song].title;
});


playButton.onclick = function () {
    if (player.currentTime === 0) {
        player.src = 'mp3/' + list_songs[current_song].file;
        title_song.innerHTML = list_songs[current_song].title;
        player.load();
        player.onloadeddata = function () {
            player.play();
            cover_img.style.animation = "rotateDisc 4s linear infinite";
            playButton.style.display = "none";
            pauseButton.style.display = "initial";
            sessionStorage.noFirstTime = "yes";

            player_duration.innerHTML = formatTime(player.duration);
        };
    }
    player.play();
    player_duration.style.display = "initial";
    cover_img.style.animation = "rotateDisc 4s linear infinite";
    playButton.style.display = "none";
    pauseButton.style.display = "initial";
};

pauseButton.onclick = function () {
    player.pause();
    cover_img.style.animation = "rotateDisc 0s linear infinite";
    playButton.style.display = "initial";
    pauseButton.style.display = "none";
};

step_backwardButton.onclick = function () {
    previousSong();
};
step_forewardButton.onclick = function () {
    nextSong();
};

function nextSong() {
    if (current_song === list_songs.length - 1) {
        current_song = 0;
    } else {
        current_song++;
    }
    player.src = 'mp3/' + list_songs[current_song].file;
    title_song.innerHTML = list_songs[current_song].title;
    player.load();

    player.play();
    cover_img.style.animation = "rotateDisc 4s linear infinite";
    playButton.style.display = "none";
    pauseButton.style.display = "initial";
}
player.addEventListener('ended', nextSong, false);

function previousSong() {
    if (current_song === 0) {
        current_song = list_songs.length - 1;
    } else {
        current_song--;
    }
    player.src = 'mp3/' + list_songs[current_song].file;
    title_song.innerHTML = list_songs[current_song].title;
    player.load();

    player.play();
    cover_img.style.animation = "rotateDisc 4s linear infinite";
    playButton.style.display = "none";
    pauseButton.style.display = "initial";
}

function clickMenuHamburger() {
    var menu_icon = document.getElementsByClassName("menu")[0];
    menu_icon.classList.toggle("change");
    var nav = document.getElementsByTagName("nav")[0];
    nav.classList.toggle("nav_no_oculto");
    nav.classList.toggle("nav_oculto");
}

function checkSongIsPlaying() {
    if (playButton.style.display === "none") {
        sessionStorage.currentSong = current_song;
        sessionStorage.currentSongTime = player.currentTime;
    }
}


player.ontimeupdate = function(){
    var player_current_time = document.getElementById("player_current_time");
    player_current_time.innerHTML = formatTime(player.currentTime);
};

function formatTime(seconds) {
    minutes = Math.floor(seconds / 60);
    minutes = (minutes >= 10) ? minutes : "0" + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
}