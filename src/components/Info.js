import React, { useContext}  from 'react';
import { LanguageContext }   from '../contexts/LanguageContext';
import { HistoryContext }    from '../contexts/HistoryContext';
import { DictionaryContext } from '../contexts/DictionaryContext';
import * as constants        from './Constants';
const { LOST, WON } = constants;

const Info = (props) => {
  const { getLanguage } = useContext(LanguageContext);
  const language = getLanguage();
  const { history } = useContext(HistoryContext);
  const { DICTIONARY } = useContext(DictionaryContext);  
  let message, result;

  result = props.result;
  if (result === LOST){
    message = DICTIONARY && DICTIONARY[language].MESSAGE_LOST;
  }else if (result === WON){
    message = DICTIONARY && DICTIONARY[language].MESSAGE_WON;
  }else{
    message = DICTIONARY && DICTIONARY[language].MESSAGE_DRAW;
  }

  if (!history ){
    return (
      <span>{DICTIONARY && DICTIONARY[language].GAME_OVER}: {message}</span>
    )
  }else{
    return (
         <span>{message}</span>
    )
  }    
  
}

export default Info