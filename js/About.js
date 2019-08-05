const About = () => {

  const [about] = useState([
    { name: 'React.js',                                   href:'https://reactjs.org/'                                                },
    { name: 'Javascript',                                 href:'https://developer.mozilla.org/en-US/docs/Web/JavaScript'             },
    { name: 'ES6',                                        href:'http://es6-features.org'                                             },
    { name: 'Html',                                       href:'https://developer.mozilla.org/en-US/docs/Learn/HTML'                 },
    { name: 'Css',                                        href:'https://developer.mozilla.org/en-US/docs/Web/CSS'                    },
    { name: 'Local Storage',                              href:'https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage'},
    { name: 'https://github.com/livanojitov/tic-tac-toe', href:'https://github.com/livanojitov/tic-tac-toe'                          },
    { name: 'Matching pairs ( built with Vue.js )',       href:'https://livanojitov.github.io/matching-pairs'                        }
  ]);

  return (

    <div className="about">

      <div>

        <span>This game is written with: </span>
        <ul>
          <li><a target="_blank" href={about[0].href}>{about[0].name}</a></li>
          <li><a target="_blank" href={about[1].href}>{about[1].name}</a></li>
          <li><a target="_blank" href={about[2].href}>{about[2].name}</a></li>
          <li><a target="_blank" href={about[3].href}>{about[3].name}</a></li>
          <li><a target="_blank" href={about[4].href}>{about[4].name}</a></li>
          <li><a target="_blank" href={about[5].href}>{about[5].name}</a></li>  
        </ul>  
      </div> 

      <p>
          <span>Source Code: </span>
          <a target="_blank" href={about[6].href}>{about[6].name}</a>
      </p>
      
      <span>Other games: </span>            
      <ul>
        <li>
          <a target="_blank" href={about[7].href}>{about[7].name}</a>
        </li>
      </ul>    
                   
    </div>

  )
} 