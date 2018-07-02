const clientId = '43585f07f1874d138fad92fc43e25663';
const redirectUri = 'http://kaemon-jammming.surge.sh/';

let accessToken;

const Spotify = {

  getAccessToken() {
    if(accessToken) {
      return accessToken
    }
      const userAccessToken = window.location.href.match(/access_token=([^&]*)/);
      const expiresIn = window.location.href.match(/expires_in=([^&]*)/);
      
      if (userAccessToken && expiresIn) {
        accessToken = userAccessToken[1];
        let expirationTime = Number(expiresIn[1]);

        window.setTimeout(() => accessToken = '', expirationTime * 1000);
        window.history.pushState('Access Token', null, '/');

        return accessToken;
      } else {
        const redirectUser = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
        window.location = redirectUser;
      }
  },

  search(term) {
    const accessToken = Spotify.getAccessToken();

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, 
    {headers: {Authorization: `Bearer ${accessToken}`}})
    .then(response => { return response.json();})
    .then(jsonResponse => {
      if (jsonResponse.tracks === false) {
        return [];
      }
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          URI: track.uri
        }));
    });
  },

  savePlaylist(playlistName, trackUri) {
    if (playlistName === 'New Playlist' || trackUri.length === 0) {
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const header = {Authorization: `Bearer ${accessToken}`};
    let userId;

    return fetch('https://api.spotify.com/v1/me', {headers: header})
    .then(response => response.json())
    .then(jsonResponse => {
      userId = jsonResponse.id;

      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, 
      {headers: header,
      method: 'POST',
      body: JSON.stringify({name: playlistName})
    }).then(response => response.json())
    .then(jsonResponse => {
      const playlistId = jsonResponse.id
      console.log(playlistId);

      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, 
      {headers: header,
      method: 'POST',
      body: JSON.stringify({uris: trackUri})
    });
    });
    });
  }

};

export default Spotify;
