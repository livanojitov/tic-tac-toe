import React, { useContext } from 'react';
import { GameContext }       from '../contexts/GameContext';
import { CategoryContext }   from '../contexts/CategoryContext';
import Category              from './Category';
import StartGame             from './StartGame';
import Level                 from './Level';
import BoardUI               from './BoardUI';

const GameHistory = (props) => {
  const { getGame, dispatch } = useContext(GameContext);
  const { categories } = useContext(CategoryContext);
  let category = {};
  let categoryId, folder, imageComputer, imageUser, first, level, board, winners, message;
  let game = {};
  const gameId = props.match.params.id;
  game = getGame(gameId);
  if (game){
    ({categoryId, imageComputer, imageUser, first, level, board, winners, message } = game);
    folder = categories[categoryId].folder;
    category = { folder , imageComputer, imageUser };
  }
  return (
    <div>
      { game && (
      <div className="game-history">

          <Category 
              categoryId    = {categoryId} 
              imageUser     = {imageUser} 
              imageComputer = {imageComputer}
              history       = {true} />

          <div className="settings">
            <StartGame first = {first} history = {true} /> 
            <Level     level = {level} history = {true} />
          </div>

          <BoardUI category       = {category}
                   board          = {board}
                   winners        = {winners}
                   history        = {true} />

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