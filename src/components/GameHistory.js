import React, { useContext, useState, useEffect } from 'react';
import { GameContext }                            from '../contexts/GameContext';
import { LanguageContext }                        from '../contexts/LanguageContext';
import { HistoryContext }                         from '../contexts/HistoryContext';
import Category                                   from './Category';
import Images                                     from './Images';
import StartGame                                  from './StartGame';
import Level                                      from './Level';
import BoardUI                                    from './BoardUI';
import Info                                       from './Info';
import { DictionaryContext }                      from '../contexts/DictionaryContext';

const GameHistory = (props) => {
  const { getGame, dispatch } = useContext(GameContext);
  const { getLanguage } = useContext(LanguageContext);
  const language = getLanguage();  
  const { changeHistory } = useContext(HistoryContext);
  const { DICTIONARY } = useContext(DictionaryContext);
  const gameId = props.match.params.id;

  let categoryId, imageComputer, imageUser, first, level, board, winners, result;
  let game = {};

  game = getGame(gameId);
  if (game){
    ({categoryId, imageComputer, imageUser, first, level, board, winners, result } = game);
  }

  const [ folder, setFolder ] = useState(""); 
  const updateFolder = (category) => {
    setFolder(category.folder);
  };

  useEffect(() => {
    return () => {
      const pathname = props.history.location.pathname;
      if (( pathname !== '/history') && ('0123456789'.indexOf(pathname[1]) === -1 )) {
        changeHistory(0);
      }
    }
  })

  return (
    <div>
      { game && (
      <div className="game-history">

          <Category categoryId = {categoryId} onCategoryChange = {updateFolder}/>

          <Images categoryId={categoryId} imageUser={imageUser} imageComputer={imageComputer} folder={folder}/>

          <div className="settings">
            <StartGame first = {first} /> 
            <Level     level = {level} />
          </div>

          <BoardUI categoryId     = {categoryId}
                   imageUser      = {imageUser}
                   imageComputer  = {imageComputer}                   
                   board          = {board}
                   winners        = {winners}
                   folder         = {folder}
          />
          
          <div className="info">
            <Info result = {result}/>
            <input type="button"
                   value={DICTIONARY && DICTIONARY[language].DELETE_GAME} 
                   onClick={(e) => { 
                     dispatch({type: 'REMOVE_GAME', id: gameId}); 
                     props.history.push('/history')
                   }} 
                   className="delete-game"/>
            <input type="button" 
                   value={DICTIONARY && DICTIONARY[language].BACK}
                   onClick={(e) => {
                     props.history.push('/history')
                   }}
                   className="back"/>
          </div>         
      </div>
      )}
    </div>
  )
}

export default GameHistory;