import React, { useState, createContext, useEffect } from 'react';
export const GameContext = createContext();

const GameContextProvider = (props) => {

  const [games, setGames] = useState([]);

  useEffect(() => {
    if (typeof(Storage) !== "undefined") {
      if (games.length){
        localStorage.tictactoe = JSON.stringify(games);
      }else{
        if (GameContextProvider.delete === 1){
          GameContextProvider.delete = 0;
          localStorage.removeItem('tictactoe');
        }else{
          if (localStorage.tictactoe){
            setGames(JSON.parse(localStorage.tictactoe));
          }
        }
      }
    }
  },[games]);

  const addGame = (game) => {
    game.id = Math.floor(Math.random() * 10000);
    setGames([...games, game]);
  };

  const removeGame = (id) => {
    if (games.length > 0){
      GameContextProvider.delete = 1;
      setGames(games.filter(game => game.id !== id));   
    } 
  }

  const getGame = (id) => {
    id = id * 1;
    if (games.length > 0){
      return games.filter((game) => game.id === id)[0];
    }else{
      return false;
    }    
  }

  return (
    <GameContext.Provider value={{ games, addGame, removeGame, getGame }}>
      {props.children}
    </GameContext.Provider>
  );

}
 
export default GameContextProvider;