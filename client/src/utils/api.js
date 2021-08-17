export function getDiscoverWeekly() {
  spotifyApi.searchPlaylists('Discover Weekly')
  .then(function(data) {
    console.log('Found playlists are', data.body);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
}