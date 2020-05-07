import React from 'react';
import * as constants from './Constants';

const Info = ({message, startOver}) => {
  return (
    <div className="info">  
        <span>{constants.GAME_OVER} : {message}</span>
        <input className="play-again" type="button" value={constants.PLAY_AGAIN} onClick={startOver} />
    </div>
  )
}

export default Info