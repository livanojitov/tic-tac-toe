const About = () => {

  const [skills] = useState([
    { name: 'React.js',       href: 'https://reactjs.org/'                                                  },
    { name: 'React Hooks',    href: 'https://reactjs.org/docs/hooks-intro.html'                             },
    { name: 'Context API',    href: 'https://reactjs.org/docs/context.html'                                 },
    { name: 'Local Storage',  href: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage'  },    
    { name: 'Javascript',     href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'               },
    { name: 'ES6',            href: 'http://es6-features.org'                                               },
    { name: 'HTML',           href: 'https://developer.mozilla.org/en-US/docs/Learn/HTML'                   },
    { name: 'CSS',            href: 'https://developer.mozilla.org/en-US/docs/Web/CSS'                      }
  ]);
   
  const lis = skills.map((skill, key) => {
    return (
      <li key={key}><a target="_blank" href={skill.href}>{skill.name}</a></li>
    )
  });

  const [source] = useState('https://github.com/livanojitov/tic-tac-toe');
  const [games]  = useState({ name: 'Matching pairs ( built with Vue.js )', href: 'https://livanojitov.github.io/matching-pairs'});

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
          <a target="_blank" href={source}>{source}</a>
      </p>
      
      <span>Other games: </span>            
      <ul>
        <li>
          <a target="_blank" href={games.href}>{games.name}</a>
        </li>
      </ul>    
                   
    </div>

  )
} 
