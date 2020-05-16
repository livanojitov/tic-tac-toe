import React, { createContext, useState } from 'react';

export const CategoryContext = createContext();

const CategoryContextProvider = (props) => {

  const [categories] = useState([
    { name: "La Habana"          , folder: "habana"   , count : 20} ,
    { name: "Vancouver landmarks", folder: "vancouver", count : 20} , 
    { name: "Soccer players"     , folder: "soccer"   , count : 20} , 
    { name: "Fruits & Vegetables", folder: "fruits"   , count : 20} ,
    { name: "Animals"            , folder: "animals"  , count : 20} , 
    { name: "Alphabet"           , folder: "alphabet" , count : 26} , 
    { name: "Puppies"            , folder: "puppies"  , count : 20} , 
    { name: "Seinfeld"           , folder: "seinfeld" , count : 20} ,
    { name: "Spain"              , folder: "spain"    , count : 20}
  ]);

  return (
    <CategoryContext.Provider value={{ categories }}>
      {props.children}
    </CategoryContext.Provider>
  );

}
 
export default CategoryContextProvider;