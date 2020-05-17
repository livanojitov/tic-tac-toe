import React, { useState, useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import DICTIONARY from './Dictionary';

const Contact = () => {
  const { getLanguage } = useContext(LanguageContext);
  const language = getLanguage();

  const [contact] = useState({
    author:   'Livan Ojito Villanueva',
    email :   'livanojito@gmail.com',
    github:   'https://github.com/lojito',
    linkedin: 'https://ca.linkedin.com/in/livan-ojito-villanueva'
  });

  return (
    <div className="contact">
      <p>
          <span>{DICTIONARY[language].AUTHOR} </span><span className="me">{contact.author}</span>
      </p>
      <p>
          <span>{DICTIONARY[language].EMAIL} </span><span className="me">{contact.email}</span>
      </p>                  
      <p>
          <span>{DICTIONARY[language].GITHUB} </span>
          <a target="_blank" href={contact.github} rel="noopener noreferrer">{contact.github}</a>
      </p>        
      <p>
          <span>{DICTIONARY[language].LINKEDIN} </span>
          <a target="_blank" href={contact.linkedin} rel="noopener noreferrer">{contact.linkedin}</a>
      </p>    
      <p>
          <span>{DICTIONARY[language].HIRE_ME} </span>
      </p>                  
    </div>
  )
} 

export default Contact;