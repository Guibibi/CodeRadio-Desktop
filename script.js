var request = new XMLHttpRequest();

setInterval(function() {
  request.open(
    "GET",
    "https://coderadio-admin.freecodecamp.org:8010/status-json.xsl",
    true
  );

  request.onreadystatechange = e => {
    console.log(request.responseText);
    if (request.readyState == 4 && request.status == 200) {
      var response = JSON.parse(request.responseText);
      //alert(response.icestats.source[0].artist);
      document.getElementById("artist").innerHTML =
        response.icestats.source[0].artist;
      document.getElementById("song").innerHTML =
        response.icestats.source[0].yp_currently_playing;
    }
  };

  request.send();
}, 5000);
