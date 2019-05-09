import React from 'react';
import './Track.css';

const Track = ({track, isRemoval, onAdd, onRemove}) => {

  let renderAction = () => isRemoval ? removeTrack : addTrack;

  let addTrack = () => onAdd(track);

  let removeTrack = () => onRemove(track);

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
      </div>
      <button className="Track-action" onClick={renderAction()}>
        {isRemoval ? '-' : '+'}
      </button>
    </div>
  );
}

export default Track;