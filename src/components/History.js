import React, { useContext, useEffect } from 'react';
import { GameContext }       from '../contexts/GameContext';
import { LanguageContext }   from '../contexts/LanguageContext';
import { HistoryContext }    from '../contexts/HistoryContext';
import GamesHistory          from './GamesHistory';
import { DictionaryContext } from '../contexts/DictionaryContext';

const History = (props) => {
  const { getLanguage } = useContext(LanguageContext);
  const language = getLanguage();
  const { changeHistory } = useContext(HistoryContext);
  const { DICTIONARY } = useContext(DictionaryContext);

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
        {DICTIONARY && DICTIONARY[language].NO_HISTORY_YET}
      </div>  
    )    
  }

  useEffect(() => {
    return () => {
      const pathname = props.history.location.pathname;
      if (( pathname !== '/history') && ('0123456789'.indexOf(pathname[1]) === -1 )) {
        changeHistory(0);
      }
    }
  })

  return (
    <div className="history">
        {historyGames}
    </div> 
  )    
}

export default History;