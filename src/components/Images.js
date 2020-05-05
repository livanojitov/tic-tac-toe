import React from 'react';

const Images = ({imageUser, imageComputer, folder, hideRefreshButton, refresh }) => {
  return (
        <div className="random-images">

          <span title="You will play with this image">You:</span>

          <img  title="You will play with this image" 
                src={`./images/${folder}/${imageUser}.jpg`} 
                alt="user" />

          <span title="The computer will play with this image">Computer:</span>

          <img  title="The computer will play with this image" 
                src={`./images/${folder}/${imageComputer}.jpg`}
                alt="computer"/>

          { !hideRefreshButton && ( <button onClick={refresh} title="Click to refresh the two images">Refresh</button> )}

        </div>
  )
}

export default Images;