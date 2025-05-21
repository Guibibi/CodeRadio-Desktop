//Get the audio element on the page.
const x = document.getElementById("codeRadio");

//Set the starting volume at 75%
x.volume = 0.75;
let isPlaying = false;

function toggleAudio() {
  var playButton = document.getElementById("playButton");
  const src =
    "https://coderadio-admin.freecodecamp.org/radio/8010/radio.mp3";

  //Start and stop the music.
  if (isPlaying == false) {
    x.src = src;
    x.play();
    isPlaying = true;
    playButton.classList.replace("fa-play", "fa-pause");
  } else if (isPlaying == true) {
    x.pause();
    x.currentTime = 0;
    x.src = "";
    isPlaying = false;
    playButton.classList.replace("fa-pause", "fa-play");
  }
}

function changeVolume(y) {
  x.volume = y / 100;
}

//This script is made for the HTTP request for the music information.
//const remote = require("electron").remote;
const { remote, ipcRenderer } = require("electron");
var request = new XMLHttpRequest();

document.onreadystatechange = function() {
  var state = document.readyState;
  if (state == "complete") {
    requestInfo();
    request.send();
  }
};

requestInfo();

//Get the music info
setInterval(function() {
  requestInfo();

  //Time in ms between requests
  request.send();
}, 5000);

function requestInfo() {
  request.open(
    "GET",
    "https://coderadio-admin.freecodecamp.org/api/nowplaying_static/coderadio.json",
    true
  );
  request.onreadystatechange = e => {
    if (request.readyState == 4 && request.status == 200) {
      //Parse the json into text
      var response = JSON.parse(request.responseText);
      //Update the info from the music with the json file from the api.
      document.getElementById("artist").innerHTML =
        response.now_playing.song.artist;
      document.getElementById("song").innerHTML =
        response.now_playing.song.title;
      document.getElementById("art").src = response.now_playing.song.art;
    }
  };
}

//This will make the window close when pressing the close button
function closeApp() {
  var window = remote.getCurrentWindow();
  window.close();
}

//Toggle audio playback when the app send the ipc message of the MediaPlayPause button was pressed.
ipcRenderer.on("keypressed", event => {
  console.log(event);
  toggleAudio();
});
