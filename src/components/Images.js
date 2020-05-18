import React, { useContext, useState } from 'react';
import { HistoryContext }              from '../contexts/HistoryContext';
import { LanguageContext }             from '../contexts/LanguageContext';
import {COMPUTER, USER}                from './Dictionary';
import DICTIONARY                      from './Dictionary';

const Images = ({folder, count, imageUser:imageUser1, imageComputer:imageComputer1, onImageChange}) => {
  const { getLanguage } = useContext(LanguageContext);
  const language = getLanguage();  
  const { history } = useContext(HistoryContext);
  const [ imageUser, setImageUser ] = useState(imageUser1);  
  const [ imageComputer, setImageComputer ] = useState(imageComputer1);
  
  const randomImage = () => {
    let image = Math.floor(Math.random() * count);
    while ( image === imageComputer || image === imageUser ){
      image = Math.floor(Math.random() * count);
    }
    return image;
  }
  
  const refreshUser = () => {
    let image = randomImage();
    setImageUser(image);
    onImageChange({
      imageUser : image
    });
  }

  const refreshComputer = () => {
    let image = randomImage();  
    setImageComputer(image);
    onImageChange({
      imageComputer : image
    });
  }

  return (
      <div className={ history ? "images history" : "images"}>

        <div className='user-image' title={ !history ? DICTIONARY[language].USER_IMAGE_TOOLTIP : "" }>

          <span>{DICTIONARY[language].YOU}: </span>

          <img src={`./images/${folder}/${imageUser}.jpg`} alt="user" />

          { !history && ( <button  className='refresh' 
                                   onClick={() => refreshUser(USER)} 
                                   title={DICTIONARY[language].REFRESH_TOOLTIP}>
                                   {DICTIONARY[language].REFRESH}
                          </button> )}
        </div> 

        <div className='computer-image' title={ !history ? DICTIONARY[language].COMPUTER_IMAGE_TOOLTIP : "" }>

          <span>{DICTIONARY[language].OPPONENT}: </span>

          <img src={`./images/${folder}/${imageComputer}.jpg`} alt="computer"/>

          { !history && ( <button className='refresh' 
                                  onClick={() => refreshComputer(COMPUTER)}  
                                  title={DICTIONARY[language].REFRESH_TOOLTIP}>
                                  {DICTIONARY[language].REFRESH}
                          </button> )}
        </div>
        
      </div>
  )
  
}

export default Images;