import React, { useContext } from 'react';
import { GameContext }       from './GameContext';
import { Link }              from 'react-router-dom';
import Category              from './Category';
import StartGame             from './StartGame';

const GamesHistory = (props) => {
  let {category, imageUser, imageComputer, message, id, whoStarted} = props;

  const { removeGame}  = useContext(GameContext);

  return (
    <div className="games-history">

      <Category 
        category      = {category} 
        imageUser     = {imageUser} 
        imageComputer = {imageComputer}
        disable       = "true" /> 

      <StartGame whoStarted = {whoStarted}/>

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