import Board    from './Board';
import User     from './User';
import Computer from './Computer';

const user = 2;
const easy = 1;

class TicTacToe {
  constructor(){
    this.board = new Board();
    this.user = new User(this.board);
    this.computer = new Computer(this.board, user, easy);
  }

  setLevel(level){
    this.computer.setLevel(level);
  }

  setPlayer(startingPlayer){
    this.computer.setStartingPlayer(startingPlayer);
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