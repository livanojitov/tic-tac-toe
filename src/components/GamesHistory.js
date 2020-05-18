import React, { useContext, useState } from 'react';
import { GameContext }                 from '../contexts/GameContext';
import { LanguageContext }             from '../contexts/LanguageContext';
import { Link }                        from 'react-router-dom';
import Category                        from './Category';
import Images                          from './Images';
import StartGame                       from './StartGame';
import Level                           from './Level';
import Info                            from './Info';
import DICTIONARY                      from './Dictionary';

const GamesHistory = ({categoryId, imageUser, imageComputer, result, id, first, level}) => {
  const {dispatch}  = useContext(GameContext);
  const { getLanguage } = useContext(LanguageContext);
  const language = getLanguage();

  const [ folder, setFolder ] = useState(""); 
  const updateFolder = (category) => {
    setFolder(category.folder);
  };

  return (
    <div className="games-history">

      <Category categoryId = {categoryId} onCategoryChange = {updateFolder}/>

      <Images categoryId={categoryId} imageUser={imageUser} imageComputer={imageComputer} folder={folder}/>

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