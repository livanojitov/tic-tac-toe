import React, { createContext } from "react";
import useFetchData from "../hooks/useFetchData";

export const CategoryContext = createContext();

const CategoryContextProvider = ({ children }) => {
  let { data: categories, error } = useFetchData("categories");

  if (error) {
    return (
      <div className="error" data-testid="error">
        {error}
      </div>
    );
  }

  return (
    <CategoryContext.Provider value={{ categories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
