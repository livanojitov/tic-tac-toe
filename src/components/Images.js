import React, { useContext} from 'react';
import { HistoryContext } from '../contexts/HistoryContext';
import * as constants from './Constants';

const {USER, COMPUTER, YOU, OPPONENT, REFRESH, USER_IMAGE_TOOLTIP, COMPUTER_IMAGE_TOOLTIP, REFRESH_TOOLTIP} = constants;

const Images = ({imageUser, imageComputer, folder, refresh }) => {
  const { history } = useContext(HistoryContext);

  return (
      <div className={ history ? "random-images history" : "random-images"}>

        <div className='user-image' title={ !history ? USER_IMAGE_TOOLTIP : "" }>
          <span>{YOU}: </span>
          <img src={`./images/${folder}/${imageUser}.jpg`} alt="user" />
          { !history && ( <button  className='refresh' onClick={() => refresh(USER)} title={REFRESH_TOOLTIP}>{REFRESH}</button> )}
        </div> 

        <div className='computer-image' title={ !history ? COMPUTER_IMAGE_TOOLTIP : "" }>
          <span>{OPPONENT}: </span>
          <img src={`./images/${folder}/${imageComputer}.jpg`} alt="computer"/>
          { !history && ( <button className='refresh' onClick={() => refresh(COMPUTER)}  title={REFRESH_TOOLTIP}>{REFRESH}</button> )}
        </div>
        
      </div>
  )
}

export default Images;