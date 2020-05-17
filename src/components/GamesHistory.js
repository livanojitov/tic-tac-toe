import React, { useContext } from 'react';
import { GameContext }       from '../contexts/GameContext';
import { LanguageContext }   from '../contexts/LanguageContext';
import { Link }              from 'react-router-dom';
import Category              from './Category';
import Images                from './Images';
import StartGame             from './StartGame';
import Level                 from './Level';
import Info                  from './Info';
import DICTIONARY            from './Dictionary';

const GamesHistory = ({categoryId, imageUser, imageComputer, result, id, first, level}) => {
  const {dispatch}  = useContext(GameContext);
  const { getLanguage } = useContext(LanguageContext);
  const language = getLanguage();

  return (
    <div className="games-history">

      <Category categoryId = {categoryId}/>

      <Images categoryId={categoryId}/>

      <div className="settings">
        <StartGame first = {first}/>
        <Level     level = {level}/>     
      </div>
      
      <div className="info">
        <Info result = {result}/>
        <button className="see-game">
          <Link to={`/${id}`}>{DICTIONARY[language].SEE_GAME}</Link>
        </button>
        <input type="button" 
               value={DICTIONARY[language].DELETE_GAME}
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