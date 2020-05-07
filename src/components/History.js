import React, { useContext } from 'react';
import { GameContext }       from '../contexts/GameContext';
import GamesHistory          from './GamesHistory';
import * as constants from './Constants';
const { NO_HISTORY_YET} = constants;

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
                first          = {game.first}
                level          = {game.level}
              />
        )
    });
  }else{
    historyGames = (
      <div className="info"> 
        {NO_HISTORY_YET}
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