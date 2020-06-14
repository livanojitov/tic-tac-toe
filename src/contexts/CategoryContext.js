import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios'

export const CategoryContext = createContext();

const CategoryContextProvider = (props) => {
  const [CATEGORIES, setCategory] = useState('');

  useEffect(() => {
    if (CATEGORIES === ''){
      axios.get('categories.json')
        .then(res => {
          setCategory(res.data);
        })
    }
  });

  return (
    <CategoryContext.Provider value={{ CATEGORIES }}>
      {props.children}
    </CategoryContext.Provider>
  );

}
 
export default CategoryContextProvider;