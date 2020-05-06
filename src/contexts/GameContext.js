import React, { useReducer, createContext, useEffect } from 'react';
import { gameReducer } from '../reducers/gameReducer';

export const GameContext = createContext();

const GameContextProvider = (props) => {

  const [games, dispatch] = useReducer(gameReducer,[], () => {
    if (typeof(Storage) !== "undefined") {
      const games = localStorage.getItem('tictactoe');
      return games ? JSON.parse(games) : [];
    }      
  });

  useEffect(() => {
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem('tictactoe', JSON.stringify(games));
      }
  },[games]);

  const getGame = (id) => {
    if (games.length > 0){
      id = id * 1;
      return games.filter((game) => game.id === id)[0];
    }else{
      return false;
    }    
  }

  return (
    <GameContext.Provider value={{ games, dispatch, getGame }}>
      {props.children}
    </GameContext.Provider>
  );

}
 
export default GameContextProvider;