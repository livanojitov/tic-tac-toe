import React, { useContext, useState } from 'react';
import { HistoryContext }              from '../contexts/HistoryContext';
import { LanguageContext }             from '../contexts/LanguageContext';
import {COMPUTER, USER}                from './Constants';
import { DictionaryContext }           from '../contexts/DictionaryContext';

const Images = ({folder, count, imageUser:imageUser1, imageComputer:imageComputer1, onImageChange}) => {
  const { getLanguage } = useContext(LanguageContext);
  const language = getLanguage();  
  const { history } = useContext(HistoryContext);
  const { DICTIONARY } = useContext(DictionaryContext);
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

        <div className='user-image'>

          <span>{DICTIONARY && DICTIONARY[language].YOU}: </span>

          <img className="imageToken" 
               src={`./images/${folder}/${imageUser}.jpg`} 
               alt="user" 
               title={ !history ? DICTIONARY && DICTIONARY[language].USER_IMAGE_TOOLTIP : "" }/>
          
          { !history && ( 
            <img className='refresh' 
                 src={`./images/refresh.png`} 
                 alt="refresh" 
                 onClick={()=>refreshUser(USER)}
                 title={DICTIONARY && DICTIONARY[language].REFRESH_TOOLTIP} />)}
        </div> 
        
        <div className='computer-image'>

          <span>{DICTIONARY && DICTIONARY[language].OPPONENT}: </span>

          <img className="imageToken"
               src={`./images/${folder}/${imageComputer}.jpg`}
               alt="computer"
               title={ !history ? DICTIONARY && DICTIONARY[language].COMPUTER_IMAGE_TOOLTIP : "" }/>

          { !history && ( 
            <img className='refresh'
                 src={`./images/refresh.png`} 
                 alt="refresh" 
                 onClick={()=>refreshComputer(COMPUTER)}
                 title={DICTIONARY && DICTIONARY[language].REFRESH_TOOLTIP} />)}

        </div>
        
      </div>
  )
  
}

export default Images;