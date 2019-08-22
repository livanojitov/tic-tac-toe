import { NavLink }         from 'react-router-dom';
import React, { useState } from 'react';

const Navigation = () => {

  const [routes] = useState([
    { name: 'Home',    url: '/'        },
    { name: 'History', url: '/history' },
    { name: 'About',   url: '/about'   },
    { name: 'Contact', url: '/contact' }
  ]);

  const lis = routes.map((route, key) => {
    return  (
      <li key={key}><NavLink exact to={route.url}>{route.name}</NavLink></li>
    )  
  });

  return (
    <nav>
      <img src={'./images/logo.jpg'} alt="Logo"/>
      <ul>
        {lis}                  
      </ul>
    </nav>
  )
}

export default Navigation;