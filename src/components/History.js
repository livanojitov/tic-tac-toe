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
                categoryId     = {game.categoryId}
                id             = {game.id}
                whoStarted     = {game.whoStarted}
                level          = {game.level}
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