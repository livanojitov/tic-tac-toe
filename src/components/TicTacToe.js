import Board  from './Board';

const empty = 0;
const computer = 1;
const user = 2;
const easy = 1;
const hard = 2;

class TicTacToe {
  constructor(){
    this.board = new Board();
    this.startingPlayer = user;
    this.level = easy;
  }

  setLevel(level){
    this.level = level;
  }

  setPlayer(startingPlayer){
    this.startingPlayer = startingPlayer;
  }

  playFromTwo = (square1, square2, square3) => {    
    const board = this.board.getBoard();

    if (board[square1] === computer){
      if (board[1] === user || board[7] === user){
        this.play(computer, square2);
        return true;
      }else if (board[3] === user || board[5] === user){
        this.play(computer, square3);
        return true;
      }
    }
    return false;
  }

  playFromFour = (arr1, arr2, arr3, arr4) => { 
    const board = this.board.getBoard();

    if (board[arr1[0]] === computer && board[arr1[1]] === user && board[arr1[2]] === computer && board[arr1[3]] === user){
      this.play(computer, arr1[4]);
      return true;
    }else if (board[arr2[0]] === computer && board[arr2[1]] === user && board[arr2[2]] === computer && board[arr2[3]] === user){
        this.play(computer, arr2[4]);
        return true;
    }else if (board[arr3[0]] === computer && board[arr3[1]] === user && board[arr3[2]] === computer && board[arr3[3]] === user){
      this.play(computer, arr3[4]);
      return true;
    }else if (board[arr4[0]] === computer && board[arr4[1]] === user && board[arr4[2]] === computer && board[arr4[3]] === user){
      this.play(computer, arr4[4]);
      return true;
    }  
    return false;
  }

  playComputer = () => {
    const board = this.board.getBoard();
    let winnerSquares;

    if (this.level === hard){
      
      if (this.startingPlayer === user){

        if (this.board.notEmptySquares() === 1){
          if (board[4] === user){
            this.play(computer, [0,2,6,8][Math.floor(Math.random() * 4)]);
          }else{
            this.play(computer, 4);
          }
          return;
        }
        
        if (this.board.notEmptySquares() === 3){
          if ((board[0] === computer && board[4] === user && board[8] === user) || 
              (board[0] === user     && board[4] === user && board[8] === computer)){
            this.play(computer, [2,6][Math.floor(Math.random() * 2)]);
            return;
          }else if ((board[2] === computer && board[4] === user && board[6] === user) || 
                    (board[2] === user     && board[4] === user && board[6] === computer)){
            this.play(computer, [0,8][Math.floor(Math.random() * 2)]);
            return;
          }else if (board[4] === computer && ((board[0] === user && board[8] === user) || (board[2] === user && board[6] === user))){
            this.play(computer, [1,3,5,7][Math.floor(Math.random() * 4)]);
            return;
          }
        }

      } 

      if (this.startingPlayer === computer){

        if (this.board.notEmptySquares() === 2){
            if (this.playFromTwo(8, 2, 6) || 
                this.playFromTwo(2, 8, 0) || 
                this.playFromTwo(0, 6, 2) || 
                this.playFromTwo(6, 0, 8)){
              return;
            }
        }

        if (this.board.notEmptySquares() === 4){
          winnerSquares = this.board.isAboutToWin(computer);
          if (winnerSquares !== -1){
            this.play(computer, winnerSquares[0]);
            return;
          }      
          if (this.playFromFour([8,1,2,5,6], [8,3,6,7,2], [8,5,6,7,0], [8,7,2,5,0]) ||
              this.playFromFour([2,1,8,5,6], [2,3,0,1,8], [2,7,8,5,0], [2,5,0,1,6]) ||
              this.playFromFour([0,1,6,3,8], [0,3,2,1,8], [0,5,2,1,6], [0,7,6,3,2]) ||
              this.playFromFour([6,1,0,3,8], [6,3,8,7,2], [6,5,8,7,0], [6,7,0,3,2]) ){
            return;
          }
        } 
      }
    }    

    winnerSquares = this.board.isAboutToWin(computer);
    if (winnerSquares !== -1){
      this.play(computer, winnerSquares[0]);
      return;
    }

    winnerSquares = this.board.isAboutToWin(user);
    if (winnerSquares !== -1){
      this.play(computer, winnerSquares[0]);
      return;
    }

    const emptySquares = this.board.getEmptySquares();
    this.play(computer,emptySquares[Math.floor(Math.random() * emptySquares.length)]);
  }

  userPlay = (square) => {
    this.play(user,square);
  }

  play(player, square){
    this.board.play(player, square);
  }  

  getBoard(){
    return this.board.getBoard();
  }

  isEmpty(){
    return this.board.isEmpty();
  }

  isFull(){
    return this.board.isFull();
  }  

  isAWinner(player){
    return this.board.isAWinner(player);
  }

  reset(){
    this.board.reset();
  }
}  

export default TicTacToe;