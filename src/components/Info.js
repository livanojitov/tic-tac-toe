import React from 'react';

const Info = ({message, startOver}) => {
  return (
    <div className="info">  
        <span>Game over : {message}</span>&nbsp;&nbsp;
        <input type="button" value="Play again" onClick={startOver} />
    </div>
  )
}

export default Info