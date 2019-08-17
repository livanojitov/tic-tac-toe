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

  play = () => {

    const board = this.board.getBoard();
    let winnerSquare;

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
        if (this.board.isEmpty()){
          this.board.play(computer, [0,2,6,8,4][Math.floor(Math.random() * 5)]);
          return;
        }
        if (this.board.totalSquaresPlayed() === 2){
          if (this.playFromTwo(8,2,6)    || this.playFromTwo(2,8,0)    || this.playFromTwo(0,6,2)    || this.playFromTwo(6,0,8)   || 
              this.playFromTwo1(0,2,6,8) || this.playFromTwo1(0,6,2,8) || this.playFromTwo1(0,8,2,6) || this.playFromTwo1(2,0,6,8)||
              this.playFromTwo1(2,6,0,8) || this.playFromTwo1(2,8,0,6) || this.playFromTwo1(6,0,2,8) || this.playFromTwo1(6,2,0,8)||
              this.playFromTwo1(6,8,0,2) || this.playFromTwo1(8,0,2,6) || this.playFromTwo1(8,2,0,6) || this.playFromTwo1(8,6,0,2)){
              return;
          }
        }  
      } 

      winnerSquare = this.board.isAboutToWin(computer);
      if (winnerSquare !== -1){
        this.board.play(computer, winnerSquare[0]);
        return;
      }
      
      winnerSquare = this.board.isAboutToWin(user);
      if (winnerSquare !== -1){
        this.board.play(computer, winnerSquare[0]);
        return;
      }
  
      winnerSquare = this.board.canWinInTwoMovesDouble(computer);
      if (winnerSquare !== -1){
        this.board.play(computer, winnerSquare[0]);
        return;
      }

      winnerSquare = this.board.canWinInTwoMovesSingle(computer);
      if (winnerSquare !== -1){
        this.board.play(computer, winnerSquare[Math.floor(Math.random() * 2)]);
        return;
      }
       
    }   

    const emptySquares = this.board.getEmptySquares();
    this.board.play(computer,emptySquares[Math.floor(Math.random() * emptySquares.length)]);      
  }
}

export default Computer;