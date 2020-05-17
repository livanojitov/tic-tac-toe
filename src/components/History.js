import React, { useContext } from 'react';
import { GameContext }       from '../contexts/GameContext';
import { LanguageContext }   from '../contexts/LanguageContext';
import GamesHistory          from './GamesHistory';
import DICTIONARY            from './Dictionary';

const History = () => {
  const { getLanguage } = useContext(LanguageContext);
  const language = getLanguage();

  const { games } = useContext(GameContext);
  let historyGames;

  if (games && games.length > 0){
    historyGames = games.map((game) => {  
      return (<GamesHistory 
                key            = {game.id}
                imageUser      = {game.imageUser}
                imageComputer  = {game.imageComputer}
                categoryId     = {game.categoryId}
                id             = {game.id}
                first          = {game.first}
                level          = {game.level}
                result         = {game.result}
              />
        )
    });
  }else{
    historyGames = (
      <div className="info"> 
        {DICTIONARY[language].NO_HISTORY_YET}
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