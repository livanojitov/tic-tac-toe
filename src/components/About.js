import React, { useState } from 'react';

const About = () => {

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

  const [source] = useState('https://github.com/livanojitov/tic-tac-toe');
  const [games]  = useState(
    { 
      name: 'Matching pairs ( built with Vue.js )', 
      url: 'https://lojito.github.io/matching-pairs'
    });

  return (

    <div className="about">

      <div>
        <span>This game is written with: </span>
        <ul>
          {lis}
        </ul>  
      </div> 

      <p>
          <span>Source Code: </span>
          <a target="_blank" href={source} rel="noopener noreferrer">{source}</a>
      </p>
      
      <span>Other games: </span>            
      <ul>
        <li>
          <a target="_blank" href={games.url} rel="noopener noreferrer">{games.name}</a>
        </li>
      </ul>    
                  
    </div>

  )
} 

export default About;
