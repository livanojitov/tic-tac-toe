import * as constants from "../../Constants";
const { EMPTY, USER, COMPUTER, RANDOM, HARD, TOTAL_SQUARES } = constants;

export const INVALID_LEVEL_TXT = "Invalid level";
export const INVALID_PLAYER_TXT = "Invalid player";
export const INVALID_SQUARE_TXT = "Invalid square";

let board = null;
let _first = USER;
let _level = RANDOM;
let _moves = 0;

class Board {
  constructor(first = USER, level = RANDOM) {
    board = Array(TOTAL_SQUARES).fill(EMPTY);
    _first = first;
    _level = level;
  }

  get level() {
    return _level;
  }

  set level(level) {
    if (level !== RANDOM && level !== HARD) {
      throw new Error(INVALID_LEVEL_TXT);
    }
    _level = level;
  }

  get first() {
    return _first;
  }

  set first(first) {
    if (first !== COMPUTER && first !== USER) {
      throw new Error(INVALID_PLAYER_TXT);
    }
    _first = first;
  }

  get moves() {
    return _moves;
  }

  get isFull() {
    return !board.includes(EMPTY);
  }

  get isEmpty() {
    return !(board.includes(COMPUTER) || board.includes(USER));
  }

  get emptySquares() {
    return board.reduce((arr, square, index) => {
      if (square === EMPTY) {
        arr.push(index);
      }
      return arr;
    }, []);
  }

  get players() {
    return [...board];
  }

  reset() {
    board.fill(EMPTY);
    _moves = 0;
  }

  checkPlayer(player) {
    if (player !== COMPUTER && player !== USER && player !== EMPTY) {
      throw new Error(INVALID_PLAYER_TXT);
    }
  }

  place(player, square) {
    if (square < 0 || square > board.length) {
      throw new Error(INVALID_SQUARE_TXT);
    }

    this.checkPlayer(player);

    board[square] = player;
    if (player !== EMPTY) {
      _moves++;
    } else {
      _moves--;
    }

    return true;
  }

  isAboutToWin(player) {
    this.checkPlayer(player);

    const arr = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let square0, square1, square2;

    for (let i = 0; i < arr.length; i++) {
      [square0, square1, square2] = arr[i];

      if (
        board[square0] === player &&
        board[square1] === player &&
        board[square2] === EMPTY
      ) {
        return square2;
      }

      if (
        board[square0] === player &&
        board[square1] === EMPTY &&
        board[square2] === player
      ) {
        return square1;
      }

      if (
        board[square0] === EMPTY &&
        board[square1] === player &&
        board[square2] === player
      ) {
        return square0;
      }
    }

    return -1;
  }

  canWinInTwoMovesSingle = (player) => {
    this.checkPlayer(player);

    const arr = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const result = [];
    let square0, square1, square2;

    for (let i = 0; i < arr.length; i++) {
      [square0, square1, square2] = arr[i];

      if (
        board[square0] === player &&
        board[square1] === EMPTY &&
        board[square2] === EMPTY
      ) {
        result.push(square1);
        result.push(square2);
      }

      if (
        board[square0] === EMPTY &&
        board[square1] === player &&
        board[square2] === EMPTY
      ) {
        result.push(square0);
        result.push(square2);
      }

      if (
        board[square0] === EMPTY &&
        board[square1] === EMPTY &&
        board[square2] === player
      ) {
        result.push(square0);
        result.push(square1);
      }
    }

    if (result.length > 0) {
      return result;
    }

    return -1;
  };

  canWinInTwoMovesDouble = (player) => {
    this.checkPlayer(player);

    const arr = [
      [0, 1, 2, 3, 6],
      [0, 1, 2, 4, 8],
      [0, 3, 6, 4, 8],
      [2, 0, 1, 5, 8],
      [2, 0, 1, 4, 6],
      [2, 5, 8, 4, 6],
      [6, 0, 3, 7, 8],
      [6, 0, 3, 2, 4],
      [6, 2, 4, 7, 8],
      [8, 6, 7, 2, 5],
      [8, 6, 7, 0, 4],
      [8, 2, 5, 0, 4],
      [1, 0, 2, 4, 7],
      [3, 0, 6, 4, 5],
      [5, 2, 8, 3, 4],
      [7, 1, 4, 6, 8],
    ];
    const result = [];
    let square0, square1, square2, square3, square4;

    for (let i = 0; i < arr.length; i++) {
      [square0, square1, square2, square3, square4] = arr[i];

      if (
        board[square0] === EMPTY &&
        ((board[square1] === EMPTY && board[square2] === player) ||
          (board[square1] === player && board[square2] === EMPTY)) &&
        ((board[square3] === EMPTY && board[square4] === player) ||
          (board[square3] === player && board[square4] === EMPTY))
      ) {
        result.push(square0);
      }
    }

    if (result.length > 0) {
      return result;
    }

    return -1;
  };

  isAWinner(player) {
    this.checkPlayer(player);

    return (
      (board[0] === player &&
        board[1] === player &&
        board[2] === player && [0, 1, 2]) ||
      (board[3] === player &&
        board[4] === player &&
        board[5] === player && [3, 4, 5]) ||
      (board[6] === player &&
        board[7] === player &&
        board[8] === player && [6, 7, 8]) ||
      (board[0] === player &&
        board[3] === player &&
        board[6] === player && [0, 3, 6]) ||
      (board[1] === player &&
        board[4] === player &&
        board[7] === player && [1, 4, 7]) ||
      (board[2] === player &&
        board[5] === player &&
        board[8] === player && [2, 5, 8]) ||
      (board[0] === player &&
        board[4] === player &&
        board[8] === player && [0, 4, 8]) ||
      (board[2] === player &&
        board[4] === player &&
        board[6] === player && [2, 4, 6]) ||
      []
    );
  }
}

export default Board;
