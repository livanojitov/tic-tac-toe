import React, { useContext } from 'react';
import Square                from './Square';
import { CategoryContext }   from '../contexts/CategoryContext';
import * as constants        from './Constants';

const empty    = constants.EMPTY;
const computer = constants.COMPUTER;
const user     = constants.USER;
let   category;

const BoardUI = (props) => {
    const { categories } = useContext(CategoryContext);
    if (!category){
      category = props.category;
    }

    const { winners, gameOver,   category:category1, history } = props;
    let   { categoryId1, imageUser1, imageComputer1              } = category1;
    let   { categoryId,  imageUser,  imageComputer               } = category;
    if ((categoryId1    !== categoryId)   || 
        (imageUser1     !== imageUser)    ||
        (imageComputer1 !== imageComputer)){
      if (!gameOver){
        category = category1;   
        ({ categoryId, imageComputer, imageUser } = category);
      }
    }
    
    let folder = categories[categoryId].folder;
    
    const board = props.board.map((square, ind) => {
      const player = (square === computer)?
                      `${folder}/${imageComputer}` : (
                     (square === user)?
                      `${folder}/${imageUser}`:
                     'default'); 
      let win, disabled;
      let clickEvent = {};
      if (typeof(history) === 'undefined' || history === "false"){
        win = gameOver ? (winners.indexOf(ind) !== -1 ? 'win' : '') : '';
        disabled = props.disabled ? true : (square !== empty ? true : false);
        clickEvent.handleClick = (e) => {
          props.onUserPlayed(e)
        }        
      }else{
        win = winners.indexOf(ind) !== -1 ? 'win' : '';
        disabled = true;
      }

      return (<Square 
                key           = {ind} 
                player        = {player} 
                win           = {win}
                disabled      = {disabled}
                id            = {ind}
                {...clickEvent}                
              />
      ) 
    }); 
    
    return (
      <div className="board">
        {board}
      </div>
    )
 
}  

export default BoardUI