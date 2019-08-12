import React           from 'react';
import Category        from './Category';
import StartGame       from './StartGame';
import BoardUI         from './BoardUI';
import Level           from './Level';
import TicTacToe       from './TicTacToe';
import Info            from './Info';
import { GameContext } from './GameContext';

class Game extends React.Component {
 
  empty = 0;
  computer = 1;
  user = 2;
  static contextType = GameContext;

  constructor(props){
    super(props);
    this.player = -1;
    this.level  = -1;
    this.game = new TicTacToe();
    this.message = '';
    this.state = {
      category: {},
      disableBoard: true,
      reset: false,
      board: this.game.getBoard(),
      winningSquares: [],
      gameOver: false,
      once: true
     };
  }

  render(){
    return(
      <div className="game">
        <Category onCategoryChange = {this.setCategory}/>  
        <div className="questions">
          <StartGame disable={!this.state.disableBoard} onPlayerChange = {this.setPlayer} />
          <Level     disable={!this.state.disableBoard} onLevelChange  = {this.setLevel } />
        </div>
        {this.state.once &&  ( <div className="start-playing"><button onClick={this.startPlaying}>Start playing</button></div>)}
        {(this.state.category.imageUser) && (
          <BoardUI category       = {this.state.category} 
                   disableBoard   = {this.state.disableBoard}
                   board          = {this.state.board}
                   onUserPlay     = {this.userPlay}
                   winningSquares = {this.state.winningSquares}
                   gameOver       = {this.state.gameOver} />)}
        {this.state.gameOver && ( <Info message = {this.message} startOver = {this.startOver}/>)}                  
        </div>
    )
  }

  startPlaying = () => {
    this.setState(() => ({disableBoard: false}));
    this.onStartOver();   
  }

  userPlay = (e) => {
    this.game.userPlay(e.target.id);
    this.setState(() => ({board : this.game.getBoard()}));
    let winnerSquares = this.game.isAWinner(this.user);
    if (winnerSquares){
      this.gameOver("You won!", winnerSquares);
    }else if (this.game.isFull()){
      this.gameOver("It's a draw!", []);
    }else{
      this.game.playComputer();
      this.setState(() => ({board : this.game.getBoard()}));
      let winnerSquares = this.game.isAWinner(this.computer);
      if (winnerSquares){
        this.gameOver("You lost!", winnerSquares);
      }else if (this.game.isFull()){
        this.gameOver("It's a draw!", []);
      }
    }

  }

  gameOver = (message, winningSquares) => {
    this.message = message;
    if (winningSquares.length){
      const ws = this.state.winningSquares;
      [ws[0], ws[1], ws[2]] = winningSquares;
      this.setState(() => ({ gameOver : true, disableBoard: true, once: false, winningSquares : ws }));
    }else{
      this.setState(() => ({ gameOver : true, disableBoard: true }));
    } 
    const { addGame } = this.context;
    addGame({
      board          : [...this.game.getBoard()],
      winningSquares : [...winningSquares],
      message,
      whoStarted     : this.player,
      level          : this.level,
      ...this.state.category,
    });
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
          once: false
        }
    }, () => {
      this.onStartOver();
    });
  }

  onStartOver = () => {
    this.game.setLevel(this.level);
    this.game.setPlayer(this.getPlayer());    
    if (this.game.isEmpty()){
      if (this.getPlayer() === this.computer){
        this.game.play(this.computer, [0,2,6,8][Math.floor(Math.random() * 4)]);
        this.setState(() => ({board : this.game.getBoard(), once: false}));
      }
    }  
  }

  setCategory = (category) => {
    this.setState(() => ({category}));
  }

  setPlayer = (player) => {
    this.player = player;
  }

  getPlayer = () => {
    return this.player;
  }

  setLevel = (level) => {
    this.level = level;
  }

}

export default Game