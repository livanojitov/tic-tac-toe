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
import { CategoryContext }   from '../contexts/CategoryContext';
import * as constants        from './Constants';

const { USER, COMPUTER, LOST, WON, DRAW } = constants;

class Game extends Component {
  static contextType = GameContext;

  constructor(props){
    super(props);
    this.board = new Board();
    this.first = USER; 
    this.player = this.first;   
    this.computer = new Computer(this.board);    
    this.level  = 0;
    this.timeout = 1;    
    this.result = 0;
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
     <CategoryContext.Consumer>{(categoryContext) => ( 
      <DictionaryContext.Consumer>{(dictionaryContext) => (
        <HistoryContext.Consumer>{(HistoryContext) => (
          <LanguageContext.Consumer>{(languageContext) => {
          const { changeHistory } = HistoryContext;
          const { getLanguage } = languageContext;
          const language = getLanguage();
          this.changeHistory = changeHistory;
          let { DICTIONARY } = dictionaryContext;
          let { CATEGORIES } = categoryContext;
          return (
            <div className="game">

             { DICTIONARY && CATEGORIES && ( <Category onCategoryChange = {this.setCategory}/> )}

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
            </div>  )      
          }}</LanguageContext.Consumer>
        )}</HistoryContext.Consumer>
      )}</DictionaryContext.Consumer>
     )}</CategoryContext.Consumer>
    
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
        if (this.first === COMPUTER){
          this.gamePlay();
        }  
      }
    );
  }

  gamePlay = (e) => {
    if (!this.state.gameOver){
      if (this.player === COMPUTER){
        this.computer.play();
      }else{
          this.board.play(USER, e.target.id); 
      }
      this.setState(() => ({board : this.board.players}));
      let winners = this.board.isAWinner(this.player);
      if (winners){
        this.gameOver(this.player === COMPUTER ? LOST : WON, winners);
      }else if (this.board.isFull){
        this.gameOver(DRAW);
      }else{
        this.player = this.player === COMPUTER ? USER : COMPUTER;
        if (this.player === COMPUTER){
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