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
import { LanguageContext }   from '../contexts/LanguageContext';
import { HistoryContext }    from '../contexts/HistoryContext';
import { DictionaryContext } from '../contexts/DictionaryContext';
import * as constants        from './Constants';

const { LOST, WON, DRAW } = constants;

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
    this.result = 0;
    this.language = 0;
    this.changeHistory = null;
    this.state = {
      categoryId : -1,
      count : 0,
      folder : '',
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
    const {disabled, categoryId, folder, count, board, winners, gameOver, showStartButton, imageUser, imageComputer} = this.state;
    return(
      <DictionaryContext.Consumer>{(dictionaryContext) => (
        <HistoryContext.Consumer>{(HistoryContext) => {
          const { changeHistory } = HistoryContext;
          this.changeHistory = changeHistory;
          let { DICTIONARY } = dictionaryContext;
          return (
          <LanguageContext.Consumer>{(languageContext) => {
            const { getLanguage } = languageContext;
            const language = getLanguage();
            this.language = language;
            return (
            <div className="game">

              <Category onCategoryChange = {this.setCategory}/>

              {categoryId >= 0 && ( <Images folder={folder} count={count}  imageUser={0} imageComputer={1} onImageChange={this.setImages}/> )}

              <div className="settings">
                <StartGame disabled={!disabled} onPlayerChange = {this.setFirst} />
                <Level     disabled={!disabled} onLevelChange  = {this.setLevel } />
              </div>

              {showStartButton &&  ( <div className="start-playing"><button onClick={this.gameInit}>{DICTIONARY && DICTIONARY[language].PLAY}</button></div>)}

              {categoryId >= 0 && (
                <BoardUI folder         = {folder} 
                        imageUser      = {imageUser}
                        imageComputer  = {imageComputer}
                        disabled       = {disabled}
                        board          = {board}
                        onUserPlayed   = {this.gamePlay}
                        winners        = {winners}
                        gameOver       = {gameOver} />)}
              {gameOver && ( 
                <div className="info">  
                  <Info result = {this.result}/>
                  <input className="play-again" type="button" value={DICTIONARY && DICTIONARY[language].PLAY_AGAIN} onClick={this.gameInit} />
                </div>
              )}   
            </div>        
          )}}</LanguageContext.Consumer>)
        }}</HistoryContext.Consumer>
      )}</DictionaryContext.Consumer>
    )
  }

  gameInit = () => {
    let state = {
      disabled: false, 
      showStartButton: false
    }
    if (!this.board.isEmpty){
      this.result = 0;
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
        this.gameOver(this.player === computer ? LOST : WON, winners);
      }else if (this.board.isFull){
        this.gameOver(DRAW);
      }else{
        this.player = this.player === computer ? user : computer;
        if (this.player === computer){
          window.setTimeout(this.gamePlay, this.timeout);
        }  
      } 
    }  
  }

  gameOver = (result, winners = []) => {
    this.result = result;
    this.setState(() => ({ gameOver : true, disabled: true, showStartButton: false, winners }));
    this.gameSave(result, winners);
  }

  gameSave = (result, winners) => {
    const { dispatch } = this.context;
    dispatch({type: 'ADD_GAME', game : {
      board          : [...this.board.players],
      winners        : [...winners],
      result,
      first          : this.first,
      level          : this.level,
      categoryId     : this.state.categoryId,
      imageUser      : this.state.imageUser,
      imageComputer  : this.state.imageComputer
    }});
  }

  setCategory = (category) => {
    this.setState(() => (category));
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

  componentWillUnmount() {
    this.changeHistory(1); 
  }
}

export default Game