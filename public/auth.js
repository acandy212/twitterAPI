

document.getElementById('auth_button').addEventListener("click", async function getLink(){
  fetch("https://" + window.location.hostname + "/getLink")
  .then(res => res.text())
  .then(data => {
    const arr = data.split("|");
    console.log(arr[1]);
    sessionStorage.setItem("responseToken", arr[1]);
    console.log(sessionStorage.getItem("responseToken"));
    document.getElementById("auth_link").innerHTML = arr[0];
  });
});

document.getElementById('pin_button').addEventListener("click", async function authPin(){
  fetch("https://" + window.location.hostname + "/authorizePin", {
    method: 'POST',
    headers: {
      'Content-Type' : 'text/plain'
    },
    mode: 'cors',
    body: sessionStorage.getItem("responseToken") + "|" + document.getElementById("pin_number").value
  })
  .then(res => res.text())
  .then(data => {
    console.log(data);
    sessionStorage.setItem("accessToken", data);
    console.log(sessionStorage.getItem("accessToken"));
  });
});