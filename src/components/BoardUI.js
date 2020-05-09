import React, { useContext } from 'react';
import Square                from './Square';
import { CategoryContext }   from '../contexts/CategoryContext';
import { HistoryContext }    from '../contexts/HistoryContext';
import * as constants        from './Constants';

const empty    = constants.EMPTY;
const computer = constants.COMPUTER;
const user     = constants.USER;
let   categoryId, imageUser, imageComputer;

const BoardUI = (props) => {
    const { categories } = useContext(CategoryContext);
    const { history    } = useContext(HistoryContext);

    if (!categoryId){
      categoryId = props.categoryId;
      imageUser = props.imageUser;
      imageComputer = props.imageComputer;
    }

    const { winners, gameOver, categoryId:categoryId1, imageUser:imageUser1, imageComputer:imageComputer1} = props;

    if ((categoryId1    !== categoryId)   || 
        (imageUser1     !== imageUser)    ||
        (imageComputer1 !== imageComputer)){
      if (!gameOver){
        categoryId = categoryId1;
        imageUser = imageUser1;
        imageComputer = imageComputer1;
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

      if (!history){
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