import React, { useContext } from 'react';
import { GameContext }       from './GameContext';
import { Link }              from 'react-router-dom';
import Category              from './Category';
import StartGame             from './StartGame';
import Level                 from './Level';

const GamesHistory = ({categoryId, imageUser, imageComputer, message, id, first, level}) => {

  const { removeGame}  = useContext(GameContext);

  return (
    <div className="games-history">

      <Category 
        categoryId    = {categoryId} 
        imageUser     = {imageUser} 
        imageComputer = {imageComputer}
        history       = {true} /> 

      <div className="settings">
        <StartGame first = {first} history = {true} /> 
        <Level     level = {level} history = {true} />        
      </div>
      
      <div className="info">
        {message}&nbsp;&nbsp;
        <button className="see-game"><Link to={`/${id}`}>See Game</Link></button>&nbsp;&nbsp;
        <input type="button" value="Delete Game" onClick={(e) => { removeGame(id); }} className="delete"/>&nbsp;&nbsp;
      </div>

      <hr/>

    </div>           
  );
}

export default GamesHistory;