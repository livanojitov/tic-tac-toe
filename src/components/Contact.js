import React, { useState, useContext, useEffect } from 'react';
import { LanguageContext }   from '../contexts/LanguageContext';
import { HistoryContext }    from '../contexts/HistoryContext';
import { DictionaryContext } from '../contexts/DictionaryContext';

const Contact = (props) => {
  const { getLanguage } = useContext(LanguageContext);
  const language = getLanguage();
  const { changeHistory } = useContext(HistoryContext);
  const { DICTIONARY } = useContext(DictionaryContext);

  const [contact] = useState({
    author:   'Livan Ojito Villanueva',
    email :   'livanojito@gmail.com',
    github:   'https://github.com/lojito',
    linkedin: 'https://ca.linkedin.com/in/lov'
  });

  useEffect(() => {
    return () => {
      if (props.history.location.pathname === '/history'){
        changeHistory(1);
      }else{
        changeHistory(0);
      }  
    }
  })

  return (
    <div className="contact">
      <p>
          <span>{DICTIONARY && DICTIONARY[language].AUTHOR} </span><span className="me">{contact.author}</span>
      </p>
      <p>
          <span>{DICTIONARY && DICTIONARY[language].EMAIL} </span><span className="me">{contact.email}</span>
      </p>                  
      <p>
          <span>{DICTIONARY && DICTIONARY[language].GITHUB} </span>
          <a target="_blank" href={contact.github} rel="noopener noreferrer">{contact.github}</a>
      </p>        
      <p>
          <span>{DICTIONARY && DICTIONARY[language].LINKEDIN} </span>
          <a target="_blank" href={contact.linkedin} rel="noopener noreferrer">{contact.linkedin}</a>
      </p>    
      <p>
          <span>{DICTIONARY && DICTIONARY[language].AVAILABILITY} </span>
          <span className="availability">{DICTIONARY && DICTIONARY[language].AVAILABILITY_STATUS} </span>
      </p>                  
    </div>
  )
} 

export default Contact;