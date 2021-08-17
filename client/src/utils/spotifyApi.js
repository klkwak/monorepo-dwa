const SpotifyWebApi = require("spotify-web-api-node");

function generateRandomString(length) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

export function getAuthorizeURL() {
  const scopes = [
    "user-read-private",
    "user-read-email",
    "playlist-modify-public",
    "playlist-modify-private",
  ];

  const state = generateRandomString(16);

  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REACT_APP_REDIRECT_URI,
    clientId: process.env.REACT_APP_CLIENT_ID,
  });

  const url = spotifyApi.createAuthorizeURL(scopes, state);

  return url;
}

export function getDiscoverWeekly() {
  const spotifyApi = new SpotifyWebApi();
  spotifyApi.setAccessToken(process.env.REACT_APP_SPOTIFY_ACCESS_TOKEN);
  return ["hi", "hi"];

  // spotifyApi
  // .authorizationCodeGrant(authorizationCode)
  // .then(function(data) {
  //   spotifyApi.setAccessToken(data.body['access_token']);
  //   return spotifyApi.searchPlaylists('Discover Weekly')
  //   .then(function(data) {
  //     console.log('Found playlists are', data.body);
  //   }, function(err) {
  //     console.log('Something went wrong!', err);
  //   });
  // })
}