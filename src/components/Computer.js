class Computer{
  constructor(board){
    this.board = board;
  }

  playFromTwo = (square1, square2, square3) => {    
    const squares = this.board.squares;
    const user  = this.board.user;
    const computer = this.board.computer;

    if (squares[square1] === computer){
      if (squares[1] === user || squares[7] === user){
        this.board.play(computer, square2);
        return true;
      }else if (squares[3] === user || squares[5] === user){
        this.board.play(computer, square3);
        return true;
      }
    }
    return false;
  }

  playFromTwo1 = (square1, square2, square3, square4) => {
    const squares = this.board.squares;  
    const user  = this.board.user;
    const computer = this.board.computer;    

    if (squares[square1] === computer && squares[square2] === user){
      this.board.play(computer, [square3,square4][Math.floor(Math.random() * 2)]);
      return true;
    }else{
      return false;
    }
  }  

  play = () => {
    const squares = this.board.squares;
    const empty = this.board.empty;
    const computer = this.board.computer;
    const user  = this.board.user;
    const hard = this.board.hard;
    const level = this.board.level;
    let winnerSquare;

    if (level === hard){
      if (this.board.startingPlayer === user){
        if (this.board.totalSquaresPlayed === 1){
          if (squares[4] === user){
            this.board.play(computer, [0,2,6,8][Math.floor(Math.random() * 4)]);
          }else{
            this.board.play(computer, 4);
          }
          return;
        }
        if (this.board.totalSquaresPlayed === 3){
          if ((squares[0] === computer && squares[4] === user && squares[8] === user) || 
              (squares[0] === user     && squares[4] === user && squares[8] === computer)){
            this.board.play(computer, [2,6][Math.floor(Math.random() * 2)]);
            return;
          }else if ((squares[2] === computer && squares[4] === user && squares[6] === user) || 
                    (squares[2] === user     && squares[4] === user && squares[6] === computer)){
            this.board.play(computer, [0,8][Math.floor(Math.random() * 2)]);
            return;
          }else if (squares[4] === computer && ((squares[0] === user && squares[8] === user) || (squares[2] === user && squares[6] === user))){
            this.board.play(computer, [1,3,5,7][Math.floor(Math.random() * 4)]);
            return;
          }
        }
      } 

      if (this.board.startingPlayer === computer){
        if (this.board.isEmpty){
          this.board.play(computer, [0,2,6,8,4][Math.floor(Math.random() * 5)]);
          return;
        }
        if (this.board.totalSquaresPlayed === 2){
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
      let winnerSquare1 = 0;
      if (winnerSquare !== -1){
        while (winnerSquare1 !== -1){
          let randomIndex = Math.floor(Math.random() * 2);
          this.board.play(computer, winnerSquare[randomIndex]);
          winnerSquare1 = this.board.canWinInTwoMovesDouble(user);
          if (winnerSquare1 !== -1){
            this.board.play(empty, winnerSquare[randomIndex]);
          }
        }
        return;
      }
       
    }   

    const emptySquares = this.board.emptySquaresIndexes;
    this.board.play(computer,emptySquares[Math.floor(Math.random() * emptySquares.length)]); 
  }
 
}

export default Computer;