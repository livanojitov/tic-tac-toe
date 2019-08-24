import * as constants from './Constants';
const { empty, user, computer, easy, hard,totalSquares } = constants;
let   board = null;
let   _first = user;
let   _level = easy;
let   playsCounter = 0;

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

  get playsCounter(){
    return playsCounter;
  } 

  get isFull(){
    return !board.includes(empty);
  }

  get isEmpty(){
    return (!(board.includes(computer) || board.includes(user)));
  }

  get emptySquares(){
    return board.reduce((arr, square, index )=> {
      if (square === empty){
        arr.push(index);
      }
      return arr;
    }, []);
  }

  get players(){
    return [...board];
  }

  reset(){
    board = Array(totalSquares).fill(empty);
    playsCounter = 0;
  }

  play(player, square){
    if (square >= 0 && square < board.length && (player === computer || player === user || player === empty)){
      board[square] = player;
      if (player !== empty){
        playsCounter++;
      }else{
        playsCounter--;
      }  
      return true;
    }else{
      return false;
    }
  }

  isAboutToWin(player){
    const arr = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    let square0, square1, square2;

    for (let i=0; i<arr.length; i++){
      square0 = arr[i][0];
      square1 = arr[i][1];
      square2 = arr[i][2]; 
      if (board[square0] === player && board[square1] === player  && board[square2] === empty){
        return square2;
      }
      if (board[square0] === player  && board[square1] === empty && board[square2] === player){
        return square1;
      }
      if (board[square0] === empty  && board[square1] === player  && board[square2] === player){
        return square0;
      }
    }
    return -1
  }

  canWinInTwoMovesSingle = (player) => {
    const arr = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
    const result = [];
    let square0, square1, square2;

    for (let i=0; i<arr.length; i++){
      square0 = arr[i][0];
      square1 = arr[i][1];
      square2 = arr[i][2]; 
      if (board[square0] === player && board[square1] === empty  && board[square2] === empty){
        result.push([square1, square2]);
      }
      if (board[square0] === empty  && board[square1] === player && board[square2] === empty){
        result.push([square0, square2]);
      }
      if (board[square0] === empty  && board[square1] === empty  && board[square2] === player){
        result.push([square0, square1]);
      }
    }
    if (result.length > 0){
      return result;
    }else{
      return -1;
    }      
  }

  canWinInTwoMovesDouble = (player) => {
    const arr = [ [0,1,2,3,6], [0,1,2,4,8], [0,3,6,4,8], [2,0,1,5,8], [2,0,1,4,6], [2,5,8,4,6], [6,0,3,7,8], [6,0,3,2,4], [6,2,4,7,8], [8,6,7,2,5], [8,6,7,0,4], [8,2,5,0,4], [1,0,2,4,7], [3,0,6,4,5], [5,2,8,3,4], [7,1,4,6,8]];
    const result = [];
    let square0, square1, square2, square3, square4;
    for (let i=0; i<arr.length; i++){
      square0 = arr[i][0];
      square1 = arr[i][1];
      square2 = arr[i][2];
      square3 = arr[i][3];
      square4 = arr[i][4];
      if (board[square0] === empty && 
        ((board[square1] === empty && board[square2] === player) || (board[square1] === player && board[square2] === empty)) && 
        ((board[square3] === empty && board[square4] === player) || (board[square3] === player && board[square4] === empty))){
        result.push(square0);
      }
    }
    if (result.length > 0){
      return result;
    }else{
      return -1;
    }  
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