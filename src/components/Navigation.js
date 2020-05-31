import { NavLink }            from 'react-router-dom';
import React, { useContext }  from 'react';
import { LanguageContext }    from '../contexts/LanguageContext';
import { DictionaryContext }  from '../contexts/DictionaryContext';

const Navigation = () => {
  const { getLanguage } = useContext(LanguageContext);
  const language = getLanguage();
  const { DICTIONARY } = useContext(DictionaryContext);

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
        <li key='0'><NavLink exact to={'/'}       >{DICTIONARY && DICTIONARY[language].GAME}   </NavLink></li>
        <li key='1'><NavLink exact to={'/history'}>{DICTIONARY && DICTIONARY[language].HISTORY}</NavLink></li>
        <li key='2'><NavLink exact to={'/catalog'}>{DICTIONARY && DICTIONARY[language].CATALOG}</NavLink></li>        
        <li key='3'><NavLink exact to={'/about'}  >{DICTIONARY && DICTIONARY[language].ABOUT}  </NavLink></li>
        <li key='4'><NavLink exact to={'/contact'}>{DICTIONARY && DICTIONARY[language].CONTACT}</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navigation;