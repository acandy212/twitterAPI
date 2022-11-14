import express from "express";
import { Client, auth } from "twitter-api-sdk";
import dotenv from "dotenv";
dotenv.config();

const apikey = 'e1vXHQ6DeFlCgEs5XXj4V68Ex'
const apiSecretKey = 'Oep79Vr62B07ZqrCCyge1Eyol8nCZvjQF3qZh4QLk27jy8Jzxx'
const accessToken = '1589724180580339713-JH5UCybpKlHBscYrxSESMMzRMPbknQ'
const accessTokenSecret = 'u3klbTBhfN7PYrJf7LpaLgyZq3wNeO5yJcZ2IjerMH7f5'

var T = new Twitter({
  consumer_key:       apikey,
  consumer_secret:    apiSecretKey,
  access_token: accessToken,
  access_token_secret: accessTokenSecret,
});

const app = express();

const URL = process.env.URL || 'http://127.0.0.1';
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;


const authClient = new auth.OAuth2User({
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  callback: `${URL}:${PORT}/callback`,
  scopes: ["tweet.read","tweet.write","users.read"],
});
const client = new Client(authClient);
  
const STATE = "my-state";

app.get("/callback", async function (req, res) {
  try {
    const { code, state } = req.query;
    if (state !== STATE) return res.status(500).send("State isn't matching");
    await authClient.requestAccessToken(code);
    res.redirect("/tweets");
  } catch (error) {
    console.log(error);
  }
});
  
app.get("/login", async function (req, res) {
  const authUrl = authClient.generateAuthURL({
    state: STATE,
    code_challenge_method: "s256",
  });
  res.redirect(authUrl);
});

app.get("/revoke", async function (req, res) {
  try {
    const response = await authClient.revokeAccessToken();
    res.send(response);
  } catch (error) {
    console.log(error);
  }
});

app.get("/tweets", async function (req, res) {
  try {
    const response = await client.tweets.createTweet();
  
  console.log("response", JSON.stringify(response, null, 2));
    res.send(response);
  } catch (error) {
    console.log("tweets error", error);
  }
});

app.listen(3000, function() {
  console.log('App listening on port 3000')
})
  
