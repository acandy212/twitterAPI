

document.getElementById('auth_button').addEventListener("click", async function getLink(){
  console.log(window.location.hostname);
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", window.location.hostname + "/auth", false ); // false for synchronous request
  xmlHttp.send( null );
  document.getElementById("auth_link").innerHTML = xmlHttp.responseText;
});

