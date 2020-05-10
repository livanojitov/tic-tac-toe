import React, { useContext, useState } from 'react';
import { CategoryContext }   from '../contexts/CategoryContext';
import { HistoryContext } from '../contexts/HistoryContext';
import * as constants from './Constants';

const {USER, COMPUTER, YOU, OPPONENT, REFRESH, USER_IMAGE_TOOLTIP, COMPUTER_IMAGE_TOOLTIP, REFRESH_TOOLTIP} = constants;

const Images = ({categoryId, imageUser:imageUser1, imageComputer:imageComputer1, onImageChange}) => {
  const { history } = useContext(HistoryContext);
  const { categories } = useContext(CategoryContext);
  const { folder } = categories[categoryId];
  const [ imageUser, setImageUser ] = useState(imageUser1?imageUser1:0);  
  const [ imageComputer, setImageComputer ] = useState(imageComputer1?imageComputer1:1);
  
  const randomizeImage = (categoryId, who) => {
    const length = categories[categoryId].count;
    let imageWho, imageOpponent;
  
    imageOpponent = (who === constants.USER) ? imageComputer : imageUser;
    imageWho = Math.floor(Math.random() * length);
    while ( imageWho === imageOpponent){
      imageWho = Math.floor(Math.random() * length);
    }
    return imageWho;
  }
  
  const refresh = (who) => {
    let imageWho = randomizeImage(categoryId, who);
    if (who === constants.USER){
      setImageUser(imageWho);
      if (onImageChange){
        onImageChange({
          imageUser : imageWho,
          imageComputer
        });
      }      
    }else {
      setImageComputer(imageWho);
      if (onImageChange){
        onImageChange({
          imageUser,
          imageComputer : imageWho
        });
      }      
    }

  }

  return (
      <div className={ history ? "images history" : "images"}>

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