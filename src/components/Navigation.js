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
      <ul>
        {lis}                  
      </ul>
    </nav>
  )
}

export default Navigation;