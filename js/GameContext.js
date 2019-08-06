const { useState, createContext, useEffect } = React;
const GameContext = createContext();

const GameContextProvider = (props) => {

  const [games, setGames] = useState([]);

  useEffect(() => {
    if (typeof(Storage) !== "undefined") {
      if (games.length){
        localStorage.tictactoe = JSON.stringify(games);
      }else{
        if (GameContextProvider.delete == 1){
          GameContextProvider.delete = 0;
          localStorage.tictactoe = JSON.stringify(games);
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
      setGames(games.filter(game => game.id != id));   
    } 
  }

  const getGame = (id) => {
    if (games.length > 0){
      return games.filter((game) => game.id == id)[0];
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
 
