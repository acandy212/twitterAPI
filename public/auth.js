

document.getElementById('login_button').addEventListener("click", async function login(){
  fetch("https://" + window.location.hostname + "/login", {mode: 'cors'})
  .then(res => res.text())
  .then(data => {
    console.log(data);
    location.href=data;
  });
});