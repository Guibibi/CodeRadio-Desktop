//This script is made for the HTTP request for the music information.
const remote = require("electron").remote;
var request = new XMLHttpRequest();

document.onreadystatechange = function() {
  console.log("I am tired");
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
