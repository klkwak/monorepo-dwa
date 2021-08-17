const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");
const cors = require("cors");
const SpotifyWebApi = require("spotify-web-api-node");
const cookieParser = require("cookie-parser");
const { access } = require("fs");

const app = express();

// const errorHandler = require("./errors/errorHandler");
// const notFound = require("./errors/notFound");

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// function generateRandomString(length) {
//   var text = "";
//   var possible =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

//   for (let i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// }

// const stateKey = "spotify_auth_state";

// app.get("/login", function (req, res) {
//   console.log("logging in");

//   const state = generateRandomString(16);
//   res.cookie(stateKey, state);

//   // your application requests authorization
//   const scopes = [
//     "user-read-private",
//     "user-read-email",
//     "playlist-modify-public",
//     "playlist-modify-private",
//   ];

//   const spotifyApi = new SpotifyWebApi({
//     redirectUri: process.env.REDIRECT_URI,
//     clientId: process.env.CLIENT_ID,
//   });

//   const authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

//   res.redirect(authorizeURL);
// });

const spotifyApi = new SpotifyWebApi({
  redirectUri: process.env.REACT_APP_REDIRECT_URI,
  clientId: process.env.REACT_APP_CLIENT_ID,
  clientSecret: process.env.REACT_APP_CLIENT_SECRET
});

app.get("/callback", function (req, res) {
  const code = req.query.code;
  const error = req.query.error;
  console.log(code);

  if (error) {
    console.error('Callback Error:', error);
    res.send(`Callback Error: ${error}`);
    return;
  }

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      const access_token = data.body['access_token'];
      const refresh_token = data.body['refresh_token'];
      const expires_in = data.body['expires_in'];

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      console.log('access_token:', access_token);
      console.log('refresh_token:', refresh_token);

      console.log(
        `Successfully retrieved access token. Expires in ${expires_in} s.`
      );

      process.env.REACT_APP_ACCESS_TOKEN = access_token;
      // res.send('Success! You can now close the window.');
      res.redirect("http://localhost:3000/loggedin");

      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const access_token = data.body['access_token'];

        console.log('The access token has been refreshed!');
        console.log('access_token:', access_token);
        spotifyApi.setAccessToken(access_token);
      }, expires_in / 2 * 1000);
    })
    .catch(error => {
      console.error('Error getting Tokens:', error);
      res.send(`Error getting Tokens: ${error}`);
    });
});

// app.use(notFound);
// app.use(errorHandler);

module.exports = app;
