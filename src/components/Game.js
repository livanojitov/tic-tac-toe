import React           from 'react';
import Category        from './Category';
import StartGame       from './StartGame';
import Level           from './Level';
import BoardUI         from './BoardUI';
import Info            from './Info';
import Board           from './Board';
import Computer        from './Computer';
import { GameContext } from './GameContext';

class Game extends React.Component {
  static contextType = GameContext;

  constructor(props){
    super(props);
    this.startingPlayer = 0;
    this.player = 0;
    this.level  = 0;
    this.timeout = 1;
    this.board = new Board();
    this.computer = new Computer(this.board);    
    this.message = '';
    this.state = {
      category: {},
      disableBoard: true,
      reset: false,
      board: this.board.squares,
      winningSquares: [],
      gameOver: false,
      showStartButton: true
     };
  }

  render(){
    const {disableBoard, category, board, winningSquares, gameOver, showStartButton} = this.state;
    return(
      <div className="game">
        <Category onCategoryChange = {this.setCategory}/>  
        <div className="questions">
          <StartGame disable={!disableBoard} onPlayerChange = {this.setStartingPlayer} />
          <Level     disable={!disableBoard} onLevelChange  = {this.setLevel } />
        </div>
        {showStartButton &&  ( <div className="start-playing"><button onClick={this.gameInit}>Start the game</button></div>)}
        {(category.imageUser) && (
          <BoardUI category       = {category} 
                   disableBoard   = {disableBoard}
                   board          = {board}
                   onPlayUser     = {this.gameStarts}
                   winningSquares = {winningSquares}
                   gameOver       = {gameOver} />)}
        {gameOver && ( <Info message = {this.message} startOver = {this.startOver}/>)}                  
        </div>
    )
  }

  gameInit = () => {
    this.setState(() => ({disableBoard: false, showStartButton: false}));
    this.board.level = this.level;
    this.board.startingPlayer =  this.startingPlayer;
    this.gameStarts();
  }

  gameStarts = (e) => {
    const user = this.board.user;
    const computer = this.board.computer;
    if (!this.state.gameOver){
      if (this.player === computer){
        this.computer.play();
      }else if (this.player === user){
        if (e){
          this.board.play(user, e.target.id); 
        }else{
          window.setTimeout(this.gameStarts, this.timeout);
        } 
      }
      if ((this.player === computer) || ((this.player === user) && e)){
        this.setState(() => ({board : this.board.squares}));
        let winnerSquares = this.board.isAWinner(this.player);
        if (winnerSquares){
          this.gameOver(this.player === computer ? "You lost!" : "You won!", winnerSquares);
        }else if (this.board.isFull){
          this.gameOver("It's a draw!");
        }else{
          this.player = this.player === computer ? user : computer;
          window.setTimeout(this.gameStarts, this.timeout);
        }          
      } 
    }  
  }
  
  startOver = () => {
    this.message = '';
    this.board.reset();
    this.setState(() => ({      
      winningSquares : [],
      gameOver : false,
      board: this.board.squares, 
      disableBoard: false,
      showStartButton: false
    }), () => {
      this.board.level = this.level;
      this.board.startingPlayer = this.startingPlayer;
      this.player = this.startingPlayer;
      this.gameStarts();
    });
  }

  gameOver = (message, winningSquares = []) => {
    this.message = message;
    this.setState(() => ({ gameOver : true, disableBoard: true, showStartButton: false, winningSquares }));
    this.saveGame(message, winningSquares);
  }
 
  saveGame = (message, winningSquares) => {
    const { addGame } = this.context;
    addGame({
      board          : [...this.board.squares],
      winningSquares : [...winningSquares],
      message,
      whoStarted     : this.startingPlayer,
      level          : this.level,
      ...this.state.category,
    });
  }

  setCategory = (category) => {
    this.setState(() => ({category}));
  }

  setStartingPlayer = (player) => {
    this.startingPlayer = player;
    this.player = player;
  }

  setLevel = (level) => {
    this.level = level;
  }

}

export default Game