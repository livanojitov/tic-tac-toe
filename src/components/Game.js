import React           from 'react';
import Category        from './Category';
import StartGame       from './StartGame';
import BoardUI         from './BoardUI';
import Level           from './Level';
import TicTacToe       from './TicTacToe';
import Info            from './Info';
import { GameContext } from './GameContext';

class Game extends React.Component {
 
  computer = 1;
  user = 2;
  static contextType = GameContext;

  constructor(props){
    super(props);
    this.startingPlayer = -1;
    this.player = -1;
    this.level  = -1;
    this.timeout = 1;
    this.game = new TicTacToe();
    this.message = '';
    this.state = {
      category: {},
      disableBoard: true,
      reset: false,
      board: this.game.getBoard(),
      winningSquares: [],
      gameOver: false,
      showStartButton: true
     };
  }

  render(){
    return(
      <div className="game">
        <Category onCategoryChange = {this.setCategory}/>  
        <div className="questions">
          <StartGame disable={!this.state.disableBoard} onPlayerChange = {this.setStartingPlayer} />
          <Level     disable={!this.state.disableBoard} onLevelChange  = {this.setLevel } />
        </div>
        {this.state.showStartButton &&  ( <div className="start-playing"><button onClick={this.gameInit}>Start the game</button></div>)}
        {(this.state.category.imageUser) && (
          <BoardUI category       = {this.state.category} 
                   disableBoard   = {this.state.disableBoard}
                   board          = {this.state.board}
                   onPlayUser     = {this.gameStarts}
                   winningSquares = {this.state.winningSquares}
                   gameOver       = {this.state.gameOver} />)}
        {this.state.gameOver && ( <Info message = {this.message} startOver = {this.startOver}/>)}                  
        </div>
    )
  }

  gameInit = () => {
    this.setState(() => ({disableBoard: false, showStartButton: false}));
    this.game.setLevel(this.level);
    this.game.setPlayer(this.startingPlayer);
    this.gameStarts();
  }

  gameStarts = (e) => {
    if (!this.state.gameOver){
      if (this.player === this.computer){
        if (this.game.isEmpty()){
          this.game.computer.playRandomly();
        }else{
          this.game.computer.play(); 
        }
      }else if (this.player === this.user){
        if (e){
          this.game.user.play(e.target.id);
        }else{
          window.setTimeout(this.gameStarts, this.timeout);
        } 
      }
      if ((this.player === this.computer) || ((this.player === this.user) && e)){
        this.setState(() => ({board : this.game.getBoard()}));
        let winnerSquares = this.game.isAWinner(this.player);
        if (winnerSquares){
          this.gameOver(this.player === this.computer ? "You lost!" : "You won!", winnerSquares);
        }else if (this.game.isFull()){
          this.gameOver("It's a draw!");
        }else{
          this.player = this.player === this.computer ? this.user : this.computer;
          window.setTimeout(this.gameStarts, this.timeout);
        }          
      } 
    }  
  }
  
  startOver = () => {
    this.message = '';
    this.game.reset();
    this.setState(() => {
        return {
          winningSquares : [],
          gameOver : false,
          board: this.game.getBoard(), 
          disableBoard: false,
          showStartButton: false
        }
    }, () => {
      this.game.setLevel(this.level);
      this.game.setPlayer(this.startingPlayer);
      this.player = this.startingPlayer;
      this.gameStarts();
    });
  }

  gameOver = (message, winningSquares = []) => {
    this.message = message;
    if (winningSquares.length){
      const ws = this.state.winningSquares;
      [ws[0], ws[1], ws[2]] = winningSquares;
      this.setState(() => ({ gameOver : true, disableBoard: true, showStartButton: false, winningSquares : ws }));
    }else{
      this.setState(() => ({ gameOver : true, disableBoard: true }));
    } 
    const { addGame } = this.context;
    addGame({
      board          : [...this.game.getBoard()],
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