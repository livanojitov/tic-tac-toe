import React, { useContext } from 'react';
import Square                from './Square';
import { HistoryContext }    from '../contexts/HistoryContext';
import * as constants        from './Constants';

const empty    = constants.EMPTY;
const computer = constants.COMPUTER;
const user     = constants.USER;

const BoardUI = (props) => {
    const { history    } = useContext(HistoryContext);
    const { winners, gameOver, imageUser, imageComputer} = props;
    const folder = props.folder;
    
    const board = props.board.map((square, ind) => {
      const player = (square === computer) ? `${folder}/${imageComputer}` : ((square === user) ? `${folder}/${imageUser}` : 'default'); 
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