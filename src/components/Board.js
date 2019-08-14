const empty = 0;
const computer = 1;
const user = 2;
let   board = null;
let   squareNumbers = 9;

let check = function (player, square1, square2, square3){
  return (((board[square1] === player && board[square2] === player && board[square3] === empty)  && [square3, square1, square2]) ||
          ((board[square1] === player && board[square2] === empty  && board[square3] === player) && [square2, square3, square1]) ||
          ((board[square1] === empty  && board[square2] === player && board[square3] === player) && [square1, square3, square2]) || -1);
}

class Board {
  constructor(){
    board = Array(squareNumbers).fill(empty);
  }

  reset(){
    board = Array(squareNumbers).fill(empty);
  }

  play(player, square){
    if (square >= 0 && square < board.length && (player === computer || player === user)){
      board[square] = player;
    }  
  }

  getBoard(){
    return [...board];
  }

  getSquare(square){
    if (square >= 0 && square < board.length){
      return board[square];
    }
  }

  isAboutToWin(player){
    let square;
    return (
    (!((square = check(player, 0, 1, 2)) === -1 ) && square) || 
    (!((square = check(player, 3, 4, 5)) === -1 ) && square) || 
    (!((square = check(player, 6, 7, 8)) === -1 ) && square) || 
    (!((square = check(player, 0, 3, 6)) === -1 ) && square) || 
    (!((square = check(player, 1, 4, 7)) === -1 ) && square) || 
    (!((square = check(player, 2, 5, 8)) === -1 ) && square) || 
    (!((square = check(player, 0, 4, 8)) === -1 ) && square) || 
    (!((square = check(player, 2, 4, 6)) === -1 ) && square) || -1);
  }

  notEmptySquares(){
    let counter = 0;
    for (let i=0; i< board.length; i++){
      if (board[i] !== empty){
        counter++;
      }
    }
    return counter;    
  }

  isFull(){
    return !board.includes(0);
  }

  isEmpty(){
    return (!(board.includes(computer) || board.includes(user)));
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

  getEmptySquares(){
    const emptySquares = [];
    for (let i = 0; i < board.length; i++){
      if (board[i] === empty){
        emptySquares.push(i);
      }
    }
    return emptySquares;
  }
}

export default Board;