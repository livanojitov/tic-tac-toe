import React from 'react';
import * as constants from './Constants';
const { YOU, OPPONENT, REFRESH, USER_IMAGE_TOOLTIP, COMPUTER_IMAGE_TOOLTIP, REFRESH_TOOLTIP} = constants;

const Images = ({imageUser, imageComputer, folder, hideRefreshButton, refresh }) => {
  return (
        <div className="random-images">

          <div className='user-image' title={ !hideRefreshButton ? USER_IMAGE_TOOLTIP : "" }>
            <span>{YOU}: </span>
            <img src={`./images/${folder}/${imageUser}.jpg`} alt="user" />
          </div> 

          <div className='computer-image' title={ !hideRefreshButton ? COMPUTER_IMAGE_TOOLTIP : "" }>
            <span>{OPPONENT}: </span>
            <img src={`./images/${folder}/${imageComputer}.jpg`} alt="computer"/>
          </div>
          
          { !hideRefreshButton && ( <button onClick={refresh} title={REFRESH_TOOLTIP}>{REFRESH}</button> )}

        </div>
  )
}

export default Images;