import React from 'react';
import * as constants from './Constants';

const Info = ({message, startOver}) => {
  return (
    <div className="info">  
        <span>{constants.gameOver} : {message}</span>&nbsp;&nbsp;
        <input type="button" value={constants.playAgain} onClick={startOver} />
    </div>
  )
}

export default Info