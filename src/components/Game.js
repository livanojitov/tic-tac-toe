import React, { Component }  from 'react';
import Category              from './Category';
import Images                from './Images';
import StartGame             from './StartGame';
import Level                 from './Level';
import BoardUI               from './BoardUI';
import Info                  from './Info';
import Board                 from './Board';
import Computer              from './Computer';
import { GameContext }       from '../contexts/GameContext';
import * as constants        from './Constants';

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
      categoryId: undefined,
      imageUser: 0,      
      imageComputer: 1,
      disabled: true,
      reset: false,
      board: this.board.players,
      winners: [],
      gameOver: false,
      showStartButton: true
     };
  }

  render(){
    const {disabled, categoryId, board, winners, gameOver, showStartButton, imageUser, imageComputer} = this.state;
    return(
      <div className="game">
        <Category onCategoryChange = {this.setCategory}/>
        {this.state.categoryId && ( <Images categoryId={this.state.categoryId} onImageChange = { this.setImages}/> )}
        <div className="settings">
          <StartGame disabled={!disabled} onPlayerChange = {this.setFirst} />
          <Level     disabled={!disabled} onLevelChange  = {this.setLevel } />
        </div>
        {showStartButton &&  ( <div className="start-playing"><button onClick={this.gameInit}>{constants.PLAY}</button></div>)}
        {categoryId && (
          <BoardUI categoryId     = {categoryId} 
                   imageUser      = {imageUser}
                   imageComputer  = {imageComputer}
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
        this.gameOver(this.player === computer ? constants.LOST : constants.WON, winners);
      }else if (this.board.isFull){
        this.gameOver(constants.DRAW);
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
      categoryId     : this.state.categoryId,
      imageUser      : this.state.imageUser,
      imageComputer  : this.state.imageComputer
    }});
  }

  setCategory = (categoryId) => {
    this.setState(() => (categoryId));
  }

  setImages = (images) => {
      this.setState(() => (images));
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