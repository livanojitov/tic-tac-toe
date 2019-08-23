import React           from 'react';
import Square          from './Square';

class BoardUI extends React.Component {
  empty = 0
  computer = 1
  user = 2

  constructor(props){
    super(props);
    this.category = this.props.category;
    this.disabled = this.props.disabled;
  }

  render(){
    const { winningSquares, gameOver, category } = this.props;
    if ((category.folder        !== this.category.folder)       || 
        (category.imageUser     !== this.category.imageUser)    ||
        (category.imageComputer !== this.category.imageComputer)){
      if (!gameOver){
        this.category = this.props.category;   
      }
    }

    const { folder, imageComputer, imageUser } = this.category;

    if (this.props.disabled !== this.disabled){
      this.disabled = this.props.disabled;
    }
    
    const board = this.props.board.map((square, ind) => {
      const player = (square === this.computer)? `${folder}/${imageComputer}` : (
                     (square === this.user)?     `${folder}/${imageUser}`     : 'default'); 
      const win = gameOver ? (winningSquares.indexOf(ind) !== -1 ? 'win' : '') : '';
      const disabled = this.disabled ? true : (square !== this.empty ? true : false);
      return (<Square 
                key           = {ind} 
                player        = {player} 
                win           = {win}
                disabled      = {disabled}
                handleClick   = {(e) => this.props.onPlayUser(e)}
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