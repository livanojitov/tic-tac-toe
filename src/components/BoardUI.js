import React          from 'react';
import Square         from './Square';
import * as constants from './Constants';

class BoardUI extends React.Component {
  empty = constants.empty;
  computer = constants.computer;
  user = constants.user;
  
  constructor(props){
    super(props);
    this.category = this.props.category;
    this.disabled = this.props.disabled;
  }

  render(){
    const { winners, gameOver, category, disabled } = this.props;
    let { folder1, imageUser1, imageComputer1 } = category;
    let { folder, imageUser, imageComputer } = this.category;
    if ((folder1        !== folder)       || 
        (imageUser1     !== imageUser)    ||
        (imageComputer1 !== imageComputer)){
      if (!gameOver){
        this.category = category;   
        ({ folder, imageComputer, imageUser } = this.category);
      }
    }

    if (disabled !== this.disabled){
      this.disabled = this.props.disabled;
    }
    
    const board = this.props.board.map((square, ind) => {
      const player = (square === this.computer)?
                      `${folder}/${imageComputer}` : (
                     (square === this.user)?
                      `${folder}/${imageUser}`:
                     'default'); 
      const win = gameOver ? (winners.indexOf(ind) !== -1 ? 'win' : '') : '';
      const disabled = this.disabled ? true : (square !== this.empty ? true : false);
      return (<Square 
                key           = {ind} 
                player        = {player} 
                win           = {win}
                disabled      = {disabled}
                handleClick   = {(e) => this.props.onUserPlayed(e)}
                id            = {ind}
              />
      ) 
    });  
    
    return (
      <div className="board">
        {board}
      </div>
    )
  }
 
}  

export default BoardUI