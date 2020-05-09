import React, { useContext, useEffect } from 'react';
import { GameContext }                  from '../contexts/GameContext';
import Category                         from './Category';
import Images                           from './Images';
import StartGame                        from './StartGame';
import Level                            from './Level';
import BoardUI                          from './BoardUI';
import { HistoryContext }               from '../contexts/HistoryContext';

const GameHistory = (props) => {
  const { getGame, dispatch } = useContext(GameContext);
  const { changeHistory }  = useContext(HistoryContext);
  let categoryId, imageComputer, imageUser, first, level, board, winners, message;
  let game = {};
  const gameId = props.match.params.id;

  game = getGame(gameId);
  if (game){
    ({categoryId, imageComputer, imageUser, first, level, board, winners, message } = game);
  }
  
  useEffect(() => {
    return () => {
      changeHistory(0);
    }
  })

  return (
    <div>
      { game && (
      <div className="game-history">

          <Category categoryId = {categoryId}/>

          <Images categoryId={categoryId}/>

          <div className="settings">
            <StartGame first = {first} /> 
            <Level     level = {level} />
          </div>

          <BoardUI categoryId     = {categoryId}
                   imageUser      = {imageUser}
                   imageComputer  = {imageComputer}                   
                   board          = {board}
                   winners        = {winners}
          />

          <div className="info">
            {message}
            <input type="button"
                   value="Delete Game" 
                   onClick={(e) => { 
                     dispatch({type: 'REMOVE_GAME', id: gameId}); 
                     props.history.push('/history')
                   }} 
                   className="delete-game"/>
            <input type="button" 
                   value="Back" 
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