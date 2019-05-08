import React, { useState } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

const App = () => {
    let [results, setResults] = useState([]);
    let [playlistName, setPlaylistName] = useState('New Playlist')
    let [playlistTracks, setPlaylistTracks] = useState([])


  let addTrack = track => {
    if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    setPlaylistTracks([...playlistTracks, track])
  }

  let removeTrack = track => {
    let newPlaylist = playlistTracks.filter(currentTrack => currentTrack.id !== track.id);

    setPlaylistTracks(newPlaylist);
  }

  let updatePlaylistName = name => setPlaylistName(name);

  let savePlaylist = () => {
    const trackUris = playlistTracks.map(track => track.URI);
    Spotify.savePlaylist(playlistName, trackUris)
    setPlaylistName('New Playlist')
    setPlaylistTracks([])
  }

  let search = term => {
    Spotify.search(term).then(searchResults => {
      setResults([...searchResults]);
    });
  }
  return (
    <main>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={search}/>
        <div className="App-playlist">
          <SearchResults searchResults={results} 
                          onAdd={addTrack} 
                          onSave={savePlaylist}
                          playlist={playlistName}
                          />
          <Playlist playlistTracks={playlistTracks} 
                    onRemove={removeTrack} 
                    onNameChange={updatePlaylistName}
                    onSave={savePlaylist}
                    playlist={playlistName}
                    />
        </div>
      </div>
    </main>
  );
}

export default App;
