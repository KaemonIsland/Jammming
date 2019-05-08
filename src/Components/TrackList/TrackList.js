import React from 'react';
import './TrackList.css';

import Track from '../Track/Track';

const TrackList = ({tracks, onRemove, isRemoval, onAdd}) => {
  return (
    <div className="TrackList">
      {tracks.map(track => 
      <Track 
        track={track} 
        key={track.id} 
        onAdd={onAdd} 
        onRemove={onRemove} 
        isRemoval={isRemoval}
      />
      )
    }
    </div>
  );
}

export default TrackList;