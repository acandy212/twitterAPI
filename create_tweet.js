import got from 'got';
import crypto from 'crypto';
import OAuth from 'oauth-1.0a';
import qs from 'querystring';

import readline from 'readline';
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


// The code below sets the consumer key and consumer secret from your environment variables
// To set environment variables on macOS or Linux, run the export commands below from the terminal:
// export CONSUMER_KEY='YOUR-KEY'
// export CONSUMER_SECRET='YOUR-SECRET'
const consumer_key = "YcywEuOacedK4NOFAw7xwo4oD";
const consumer_secret = "eqGsinvX8YNc9lLoJ2iC9Yjh7UCKxAz3r8pBFqHWnVpkguvWJo";


// Be sure to add replace the text of the with the text you wish to Tweet.
// You can also add parameters to post polls, quote Tweets, Tweet with reply settings, and Tweet to Super Followers in addition to other features.
const data = {
  "text": "We bear bears"
};

const endpointURL = `https://api.twitter.com/2/tweets`;

// this example uses PIN-based OAuth to authorize the user
const requestTokenURL = 'https://api.twitter.com/oauth/request_token?oauth_callback=oob&x_auth_access_type=write';
const authorizeURL = new URL('https://api.twitter.com/oauth/authorize');
const accessTokenURL = 'https://api.twitter.com/oauth/access_token';
const oauth = OAuth({
  consumer: {
    key: consumer_key,
    secret: consumer_secret
  },
  signature_method: 'HMAC-SHA1',
  hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')
});

async function input(prompt) {
  return new Promise(async (resolve, reject) => {
    rl.question(prompt, (out) => {
      rl.close();
      resolve(out);
    });
  });
}

async function requestToken() {
  const authHeader = oauth.toHeader(oauth.authorize({
    url: requestTokenURL,
    method: 'POST'
  }));
console.log(authHeader);
  const req = await got.post(requestTokenURL, {
    headers: {
      Authorization: authHeader["Authorization"]
    }
  });
  if (req.body) {
    return qs.parse(req.body);
  } else {
    throw new Error('Cannot get an OAuth request token');
  }
}


async function accessTokenBearer() {
  var cred = btoa(consumer_key + ":" + consumer_secret);
  const path = `https://api.twitter.com/oauth2/token`
  const req = await got.post(path, {
    headers: {
      Authorization: "Basic " + cred,
      'content-type' : "application/x-www-form-urlencoded;charset=UTF-8"
    },
    form: {grant_type: 'client_credentials'}
  });
  if (req.body) {
    return req.body;
  } else {
    throw new Error('Cannot get an OAuth request token');
  }
}

async function accessToken({
    oauth_token,
    oauth_token_secret
  }, verifier) {
    const authHeader = oauth.toHeader(oauth.authorize({
      url: accessTokenURL,
      method: 'POST'
    }));
    const path = `https://api.twitter.com/oauth/access_token?oauth_verifier=${verifier}&oauth_token=${oauth_token}`
    const req = await got.post(path, {
      headers: {
        Authorization: authHeader["Authorization"]
      }
    });
    if (req.body) {
      return qs.parse(req.body);
    } else {
      throw new Error('Cannot get an OAuth request token');
    }
  }


async function getRequestBearer(bearer_token) {
console.log(bearer_token);
  const req = await got.post(endpointURL, {
    json: data,
    responseType: 'json',
    headers: {
      Authorization: "Bearer " + bearer_token,
      'user-agent': "v2CreateTweetJS",
      'content-type': "application/json",
      'accept': "application/json"
    }
  });
  if (req.body) {
    return req.body;
  } else {
    throw new Error('Unsuccessful request');
  }
}

async function getRequest({
    oauth_token,
    oauth_token_secret
  }) {
  
    const token = {
      key: oauth_token,
      secret: oauth_token_secret
    };
  
    const authHeader = oauth.toHeader(oauth.authorize({
      url: endpointURL,
      method: 'POST'
    }, token));
  
    const req = await got.post(endpointURL, {
      json: data,
      responseType: 'json',
      headers: {
        Authorization: authHeader["Authorization"],
        'user-agent': "v2CreateTweetJS",
        'content-type': "application/json",
        'accept': "application/json"
      }
    });
    if (req.body) {
      return req.body;
    } else {
      throw new Error('Unsuccessful request');
    }
  }


(async () => {
  try {
    // Get request token
    const oAuthRequestToken = await requestToken();
    console.log(oAuthRequestToken);
    const bearer = await accessTokenBearer();
    console.log(bearer);
    const response = await getRequestBearer(JSON.parse(bearer).access_token);
    // Get authorization
    // authorizeURL.searchParams.append('oauth_token', oAuthRequestToken.oauth_token);
    // console.log('Please go here and authorize:', authorizeURL.href);
    // const pin = await input('Paste the PIN here: ');
    // // Get the access token
    // const oAuthAccessToken = await accessToken(oAuthRequestToken, pin.trim());
    // // Make the request
    // const response = await getRequest(oAuthAccessToken);
    console.dir(response, {
      depth: null
    });
  } catch (e) {
    console.log(e);
    process.exit(-1);
  }
  process.exit();
})();