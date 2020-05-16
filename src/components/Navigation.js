import { NavLink }         from 'react-router-dom';
import React, { useState } from 'react';
import * as constants      from './Constants';
const { HOME, HISTORY, ABOUT, CONTACT } = constants;

const Navigation = () => {

  const [routes] = useState([
    { name: HOME,    url: '/'        },
    { name: HISTORY, url: '/history' },
    { name: ABOUT,   url: '/about'   },
    { name: CONTACT, url: '/contact' }
  ]);

  const lis = routes.map((route, key) => {
    return  (
      <li key={key}><NavLink exact to={route.url}>{route.name}</NavLink></li>
    )  
  });

  return (
    <nav>
      <input type="checkbox" id="menu" />
      <label className="mylabel" htmlFor="menu">
        <div id="burger-container">
            <div id="burger">
              <span>&nbsp;</span>
              <span>&nbsp;</span>
              <span>&nbsp;</span>
            </div>
          </div>
      </label>      
      <ul className='nav'>
        {lis}                  
      </ul>
    </nav>
  )
}

export default Navigation;