import React           from 'react';
import Square          from './Square';
import Info            from './Info';
import { GameContext } from './GameContext';

class Board extends React.Component {
  empty = 0
  computer = 1
  user = 2
  static contextType = GameContext

  constructor(props){
    super(props);
    this.category = this.props.category;
    this.player = -1;
    this.disableBoard = this.props.disableBoard;
    this.state = {
        board : Array(9).fill(this.empty),
        winningSquares : [],
        gameOver : false,
        message  : ''
    };
  }

  render(){
    const { winningSquares, gameOver, message } = this.state;

    if (this.props.category.folder !== this.category.folder){
      if (!gameOver){
        this.category = this.props.category;
      }
    }

    if (this.props.disableBoard !== this.disableBoard){
      this.disableBoard = this.props.disableBoard;
    }

    const { folder, imageComputer, imageUser } = this.category;

    const board = this.state.board.map((square, ind) => {
      const player = (square === this.computer)? `${folder}/${imageComputer}` : (
                     (square === this.user)?     `${folder}/${imageUser}`     : 'default'); 
      const win = gameOver ? (winningSquares.indexOf(ind) !== -1 ? 'win' : '') : '';
      const disableSquare = this.disableBoard ? true : (square !== this.empty ? true : false);
      return (<Square 
                key           = {ind} 
                player        = {player} 
                win           = {win}
                disableSquare = {disableSquare}
                handleClick   = {this.handleClick}
                id            = {ind}
              />
      ) 
    });  
    
    return (
      <div className="board">
        {board}
        {gameOver && ( <Info message = {message} startOver = {this.startOver}/>)} 
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState){   
    if (this.isBoardEmpty() && (this.props.getPlayer() === this.computer) && !this.disableBoard){
      this.play(this.computer, [0,2,6,8][Math.floor(Math.random() * 4)]);
    }
  }
  
  startOver = () => {
    this.category = this.props.category;  
    this.player = this.props.getPlayer();
    const newBoard =  this.state.board;
    newBoard.fill(this.empty); 
    this.setState(() => {
        return {
          board : newBoard,
          winningSquares : [],
          gameOver : false,
          message  : ''              
        }
    });
  }
  
  gameOver = (message, winningSquares) => {
    const { board } = this.state;
    if (winningSquares.length){
      const ws = this.state.winningSquares;
      [ws[0], ws[1], ws[2]] = winningSquares;
      this.setState(() => ({ gameOver : true, message  : message, winningSquares : ws }));
    }else{
      this.setState(() => ({ gameOver : true, message  : message }));
    } 
    const { addGame } = this.context;
    addGame({
      board          : [...board],
      winningSquares : [...winningSquares],
      message        : message,
      whoStarted     : this.player,
      level          : this.props.getLevel(),
      ...this.category,
    });
  }

  playFromTwo = (square1, square2, square3) => {
    const computer = this.computer;
    const user     = this.user;    
    const board    = this.state.board;

    if (board[square1] === computer){
      if (board[1] === user || board[7] === user){
        this.play(computer, square2);
        return true;
      }else if (board[3] === user || board[5] === user){
        this.play(computer, square3);
        return true;
      }
    }
    return false;
  }

  playFromFour = (arr1, arr2, arr3, arr4) => {
    const computer = this.computer;
    const user     = this.user;    
    const board    = this.state.board;

    if (board[arr1[0]] === computer && board[arr1[1]] === user && board[arr1[2]] === computer && board[arr1[3]] === user){
      this.play(computer, arr1[4]);
      return true;
    }else if (board[arr2[0]] === computer && board[arr2[1]] === user && board[arr2[2]] === computer && board[arr2[3]] === user){
        this.play(computer, arr2[4]);
        return true;
    }else if (board[arr3[0]] === computer && board[arr3[1]] === user && board[arr3[2]] === computer && board[arr3[3]] === user){
      this.play(computer, arr3[4]);
      return true;
    }else if (board[arr4[0]] === computer && board[arr4[1]] === user && board[arr4[2]] === computer && board[arr4[3]] === user){
      this.play(computer, arr4[4]);
      return true;
    }  
    return false;
  }

  handleClick = (e) => {
    const computer = this.computer;
    const user     = this.user;
    const board    = this.state.board;
    let winnerSquares;

    this.play(user,e.target.id);
    winnerSquares = this.isAWinner(user);
    if (winnerSquares){
      this.gameOver("You won!", winnerSquares);
      return;
    }
     
    if (this.isBoardFull()){
      this.gameOver("It's a draw!", []);
      return;
    }

    if (this.player === -1){
      this.player = this.props.getPlayer();
    }

    if (this.props.getLevel() === 2){
      if (this.player === user){

        if (this.numberOfPlays() === 1){
          if (board[0] === user || board[2] === user || board[6] === user || board[8] === user){
            this.play(computer, 4);
          }else if (board[4] === user){
            this.play(computer, [0,2,6,8][Math.floor(Math.random() * 4)]);
          }else{
            this.play(computer, 4);
          }
          return;
        }
        
        if (this.numberOfPlays() === 3){
          if ((board[0] === computer && board[4] === user && board[8] === user) || 
              (board[0] === user     && board[4] === user && board[8] === computer)){
            this.play(computer, [2,6][Math.floor(Math.random() * 2)]);
            return;
          }else if ((board[2] === computer && board[4] === user && board[6] === user) || 
                    (board[2] === user     && board[4] === user && board[6] === computer)){
            this.play(computer, [0,8][Math.floor(Math.random() * 2)]);
            return;
          }else if (board[4] === computer && ((board[0] === user && board[8] === user) || (board[2] === user && board[6] === user))){
            this.play(computer, [1,3,5,7][Math.floor(Math.random() * 4)]);
            return;
          }
        }

      } 

      if (this.player === computer){

        if (this.numberOfPlays() === 2){
            if (this.playFromTwo(8, 2, 6) || 
                this.playFromTwo(2, 8, 0) || 
                this.playFromTwo(0, 6, 2) || 
                this.playFromTwo(6, 0, 8)){
              return;
            }
        }

        if (this.numberOfPlays() === 4){
          winnerSquares = this.isAboutToWin(computer);
          if (winnerSquares !== -1){
            this.play(computer, winnerSquares[0]);
            this.gameOver("You lost!", winnerSquares);
            return;
          }      
          if (this.playFromFour([8,1,2,5,6], [8,3,6,7,2], [8,5,6,7,0], [8,7,2,5,0]) ||
              this.playFromFour([2,1,8,5,6], [2,3,0,1,8], [2,7,8,5,0], [2,5,0,1,6]) ||
              this.playFromFour([0,1,6,3,8], [0,3,2,1,8], [0,5,2,1,6], [0,7,6,3,2]) ||
              this.playFromFour([6,1,0,3,8], [6,3,8,7,2], [6,5,8,7,0], [6,7,0,3,2]) ){
            return;
          }
        } 
      }
    }    

    winnerSquares = this.isAboutToWin(computer);
    if (winnerSquares !== -1){
      this.play(computer, winnerSquares[0]);
      this.gameOver("You lost!", winnerSquares);
      return;
    }

    winnerSquares = this.isAboutToWin(user);
    if (winnerSquares !== -1){
      this.play(computer, winnerSquares[0]);
    }else{
      const emptySquares = [];
      for (let i=0; i< board.length; i++){
        if (board[i] === this.empty){
          emptySquares.push(i);
        }
      }
      this.play(computer,emptySquares[Math.floor(Math.random() * emptySquares.length)]);
    }

    if (this.isBoardFull()){
      this.gameOver("It's a draw!", []);
    }
    
  }

  play(player, square){
    const newBoard = this.state.board;
    newBoard[square] = player;
    this.setState(() => {
      return {
        board : newBoard
      }
    });
  }
  
  check(player, square1, square2, square3){
    const board = this.state.board;
    const empty = this.empty;
    return (((board[square1] === player && board[square2] === player && board[square3] === empty)  && [square3, square1, square2]) ||
            ((board[square1] === player && board[square2] === empty  && board[square3] === player) && [square2, square3, square1]) ||
            ((board[square1] === empty  && board[square2] === player && board[square3] === player) && [square1, square3, square2]) || -1);
  }

  isAboutToWin(player){
    let square;
    return (
    (!((square = this.check(player, 0, 1, 2)) === -1 ) && square) || 
    (!((square = this.check(player, 3, 4, 5)) === -1 ) && square) || 
    (!((square = this.check(player, 6, 7, 8)) === -1 ) && square) || 
    (!((square = this.check(player, 0, 3, 6)) === -1 ) && square) || 
    (!((square = this.check(player, 1, 4, 7)) === -1 ) && square) || 
    (!((square = this.check(player, 2, 5, 8)) === -1 ) && square) || 
    (!((square = this.check(player, 0, 4, 8)) === -1 ) && square) || 
    (!((square = this.check(player, 2, 4, 6)) === -1 ) && square) || -1);
  }

  numberOfPlays = () => {
      let count = 0;
      for (let i=0; i< 9; i++){
        if (this.state.board[i] !== this.empty){
          count++;
        }
      }
      return count;    
  }

  isBoardFull = () => {
    return !this.state.board.includes(0);
  }

  isBoardEmpty = () => {
    const board = this.state.board;
    return (!(board.includes(this.computer) || board.includes(this.user)));
  }

  isAWinner(player){
    const board = this.state.board;
    return (
      ((board[0] === player && board[1] === player && board[2] === player) && [0,1,2]) || 
      ((board[3] === player && board[4] === player && board[5] === player) && [3,4,5]) || 
      ((board[6] === player && board[7] === player && board[8] === player) && [6,7,8]) || 
      ((board[0] === player && board[3] === player && board[6] === player) && [0,3,6]) || 
      ((board[1] === player && board[4] === player && board[7] === player) && [1,4,7]) || 
      ((board[2] === player && board[5] === player && board[8] === player) && [2,5,8]) || 
      ((board[0] === player && board[4] === player && board[8] === player) && [0,4,8]) || 
      ((board[2] === player && board[4] === player && board[6] === player) && [2,4,6]) 
    )
  }

}  

export default Board