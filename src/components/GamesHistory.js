import React, { useContext } from 'react';
import { GameContext }       from '../contexts/GameContext';
import { Link }              from 'react-router-dom';
import Category              from './Category';
import Images                from './Images';
import StartGame             from './StartGame';
import Level                 from './Level';

const GamesHistory = ({categoryId, imageUser, imageComputer, message, id, first, level}) => {
  const {dispatch}  = useContext(GameContext);

  return (
    <div className="games-history">

      <Category categoryId = {categoryId}/>

      <Images categoryId={categoryId}/>

      <div className="settings">
        <StartGame first = {first}/>
        <Level     level = {level}/>        
      </div>
      
      <div className="info">
        {message}
        <button className="see-game">
          <Link to={`/${id}`}>See Game</Link>
        </button>
        <input type="button" 
               value="Delete Game" 
               onClick={(e) => { 
                 dispatch({type: 'REMOVE_GAME', id });
               }} 
               className="delete-game"/>
      </div>

      <hr/>

    </div>           
  );
}

export default GamesHistory;