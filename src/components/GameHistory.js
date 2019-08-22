import React, { useContext } from 'react';
import { GameContext }       from './GameContext';
import Category              from './Category';
import StartGame             from './StartGame';
import Level                 from './Level';
import BoardUI               from './BoardUI';

const GameHistory = (props) => {
  const { getGame, removeGame } = useContext(GameContext);
  let category = {};  
  let game = {};
  const gameId = props.match.params.id;
  game = getGame(gameId);  
  if (game){
    var {categoryId, folder, imageComputer, imageUser, whoStarted, level, board, winningSquares, message } = game;
    category.folder = folder;
    category.imageComputer = imageComputer;
    category.imageUser = imageUser;
  }
  return (
    <div>
      { game && (
      <div className="game-history">
          <Category 
              categoryId    = {categoryId} 
              imageUser     = {imageUser} 
              imageComputer = {imageComputer}
              disable       = "true" />
          <div className="settings">
            <StartGame whoStarted = {whoStarted}/> 
            <Level level = {level} />
          </div>
          <BoardUI category       = {category} 
                   disableBoard   = {true}
                   board          = {board}
                   winningSquares = {winningSquares}
                   gameOver       = {true} />
          <div className="info">
            {message}&nbsp;&nbsp;
            <input type="button" value="Delete Game" onClick={(e) => { removeGame(gameId); props.history.push('/history')}} className="delete"/>&nbsp;&nbsp;
            <input type="button" value="Back"   onClick={(e) => {props.history.push('/history')}}/>              
          </div>  
      </div>
      )}
    </div>
  )
}

export default GameHistory;