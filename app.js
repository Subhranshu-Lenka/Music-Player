const playBtn = document.getElementById("play-btn");
const playPauseBtn = document.getElementById("play-pause");
const progressBar = document.getElementById("progress");
const song = document.getElementById("song");

// time of the song
let startTime = document.querySelector(".start-time");
let endTime = document.querySelector(".end-time");

const totalDuration = song.duration;
const mins = Math.floor(totalDuration / 60);
const sec = Math.floor(totalDuration % 60);

// end time 
endTime.innerHTML = `${mins.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;

// running timer function 
function updateTime() {
    let currentTime = Math.floor(song.currentTime);
    let CurrMins = Math.floor(currentTime / 60);
    let CurrSec = Math.floor(currentTime % 60);

    startTime.innerHTML = `${CurrMins.toString().padStart(2, '0')}:${CurrSec.toString().padStart(2, '0')}`;

    if (currentTime < totalDuration) {
        requestAnimationFrame(updateTime);
    }
}
// audio element event listener for running timer 
song.addEventListener('play', updateTime);
song.addEventListener('pause', () => cancelAnimationFrame(updateTime));



// progress bar starting points
song.onloadedmetadata = function () {
    progressBar.max = song.duration;
    progressBar.value = song.currentTime;
}

playBtn.addEventListener("click", () => {
    playPause();
});

// play-pause function
function playPause() {
    if (playBtn.classList.contains("playing")) {
        song.pause();
        playBtn.classList.remove("playing");
        playPauseBtn.setAttribute("src", "./images/play.png");
    }
    else {
        song.play();
        playBtn.classList.add("playing");
        playPauseBtn.setAttribute("src", "./images/pause.png");

        if (song.play()) {
            setInterval(() => {
                progressBar.value = song.currentTime;
            }, 100)
        }
    }
}

// progress bar drag function
progressBar.oninput = () => {
    song.currentTime = progressBar.value;
    song.play();
    playBtn.classList.add("playing");
    playPauseBtn.setAttribute("src", "./images/pause.png");
}

