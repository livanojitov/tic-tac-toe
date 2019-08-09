import React, { useContext } from 'react';
import { GameContext }       from './GameContext';
import GamesHistory          from './GamesHistory';

const History = () => {
  const { games } = useContext(GameContext);
  let historyGames;

  if (games && games.length > 0){
    historyGames = games.map((game) => {  
      return (<GamesHistory 
                key            = {game.id} 
                message        = {game.message}
                imageUser      = {game.imageUser}
                imageComputer  = {game.imageComputer} 
                category       = {game.category}
                id             = {game.id}
                whoStarted     = {game.whoStarted}
              />
        )
    });
  }else{
    historyGames = (
      <div className="info"> 
        No history yet. Play some games and comeback
      </div>  
    )    
  }  
  return (
    <div className="history">
        {historyGames}
    </div> 
  )    
}

export default History;