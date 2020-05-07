import React from 'react';
import * as constants from './Constants';

const Images = ({imageUser, imageComputer, folder, hideRefreshButton, refresh }) => {
  return (
        <div className="random-images">

          <span title={ !hideRefreshButton ? "You will play with this image" : "" }>{constants.you}:</span>

          <img  title={ !hideRefreshButton ? "You will play with this image" : "" } 
                src={`./images/${folder}/${imageUser}.jpg`} 
                alt="user" />

          <span title={ !hideRefreshButton ? "The computer will play with this image" : "" }>{constants.opponent}:</span>

          <img  title={ !hideRefreshButton ? "The computer will play with this image" : "" }
                src={`./images/${folder}/${imageComputer}.jpg`}
                alt="computer"/>

          { !hideRefreshButton && ( <button onClick={refresh} title="Click to refresh the two images">{constants.refresh}</button> )}

        </div>
  )
}

export default Images;