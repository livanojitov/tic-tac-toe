import React, { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
export const GameDBContext = createContext();

const GameDBContextProvider = ({ children }) => {
  const { games, dispatch } = useLocalStorage("tictactoe", []);

  const getGame = (id) => {
    if (games.length > 0) {
      return games.filter((game) => game.id === id)[0];
    } else {
      return false;
    }
  };

  return (
    <GameDBContext.Provider value={{ games, dispatch, getGame }}>
      {children}
    </GameDBContext.Provider>
  );
};

export default GameDBContextProvider;
