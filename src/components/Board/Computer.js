import * as constants from "../../Constants";

const { EMPTY, USER, COMPUTER, HARD } = constants;

class Computer {
  constructor(board) {
    this.board = board;
  }

  canWinInTwoMovesDouble = () => {
    let squares = this.board.canWinInTwoMovesDouble(COMPUTER);

    if (squares !== -1) {
      return squares[Math.floor(Math.random() * squares.length)];
    }
    return -1;
  };

  playSecondTime = () => {
    const players = this.board.players;

    if (players[4] === COMPUTER) {
      let square = [0, 2, 6, 8][Math.floor(Math.random() * 4)];
      while (players[square] !== EMPTY) {
        square = [0, 2, 6, 8][Math.floor(Math.random() * 4)];
      }
      this.board.place(COMPUTER, square);
    } else if (players[4] === USER) {
      this.playRandomly();
    } else {
      this.board.place(COMPUTER, 4);
    }
  };

  playSmart = () => {
    let squares = this.board.canWinInTwoMovesSingle(COMPUTER);
    if (squares !== -1) {
      for (let square = 0; square < squares.length; square++) {
        this.board.place(COMPUTER, squares[square]);
        let squareComputer = this.board.isAboutToWin(COMPUTER);
        let squaresUser = this.board.canWinInTwoMovesDouble(USER);
        if (squaresUser !== -1 && squaresUser.indexOf(squareComputer) !== -1) {
          this.board.place(EMPTY, squares[square]);
        } else {
          return true;
        }
      }
    }
    return false;
  };

  playContinue = () => {
    let square;

    if ((square = this.board.isAboutToWin(COMPUTER)) !== -1) {
      return this.board.place(COMPUTER, square);
    } else if ((square = this.board.isAboutToWin(USER)) !== -1) {
      return this.board.place(COMPUTER, square);
    } else if ((square = this.canWinInTwoMovesDouble()) !== -1) {
      return this.board.place(COMPUTER, square);
    }
    return false;
  };

  playHard = () => {
    const players = this.board.players;
    let moves = this.board.moves;

    switch (this.board.first) {
      case USER:
        if (moves === 1) {
          this.board.place(
            COMPUTER,
            players[4] === USER
              ? [0, 2, 6, 8][Math.floor(Math.random() * 4)]
              : 4
          );
        } else {
          if (this.playContinue()) {
            break;
          }
          if (this.playSmart()) {
            break;
          }
          this.playRandomly();
        }
        break;

      case COMPUTER:
        if (this.board.isEmpty) {
          this.board.place(
            COMPUTER,
            [0, 2, 6, 8, 4][Math.floor(Math.random() * 5)]
          );
        } else if (moves === 2) {
          this.playSecondTime();
        } else {
          if (this.playContinue()) {
            break;
          }
          let squares = this.board.canWinInTwoMovesSingle(COMPUTER);
          if (squares !== -1) {
            this.board.place(
              COMPUTER,
              squares[Math.floor(Math.random() * squares.length)]
            );
            break;
          }
          this.playRandomly();
        }
        break;

      default:
    }
  };

  playRandomly = () => {
    const squares = this.board.emptySquares;

    this.board.place(
      COMPUTER,
      squares[Math.floor(Math.random() * squares.length)]
    );
  };

  play = () => {
    const level = this.board.level;

    if (level === HARD) {
      this.playHard();
    } else {
      this.playRandomly();
    }
  };
}

export default Computer;
