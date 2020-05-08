import React, { createContext, useState } from 'react';

export const HistoryContext = createContext();

const HistoryContextProvider = (props) => {

  const [history, setHistory] = useState(0);

  const changeHistory = (history) => {
    setHistory(history);
  }

  return (
    <HistoryContext.Provider value={{ history, changeHistory }}>
      {props.children}
    </HistoryContext.Provider>
  );

}
 
export default HistoryContextProvider;