document.getElementById('create_button').addEventListener("click", async function createTweet(){
    fetch("https://" + window.location.hostname + "/createTweet", {
        method: 'POST',
        headers: {
          'Content-Type' : 'text/plain'
        },
        mode: 'cors',
        body: document.getElementById("tweet_content").value
      })
    .then(res => res.text())
    .then(data => {
      console.log(data);
    });
  });

  document.getElementById('delete_button').addEventListener("click", async function deleteTweet(){
    fetch("https://" + window.location.hostname + "/deleteTweet", {
        method: 'POST',
        headers: {
          'Content-Type' : 'text/plain'
        },
        mode: 'cors',
        body: document.getElementById("tweet_id").value
      })
    .then(res => res.text())
    .then(data => {
      console.log(data);
    });
  });