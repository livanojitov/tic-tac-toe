import React, { createContext, useState } from 'react';

export const LanguageContext = createContext();

const LanguageContextProvider = (props) => {

  const [language, changeLanguage] = useState(0);

  const setLanguage = (language) => {
    changeLanguage(language);
  }

  const getLanguage = () => {
    return language;
  }

  return (
    <LanguageContext.Provider value={{ getLanguage, setLanguage }}>
      {props.children}
    </LanguageContext.Provider>
  );

}
 
export default LanguageContextProvider;