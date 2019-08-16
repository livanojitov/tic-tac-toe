const empty = 0;
const computer = 1;
const user = 2;
const hard = 2;

class Computer{
  constructor(board, startingPlayer, level){
    this.board = board;
    this.startingPlayer = startingPlayer;
    this.level = level;
  }

  setLevel(level){
    this.level = level;
  }

  setStartingPlayer(startingPlayer){
    this.startingPlayer = startingPlayer;
  }

  playRandomly(){
    this.board.play(computer, [0,2,6,8][Math.floor(Math.random() * 4)]);
  }

  playFromTwo = (square1, square2, square3) => {    
    const board = this.board.getBoard();

    if (board[square1] === computer){
      if (board[1] === user || board[7] === user){
        this.board.play(computer, square2);
        return true;
      }else if (board[3] === user || board[5] === user){
        this.board.play(computer, square3);
        return true;
      }
    }
    return false;
  }

  playFromTwo1 = (square1, square2, square3, square4) => {
    const board = this.board.getBoard();  
    if (board[square1] === computer && board[square2] === user){
      this.board.play(computer, [square3,square4][Math.floor(Math.random() * 2)]);
      return true;
    }else{
      return false;
    }
  }  

  check(square1, square2, square3, square4, square5){
    const board = this.board.getBoard();
    if (board[square1] === empty && 
        ((board[square2] === empty && board[square3] === computer) || (board[square2] === computer && board[square3] === empty)) && 
        ((board[square4] === empty && board[square5] === computer) || (board[square4] === computer && board[square5] === empty))){
      this.board.play(computer, square1);
      return true;
    }else{
      return false;
    }
  }

  checkForDoubleWinning = () => {
    return (
      this.check(0,1,2,3,6) || this.check(0,1,2,4,8) || this.check(0,3,6,4,8) || this.check(2,0,1,5,8) || 
      this.check(2,0,1,4,6) || this.check(2,5,8,4,6) || this.check(6,0,3,7,8) || this.check(6,0,3,2,4) || 
      this.check(6,2,4,7,8) || this.check(8,6,7,2,5) || this.check(8,6,7,0,4) || this.check(8,2,5,0,4) ||
      this.check(1,0,2,4,7) || this.check(3,0,6,4,5) || this.check(5,2,8,3,4) || this.check(7,1,4,6,8));
  }

  check1(square1, square2, square3){
    const board = this.board.getBoard();
    if (board[square1] === computer && board[square2] === empty && board[square3] === empty){
      this.board.play(computer, [square2, square3][Math.floor(Math.random() * 2)]);
      return true;
    }
    if (board[square1] === empty && board[square2] === computer && board[square3] === empty){
      this.board.play(computer, [square1, square3][Math.floor(Math.random() * 2)]);
      return true;
    }
    if (board[square1] === empty && board[square2] === empty && board[square3] === computer){
      this.board.play(computer, [square1, square2][Math.floor(Math.random() * 2)]);
      return true;
    }
    return false;
  }

  checkForSingleWinning = () => {
    return (
      this.check1(0,1,2) || this.check1(3,4,5) || this.check1(6,7,8) || this.check1(0,3,6) || 
      this.check1(1,4,7) || this.check1(2,5,8) || this.check1(0,4,8) || this.check1(2,4,6));
  }

  play = () => {

    const board = this.board.getBoard();
    let winnerSquares;

    if (this.level === hard){
      
      if (this.startingPlayer === user){
        if (this.board.totalSquaresPlayed() === 1){
          if (board[4] === user){
            this.board.play(computer, [0,2,6,8][Math.floor(Math.random() * 4)]);
          }else{
            this.board.play(computer, 4);
          }
          return;
        }

        if (this.board.totalSquaresPlayed() === 3){
          if ((board[0] === computer && board[4] === user && board[8] === user) || 
              (board[0] === user     && board[4] === user && board[8] === computer)){
            this.board.play(computer, [2,6][Math.floor(Math.random() * 2)]);
            return;
          }else if ((board[2] === computer && board[4] === user && board[6] === user) || 
                    (board[2] === user     && board[4] === user && board[6] === computer)){
            this.board.play(computer, [0,8][Math.floor(Math.random() * 2)]);
            return;
          }else if (board[4] === computer && ((board[0] === user && board[8] === user) || (board[2] === user && board[6] === user))){
            this.board.play(computer, [1,3,5,7][Math.floor(Math.random() * 4)]);
            return;
          }
        }

      } 

      if (this.startingPlayer === computer){
        if (this.board.totalSquaresPlayed() === 2){
          if (this.playFromTwo(8,2,6)    || this.playFromTwo(2,8,0)    || this.playFromTwo(0,6,2)    || this.playFromTwo(6,0,8)   || 
              this.playFromTwo1(0,2,6,8) || this.playFromTwo1(0,6,2,8) || this.playFromTwo1(0,8,2,6) || this.playFromTwo1(2,0,6,8)||
              this.playFromTwo1(2,6,0,8) || this.playFromTwo1(2,8,0,6) || this.playFromTwo1(6,0,2,8) || this.playFromTwo1(6,2,0,8)||
              this.playFromTwo1(6,8,0,2) || this.playFromTwo1(8,0,2,6) || this.playFromTwo1(8,2,0,6) || this.playFromTwo1(8,6,0,2)){
              return;
          }
        }  
      }

      winnerSquares = this.board.isAboutToWin(computer);
      if (winnerSquares !== -1){
        this.board.play(computer, winnerSquares[0]);
        return;
      }
  
      winnerSquares = this.board.isAboutToWin(user);
      if (winnerSquares !== -1){
        this.board.play(computer, winnerSquares[0]);
        return;
      }
  
      if (this.level === hard){
        if (this.checkForDoubleWinning()){
          return;
        }
        if (this.checkForSingleWinning()){
          return;
        }
      }  
    }   

    const emptySquares = this.board.getEmptySquares();
    this.board.play(computer,emptySquares[Math.floor(Math.random() * emptySquares.length)]);      
  }
}

export default Computer;