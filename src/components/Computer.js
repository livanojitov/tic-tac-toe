import * as constants from './Dictionary';

const { EMPTY, USER, COMPUTER, EASY, HARD, NORMAL } = constants;

class Computer{

  constructor(board){
    this.board = board;
  }

  playFromTwo = () => {    
    const players = this.board.players;
    const arr = [[8,2,6], [2,8,0], [0,6,2], [6,0,8]];
    for (let i=0; i< arr.length; i++){
      if (players[arr[i][0]] === COMPUTER){
        if (players[1] === USER || players[7] === USER){
          this.board.play(COMPUTER, arr[i][1]);
          return true;
        }else if (players[3] === USER || players[5] === USER){
          this.board.play(COMPUTER, arr[i][2]);
          return true;
        }
      }
    }  
    return false;
  }

  playFromTwo1 = () => {
    const players = this.board.players;
    const arr = [[0,2,6,8],[0,6,2,8],[0,8,2,6],[2,0,6,8],[2,6,0,8],[2,8,0,6],[6,0,2,8],[6,2,0,8],[6,8,0,2],[8,0,2,6],[8,2,0,6],[8,6,0,2]];
    for (let i=0; i< arr.length; i++){
      if (players[arr[i][0]] === COMPUTER && players[arr[i][1]] === USER){
        this.board.play(COMPUTER, [arr[i][2],arr[i][3]][Math.floor(Math.random() * 2)]);
        return true;
      }
    }
    return false;     
  }

  play = () => {
    const players = this.board.players;
    const level = this.board.level;
    let winner, winners, winners1, square1, square2;
    let found = false;
    const result  = [];

    const playHard = () =>{
      if (this.board.first === USER){
        if (this.board.playsCounter === 1){
          if (players[4] === USER){
            this.board.play(COMPUTER, [0,2,6,8][Math.floor(Math.random() * 4)]);
          }else{
            this.board.play(COMPUTER, 4);
          }
          return;
        }
      }else{
        if (this.board.isEmpty){
          this.board.play(COMPUTER, [0,2,6,8,4][Math.floor(Math.random() * 5)]);
          return;
        }
        if (this.board.playsCounter === 2){
          if (this.playFromTwo()){ 
              return;
          }else{
            if (this.playFromTwo1()){
              return;
            }  
          }
        }  
      }
      if ((winner = this.board.isAboutToWin(COMPUTER)) !== -1){
        this.board.play(COMPUTER, winner);
      }else if ((winner = this.board.isAboutToWin(USER)) !== -1){
        this.board.play(COMPUTER, winner);
      }else if ((winners = this.board.canWinInTwoMovesDouble(COMPUTER)) !== -1){
        this.board.play(COMPUTER, winners[Math.floor(Math.random() * winners.length)]);  
      }else{
        winners = this.board.canWinInTwoMovesSingle(COMPUTER)
        if (winners !== -1){
          for (let i=0; i< winners.length; i++){
            for (let j=0; j< 2; j++){
              if (j === 0){
                square1 = winners[i][0];
                square2 = winners[i][1];
              }else{
                square1 = winners[i][1];
                square2 = winners[i][0];            
              }
              this.board.play(COMPUTER, square1);
              winners1 = this.board.canWinInTwoMovesDouble(USER);
              for (let k=0; k<winners1.length; k++){
                if (winners1[k] === square2){
                  found = true;
                  break;
                }
              }
              if (!found){
                result.push(square1);
              }else{
                found = false;
              }
              this.board.play(EMPTY, square1)
            }
          }
          if (result.length > 0){
            this.board.play(COMPUTER, result[Math.floor(Math.random() * result.length)]);
          }else{
            const emptySquares = this.board.emptySquares;
            this.board.play(COMPUTER,emptySquares[Math.floor(Math.random() * emptySquares.length)]);            
          }
        }else{
          const emptySquares = this.board.emptySquares;
          this.board.play(COMPUTER,emptySquares[Math.floor(Math.random() * emptySquares.length)]);            
        }
      } 
    }

    const playEasy = () =>{
      const emptySquares = this.board.emptySquares;
      this.board.play(COMPUTER,emptySquares[Math.floor(Math.random() * emptySquares.length)]);
    }

    if (level === HARD){
      playHard();
    }else if (level === EASY){
      playEasy();
    }else if (level === NORMAL){
      if (Math.floor(Math.random() * 2)){
        playHard();
      }else{
        playEasy();
      }
    }
  }
 
}

export default Computer;