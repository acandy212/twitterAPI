import express from "express";
import { Client, auth } from "twitter-api-sdk";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import cors from 'cors';
dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());

const URL = 'https://3000-acandy212-twitterapi-xs5luydq8gx.ws-us77.gitpod.io' || 'http://127.0.0.1';
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
console.log(URL);
console.log(PORT);

const authClient = new auth.OAuth2User({
  client_id: 'T0lDTUVNbXgzcHpCS1VDSGxaZm06MTpjaQ',
  client_secret: 'ew7u-q2-HzyYwtmiOck-U1yUPVQ3bVfhmMQhFahl9WduFIWErM',
  callback: `${URL}/callback`,
  scopes: ["tweet.read","tweet.write","users.read"],
});
const client = new Client(authClient);
  
const STATE = "my-state";

app.get("/callback", async function (req, res) {
  try {
    console.log("MY FOOT");
    const { code, state } = req.query;
    if (state !== STATE) return res.status(500).send("State isn't matching");
    await authClient.requestAccessToken(code);
    console.log(authClient.token);
    res.redirect("/manage");
  } catch (error) {
    console.log(error);
  }
});

app.get("/login", async function (req, res) {
  const authUrl = authClient.generateAuthURL({
    state: STATE,
    code_challenge_method: "s256",
  });
  //res.redirect(authUrl);
  res.send(authUrl);
});



async function postTweet(create_tweet) {
  console.log(create_tweet);

  try {
    const response = await client.tweets.createTweet({
    "text": create_tweet
  });
  
  console.log("response", JSON.stringify(response, null, 2));
    return response;
  } catch (error) {
    console.log("tweets error", error);
  }

}

async function deleteTweet(tweet_id) {
  console.log(tweet_id);

  try {
    const response = await client.tweets.deleteTweetById(tweet_id, );
  
  console.log("response", JSON.stringify(response, null, 2));
    return response;
  } catch (error) {
    console.log("tweets error", error);
  }
}

app.use(express.text());




app.post('/createTweet', async function createTweetRequest(req,res){
  console.log(req.body);
  const response = postTweet(req.body);
  res.send(response);
});

app.post('/deleteTweet', async function deleteTweetRequest(req,res){
  console.log(req.body);
  const response = deleteTweet(req.body);
  res.send(response);
});


app.use(express.static(path.join(__dirname + '/public')));

app.get('/auth',function(req,res){
  console.log(__dirname);
  res.sendFile(path.join(__dirname+'/auth.html'));
});

app.get('/manage',function(req,res){
  console.log(__dirname);
  res.sendFile(path.join(__dirname+'/manage.html'));
});

//get the html file
app.get('/', function (req, response){
  response.sendfile('index.html');
})


app.listen(3000, function() {
  console.log('App listening on port 3000')
})


// Creates a button that allow the user to change the theme

// function APP() {
//   return (
//     <div className="APP">

//           <Button variant= "danger" onClick={() => {localStorage.setItem('theme', localStorage.getItem('theme') === 'dark' ? 'light' : 'dark'); 
//         window.location.reload();}}>
//           Change Mode 
//         </Button>
//       <Header 
//         linkText="Learn React"
//         linkUrl="https://reactjs.org" />
//     </div>
//   );
// }

// export default App;
