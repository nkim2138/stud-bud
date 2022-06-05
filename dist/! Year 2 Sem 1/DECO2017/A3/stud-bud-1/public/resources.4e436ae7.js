// reference from https://www.youtube.com/watch?v=QTHRWGn_sJw
const musicContainer = document.getElementById("smallMusicDisplay");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const mPauseBtn = document.getElementById("pause");
const audio = document.getElementById("audio");
const loading = document.querySelector(".music-loading");
const loadingContainer = document.querySelector(".music-loading-container");
// artist name and song name
const songname = document.getElementById("songname");
// cover
const cover = document.getElementById("cover");
// Song titles
const songs = [
    "erf",
    "piano",
    "scifi"
];
// a way to keep track of the songs
//2 by default based on array
let songIndex = 2;
// load songs into DOM
loadSong(songs[songIndex]);
// song details will be updated
function loadSong(song) {
    songname.innerHTML = song;
    audio.src = `music/${song}.mp3`;
    cover.src = `songimages/${song}.jpg`;
}
function playSong() {
    playBtn.style.display = "none";
    mPauseBtn.style.display = "inline-block";
    audio.play();
}
function pauseSong() {
    mPauseBtn.style.display = "none";
    playBtn.style.display = "inline-block";
    audio.pause();
}
// Event listeners for the buttons
playBtn.addEventListener("click", ()=>{
    const isPlaying = musicContainer.classList.contains("play");
    // if song is playing, the play button turns to stop
    if (isPlaying) pauseSong();
    else playSong();
});

//# sourceMappingURL=resources.4e436ae7.js.map
