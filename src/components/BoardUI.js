import React           from 'react';
import Square          from './Square';

class BoardUI extends React.Component {
  empty = 0
  computer = 1
  user = 2

  constructor(props){
    super(props);
    this.category = this.props.category;
    this.disableBoard = this.props.disableBoard;
  }

  render(){
    const { winningSquares, gameOver } = this.props;

    if ((this.props.category.folder        !== this.category.folder)       || 
        (this.props.category.imageUser     !== this.category.imageUser)    ||
        (this.props.category.imageComputer !== this.category.imageComputer)){
      if (!gameOver){
        this.category = this.props.category;
      }
    }

    if (this.props.disableBoard !== this.disableBoard){
      this.disableBoard = this.props.disableBoard;
    }

    const { folder, imageComputer, imageUser } = this.category;

    const board = this.props.board.map((square, ind) => {
      const player = (square === this.computer)? `${folder}/${imageComputer}` : (
                     (square === this.user)?     `${folder}/${imageUser}`     : 'default'); 
      const win = gameOver ? (winningSquares.indexOf(ind) !== -1 ? 'win' : '') : '';
      const disableSquare = this.disableBoard ? true : (square !== this.empty ? true : false);
      return (<Square 
                key           = {ind} 
                player        = {player} 
                win           = {win}
                disableSquare = {disableSquare}
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