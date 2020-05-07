import React, { useState } from 'react';
import * as constants from './Constants';
const { AUTHOR, EMAIL, GITHUB, LINKEDIN, HIRE_ME } = constants;

const Contact = () => {

  const [contact] = useState({
    author:   'Livan Ojito Villanueva',
    email :   'livanojito@gmail.com',
    github:   'https://github.com/lojito',
    linkedin: 'https://ca.linkedin.com/in/livan-ojito-villanueva'
  });

  return (
    <div className="contact">
      <p>
          <span>{AUTHOR} </span><span className="me">{contact.author}</span>
      </p>
      <p>
          <span>{EMAIL} </span><span className="me">{contact.email}</span>
      </p>                  
      <p>
          <span>{GITHUB} </span>
          <a target="_blank" href={contact.github} rel="noopener noreferrer">{contact.github}</a>
      </p>        
      <p>
          <span>{LINKEDIN} </span>
          <a target="_blank" href={contact.linkedin} rel="noopener noreferrer">{contact.linkedin}</a>
      </p>    
      <p>
          <span>{HIRE_ME} </span>
      </p>                  
    </div>
  )
} 

export default Contact;