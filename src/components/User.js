const user = 2;

class User{
  constructor(board){
    this.board = board;
  }

  play = (square) => {
    this.board.play(user, square); 
  }
}

export default User;