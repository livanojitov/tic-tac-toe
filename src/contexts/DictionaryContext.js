import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'

export const DictionaryContext = createContext();

const DictionaryContextProvider = (props) => {
  const [DICTIONARY, setDictionary] = useState('');

  useEffect(() => {
    if (DICTIONARY.length === 0){
      axios.get('dictionary.json')
        .then(res => {
          setDictionary(res.data);
        })
    }
  });

  return (
    <DictionaryContext.Provider value={{ DICTIONARY }}>
      {props.children}
    </DictionaryContext.Provider>
  );

}
 
export default DictionaryContextProvider;