import React, { useContext } from 'react';
import { GameContext }       from './GameContext';
import { Link }              from 'react-router-dom';
import Category              from './Category';
import StartGame             from './StartGame';
import Level                 from './Level';

const GamesHistory = (props) => {
  let {categoryId, imageUser, imageComputer, message, id, whoStarted, level} = props;

  const { removeGame}  = useContext(GameContext);

  return (
    <div className="games-history">

      <Category 
        categoryId    = {categoryId} 
        imageUser     = {imageUser} 
        imageComputer = {imageComputer}
        disable       = "true" /> 

      <div className="questions">
        <StartGame whoStarted = {whoStarted}/> 
        <Level level = {level} />
      </div>
      
      <div className="info">
        {message}&nbsp;&nbsp;
        <Link to={`/${id}`}>See Game</Link>&nbsp;&nbsp;
        <input type="button" value="Delete" onClick={(e) => { removeGame(id); }} className="delete"/>&nbsp;&nbsp;
      </div>

      <hr/>

    </div>           
  );
}

export default GamesHistory;