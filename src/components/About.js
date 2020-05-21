import React, { useState, useContext, useEffect } from 'react';
import { LanguageContext }   from '../contexts/LanguageContext';
import { HistoryContext }    from '../contexts/HistoryContext';
import { DictionaryContext } from '../contexts/DictionaryContext';

const About = (props) => {
  const { getLanguage } = useContext(LanguageContext);
  const language = getLanguage();
  const { changeHistory } = useContext(HistoryContext);
  const { DICTIONARY } = useContext(DictionaryContext);
  
  const [skills] = useState([
    { name: 'React.js',       url: 'https://reactjs.org/'                                                  },
    { name: 'React Hooks',    url: 'https://reactjs.org/docs/hooks-intro.html'                             },
    { name: 'Context API',    url: 'https://reactjs.org/docs/context.html'                                 },
    { name: 'Local Storage',  url: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage'  },    
    { name: 'Javascript',     url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'               },
    { name: 'ES6',            url: 'http://es6-features.org'                                               },
    { name: 'HTML5',          url: 'https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5'         },
    { name: 'CSS3',           url: 'https://www.w3.org/TR/selectors-3/'                                    }
  ]);
   
  const lis = skills.map((skill, key) => {
    return (
      <li key={key}><a target="_blank" href={skill.url} rel="noopener noreferrer">{skill.name}</a></li>
    )
  });

  const [source] = useState('https://github.com/lojito/tic-tac-toe');
  const [games]  = useState(
    { 
      name: 'Matching pairs ( built with Vue.js )', 
      url: 'https://lojito.github.io/matching-pairs'
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

    <div className="about">

      <div>
        <span>{DICTIONARY && DICTIONARY[language].GAME_WRITTEN_WITH} </span>
        <ul>
          {lis}
        </ul>  
      </div> 

      <p>
          <span>{DICTIONARY &&  DICTIONARY[language].SOURCE_CODE} </span>
          <a target="_blank" href={source} rel="noopener noreferrer">{source}</a>
      </p>
      
      <span>{DICTIONARY &&  DICTIONARY[language].OTHER_GAMES} </span>            
      <ul>
        <li>
          <a target="_blank" href={games.url} rel="noopener noreferrer">{games.name}</a>
        </li>
      </ul>    
                  
    </div>

  )
} 

export default About;
