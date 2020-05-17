import React, { useContext, useState } from 'react';
import { CategoryContext }  from '../contexts/CategoryContext';
import { HistoryContext }   from '../contexts/HistoryContext';
import { LanguageContext }  from '../contexts/LanguageContext';
import {COMPUTER, USER}     from './Dictionary';
import DICTIONARY           from './Dictionary';

const Images = ({categoryId, imageUser:imageUser1, imageComputer:imageComputer1, onImageChange}) => {
  const { getLanguage } = useContext(LanguageContext);
  const language = getLanguage();  
  const { history } = useContext(HistoryContext);
  const { categories } = useContext(CategoryContext);
  const { folder } = categories[categoryId];
  const [ imageUser, setImageUser ] = useState(imageUser1?imageUser1:0);  
  const [ imageComputer, setImageComputer ] = useState(imageComputer1?imageComputer1:1);
  
  const randomizeImage = (categoryId, who) => {
    const length = categories[categoryId].count;
    let imageWho, imageOpponent;
  
    imageOpponent = (who === USER) ? imageComputer : imageUser;
    imageWho = Math.floor(Math.random() * length);
    while ( imageWho === imageOpponent){
      imageWho = Math.floor(Math.random() * length);
    }
    return imageWho;
  }
  
  const refresh = (who) => {
    let imageWho = randomizeImage(categoryId, who);
    if (who === USER){
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

        <div className='user-image' title={ !history ? DICTIONARY[language].USER_IMAGE_TOOLTIP : "" }>
          <span>{DICTIONARY[language].YOU}: </span>
          <img src={`./images/${folder}/${imageUser}.jpg`} alt="user" />
          { !history && ( <button  className='refresh' onClick={() => refresh(USER)} title={DICTIONARY[language].REFRESH_TOOLTIP}>{DICTIONARY[language].REFRESH}</button> )}
        </div> 

        <div className='computer-image' title={ !history ? DICTIONARY[language].COMPUTER_IMAGE_TOOLTIP : "" }>
          <span>{DICTIONARY[language].OPPONENT}: </span>
          <img src={`./images/${folder}/${imageComputer}.jpg`} alt="computer"/>
          { !history && ( <button className='refresh' onClick={() => refresh(COMPUTER)}  title={DICTIONARY[language].REFRESH_TOOLTIP}>{DICTIONARY[language].REFRESH}</button> )}
        </div>
        
      </div>
  )
  
}

export default Images;