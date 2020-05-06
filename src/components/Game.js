import React, { Component }  from 'react';
import Category              from './Category';
import StartGame             from './StartGame';
import Level                 from './Level';
import BoardUI               from './BoardUI';
import Info                  from './Info';
import Board                 from './Board';
import Computer              from './Computer';
import { GameContext }       from '../contexts/GameContext';

class Game extends Component {
  static contextType = GameContext;

  constructor(props){
    super(props);
    this.board = new Board();
    this.first = this.board.user; 
    this.player = this.first;   
    this.computer = new Computer(this.board);    
    this.level  = 0;
    this.timeout = 1;    
    this.message = '';
    this.state = {
      category: {},
      disabled: true,
      reset: false,
      board: this.board.players,
      winners: [],
      gameOver: false,
      showStartButton: true
     };
  }

  render(){
    const {disabled, category, board, winners, gameOver, showStartButton} = this.state;
    return(
      <div className="game">
        <Category onCategoryChange = {this.setCategory}/>  
        <div className="settings">
          <StartGame disabled={!disabled} onPlayerChange = {this.setFirst} />
          <Level     disabled={!disabled} onLevelChange  = {this.setLevel } />
        </div>
        {showStartButton &&  ( <div className="start-playing"><button onClick={this.gameInit}>Start the game</button></div>)}
        {('imageUser' in category) && (
          <BoardUI category       = {category} 
                   disabled       = {disabled}
                   board          = {board}
                   onUserPlayed   = {this.gamePlay}
                   winners        = {winners}
                   gameOver       = {gameOver} />)}
        {gameOver && ( <Info message = {this.message} startOver = {this.gameInit}/>)}                  
      </div>
    )
  }

  gameInit = () => {
    let state = {
      disabled: false, 
      showStartButton: false
    }
    if (!this.board.isEmpty){
      this.message = '';
      this.board.reset();
      state = {
        ...state,
        winners: [],
        gameOver: false,
        board: this.board.players        
      }
    }
    this.setState(
      () => ({...state}), 
      () => {
        this.board.level = this.level;
        this.board.first =  this.first;
        this.player = this.first;
        if (this.first === this.board.computer){
          this.gamePlay();
        }  
      }
    );
  }

  gamePlay = (e) => {
    const user = this.board.user;
    const computer = this.board.computer;
    if (!this.state.gameOver){
      if (this.player === computer){
        this.computer.play();
      }else{
          this.board.play(user, e.target.id); 
      }
      this.setState(() => ({board : this.board.players}));
      let winners = this.board.isAWinner(this.player);
      if (winners){
        this.gameOver(this.player === computer ? "You lost!" : "You won!", winners);
      }else if (this.board.isFull){
        this.gameOver("It's a draw!");
      }else{
        this.player = this.player === computer ? user : computer;
        if (this.player === computer){
          window.setTimeout(this.gamePlay, this.timeout);
        }  
      } 
    }  
  }

  gameOver = (message, winners = []) => {
    this.message = message;
    this.setState(() => ({ gameOver : true, disabled: true, showStartButton: false, winners }));
    this.gameSave(message, winners);
  }

  gameSave = (message, winners) => {
    const { dispatch } = this.context;
    dispatch({type: 'ADD_GAME', game : {
      board          : [...this.board.players],
      winners        : [...winners],
      message,
      first          : this.first,
      level          : this.level,
      categoryId     : this.state.category.categoryId,
      imageUser      : this.state.category.imageUser,
      imageComputer : this.state.category.imageComputer
    }});
  }

  setCategory = (category) => {
    this.setState(() => ({category}));
  }

  setFirst = (player) => {
    this.first = player;
    this.player = player;
  }

  setLevel = (level) => {
    this.level = level;
  }

}

export default Game