import { NavLink }         from 'react-router-dom';
import React, { useState } from 'react';
//import Logo                from '../../public/images/logo.jpg';

const Navigation = () => {

  const [nav] = useState([
    { name: 'Home',    to: '/'        },
    { name: 'History', to: '/history' },
    { name: 'About',   to: '/about'    },
    { name: 'Contact', to: '/contact'  }
  ]);

  return (
    <div className="nav">
      <img src={'./images/logo.jpg'} alt="Logo"/>
      <ul>
        <li><NavLink exact to={nav[0].to}>{nav[0].name}</NavLink></li>   
        <li><NavLink exact to={nav[1].to}>{nav[1].name}</NavLink></li>     
        <li><NavLink exact to={nav[2].to}>{nav[2].name}</NavLink></li>  
        <li><NavLink exact to={nav[3].to}>{nav[3].name}</NavLink></li>                   
      </ul>
    </div>
  )
}

export default Navigation;