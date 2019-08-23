import * as constants from './Constants';
const { empty, user, computer, easy, hard,totalSquares } = constants;
let   board = null;
let   _first = user;
let   _level = easy;
let   totalSquaresPlayed = 0;

class Board {
  constructor(first = user, level = easy){
    board = Array(totalSquares).fill(empty);
    this.level = level;
    this.first = first;
  }

  get empty(){
    return empty;
  }

  get computer(){
    return computer;
  }

  get user(){
    return user;
  }

  get easy(){
    return easy;
  }

  get hard(){
    return hard;
  }

  get level(){
    return _level;
  }

  set level(level){
    if (level === easy || level === hard){
      _level = level;
    }else{
      throw new Error('Invalid level');
    }
  }

  get first(){
    return _first;
  }

  set first(first){
    if (first === computer || first === user){
      _first = first;
    }else{
      throw new Error('Invalid starting player');
    }  
  }

  get totalSquaresPlayed(){
    return totalSquaresPlayed;
  } 

  get isFull(){
    return !board.includes(empty);
  }

  get isEmpty(){
    return (!(board.includes(computer) || board.includes(user)));
  }

  get emptySquaresIndexes(){
    return board.reduce((arr, square, index )=> {
      if (square === empty){
        arr.push(index);
      }
      return arr;
    }, []);
  }

  get squares(){
    return [...board];
  }

  reset(){
    board = Array(totalSquares).fill(empty);
    totalSquaresPlayed = 0;
  }

  play(player, square){
    if (square >= 0 && square < board.length && (player === computer || player === user || player === empty)){
      board[square] = player;
      if (player !== empty){
        totalSquaresPlayed++;
      }else{
        totalSquaresPlayed--;
      }  
      return true;
    }else{
      return false;
    }
  }

  getPlayer(square){
    if (square >= 0 && square < board.length){
      return board[square];
    }else{
      return -1;
    }
  }

  isAboutToWin_(player, square1, square2, square3){
    return (((board[square1] === player && board[square2] === player && board[square3] === empty)  && [square3]) ||
            ((board[square1] === player && board[square2] === empty  && board[square3] === player) && [square2]) ||
            ((board[square1] === empty  && board[square2] === player && board[square3] === player) && [square1]) || -1);
  }

  isAboutToWin(player){
    let square;
    return (
    (!((square = this.isAboutToWin_(player, 0, 1, 2)) === -1 ) && square) || 
    (!((square = this.isAboutToWin_(player, 3, 4, 5)) === -1 ) && square) || 
    (!((square = this.isAboutToWin_(player, 6, 7, 8)) === -1 ) && square) || 
    (!((square = this.isAboutToWin_(player, 0, 3, 6)) === -1 ) && square) || 
    (!((square = this.isAboutToWin_(player, 1, 4, 7)) === -1 ) && square) || 
    (!((square = this.isAboutToWin_(player, 2, 5, 8)) === -1 ) && square) || 
    (!((square = this.isAboutToWin_(player, 0, 4, 8)) === -1 ) && square) || 
    (!((square = this.isAboutToWin_(player, 2, 4, 6)) === -1 ) && square) || -1);
  }

  canWinInTwoMovesSingle_(player, square1, square2, square3){
    return (((board[square1] === player && board[square2] === empty  && board[square3] === empty)  && [square2, square3]) ||
            ((board[square1] === empty  && board[square2] === player && board[square3] === empty)  && [square1, square3]) ||
            ((board[square1] === empty  && board[square2] === empty  && board[square3] === player) && [square1, square2]) || -1);
  }

  canWinInTwoMovesSingle = (player) => {
    let square;
    return (
      (!((square = this.canWinInTwoMovesSingle_(player,0,1,2)) === -1 ) && square) || 
      (!((square = this.canWinInTwoMovesSingle_(player,3,4,5)) === -1 ) && square) || 
      (!((square = this.canWinInTwoMovesSingle_(player,6,7,8)) === -1 ) && square) || 
      (!((square = this.canWinInTwoMovesSingle_(player,0,3,6)) === -1 ) && square) || 
      (!((square = this.canWinInTwoMovesSingle_(player,1,4,7)) === -1 ) && square) || 
      (!((square = this.canWinInTwoMovesSingle_(player,2,5,8)) === -1 ) && square) || 
      (!((square = this.canWinInTwoMovesSingle_(player,0,4,8)) === -1 ) && square) || 
      (!((square = this.canWinInTwoMovesSingle_(player,2,4,6)) === -1 ) && square) || -1);
  }

  canWinInTwoMovesDouble_(player, square1, square2, square3, square4, square5){
    if (board[square1] === empty && 
        ((board[square2] === empty && board[square3] === player) || (board[square2] === player && board[square3] === empty)) && 
        ((board[square4] === empty && board[square5] === player) || (board[square4] === player && board[square5] === empty))){
      return [square1];
    }else{
      return -1;
    }
  }

  canWinInTwoMovesDouble = (player) => {
    let square;
    return (
      (!((square = this.canWinInTwoMovesDouble_(player,0,1,2,3,6)) === -1 ) && square) || 
      (!((square = this.canWinInTwoMovesDouble_(player,0,1,2,4,8)) === -1 ) && square) || 
      (!((square = this.canWinInTwoMovesDouble_(player,0,3,6,4,8)) === -1 ) && square) || 
      (!((square = this.canWinInTwoMovesDouble_(player,2,0,1,5,8)) === -1 ) && square) || 
      (!((square = this.canWinInTwoMovesDouble_(player,2,0,1,4,6)) === -1 ) && square) || 
      (!((square = this.canWinInTwoMovesDouble_(player,2,5,8,4,6)) === -1 ) && square) || 
      (!((square = this.canWinInTwoMovesDouble_(player,6,0,3,7,8)) === -1 ) && square) || 
      (!((square = this.canWinInTwoMovesDouble_(player,6,0,3,2,4)) === -1 ) && square) || 
      (!((square = this.canWinInTwoMovesDouble_(player,6,2,4,7,8)) === -1 ) && square) || 
      (!((square = this.canWinInTwoMovesDouble_(player,8,6,7,2,5)) === -1 ) && square) || 
      (!((square = this.canWinInTwoMovesDouble_(player,8,6,7,0,4)) === -1 ) && square) || 
      (!((square = this.canWinInTwoMovesDouble_(player,8,2,5,0,4)) === -1 ) && square) ||
      (!((square = this.canWinInTwoMovesDouble_(player,1,0,2,4,7)) === -1 ) && square) || 
      (!((square = this.canWinInTwoMovesDouble_(player,3,0,6,4,5)) === -1 ) && square) || 
      (!((square = this.canWinInTwoMovesDouble_(player,5,2,8,3,4)) === -1 ) && square) || 
      (!((square = this.canWinInTwoMovesDouble_(player,7,1,4,6,8)) === -1 ) && square) || -1);
  }

  isAWinner(player){
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

export default Board;