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
    this.board = new Board();
    this.startingPlayer = this.board.user; 
    this.player = this.startingPlayer;   
    this.computer = new Computer(this.board);    
    this.level  = 0;
    this.timeout = 1;    
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
    this.player = this.startingPlayer;
    if (this.startingPlayer === this.board.computer){
      this.gameStarts();
    }  
  }

  gameStarts = (e) => {
    const user = this.board.user;
    const computer = this.board.computer;
    if (!this.state.gameOver){
      if (this.player === computer){
        this.computer.play();
      }else{
          this.board.play(user, e.target.id); 
      }
      this.setState(() => ({board : this.board.squares}));
      let winnerSquares = this.board.isAWinner(this.player);
      if (winnerSquares){
        this.gameOver(this.player === computer ? "You lost!" : "You won!", winnerSquares);
      }else if (this.board.isFull){
        this.gameOver("It's a draw!");
      }else{
        this.player = this.player === computer ? user : computer;
        if (this.player === computer){
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
      board: this.board.squares
    }), () => { this.gameInit() });
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