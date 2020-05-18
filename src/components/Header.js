import React, { useContext} from 'react';
import { LanguageContext }  from '../contexts/LanguageContext';

const Header = () => { 
  const { setLanguage } = useContext(LanguageContext);
  return (
    <header>
      <div className="flags">
        <img src={'./images/flags/usa.jpg'}    onClick={() => { setLanguage(0); }} alt="Usa"/>
        <img src={'./images/flags/france.jpg'} onClick={() => { setLanguage(1); }} alt="France"/>
        <img src={'./images/flags/spain.jpg'}  onClick={() => { setLanguage(2); }} alt="Spain"/>      
      </div>
    </header>
  )
}

export default Header;