import Board, {
  INVALID_LEVEL_TXT,
  INVALID_PLAYER_TXT,
  INVALID_SQUARE_TXT,
} from "../../../components/Board/Board";

import * as constants from "../../../Constants";

const { EMPTY, COMPUTER, USER, RANDOM, HARD, TOTAL_SQUARES } = constants;

const INVALID_LEVEL = 100000;
const INVALID_SQUARE = 20;
const INVALID_PLAYER = 100000;

let board;

beforeEach(() => {
  board = new Board();
});

it("should create an empty board", () => {
  expect(board.isEmpty).toBeTruthy();
});

it("should create an board of 9 squares", () => {
  expect(board.players.length).toBe(TOTAL_SQUARES);
});

it("should set level to RANDOM", () => {
  expect(board.level).toBe(RANDOM);
});

it("should set level to HARD", () => {
  board.level = HARD;

  expect(board.level).toBe(HARD);
});

it("should throw when level is invalid", () => {
  expect(() => {
    board.level = INVALID_LEVEL;
  }).toThrow(INVALID_LEVEL_TXT);
});

it("should set the starting player to be the user", () => {
  board.first = USER;

  expect(board.first).toBe(USER);
});

it("should set the starting player to be the computer", () => {
  board.first = COMPUTER;

  expect(board.first).toBe(COMPUTER);
});

it("should throw when passing an invalid player", () => {
  expect(() => {
    board.first = INVALID_PLAYER;
  }).toThrow(INVALID_PLAYER_TXT);
});

it("should set the number of moves to 0", () => {
  expect(board.moves).toBe(0);
});

it("should not have any empty square", () => {
  board.place(USER, 0);
  board.place(COMPUTER, 1);
  board.place(USER, 2);
  board.place(COMPUTER, 3);
  board.place(USER, 4);
  board.place(COMPUTER, 5);
  board.place(USER, 6);
  board.place(COMPUTER, 7);
  board.place(USER, 8);

  expect(board.isFull).toBeTruthy();
});

it("should have some empty squares", () => {
  board.place(USER, 0);
  board.place(USER, 4);
  board.place(USER, 8);

  const result = board.emptySquares;

  expect(result).toEqual([1, 2, 3, 5, 6, 7]);
});

it("should throw an invalid player error", () => {
  expect(() => {
    board.checkPlayer(INVALID_PLAYER);
  }).toThrow(INVALID_PLAYER_TXT);
});

it("should reset the board", () => {
  board.place(USER, 0);
  board.place(USER, 4);
  board.place(USER, 8);

  board.reset();

  expect(board.isEmpty).toBeTruthy();
});

it("should place player on a square", () => {
  board.place(USER, 5);

  expect(board.players[5]).toBe(USER);
});

it("should throw when trying to place a player in an invalid square", () => {
  expect(() => {
    board.place(USER, INVALID_SQUARE);
  }).toThrow(INVALID_SQUARE_TXT);
});

it("should throw when trying to place an invalid player in an square", () => {
  expect(() => {
    board.place(INVALID_PLAYER, 0);
  }).toThrow(INVALID_PLAYER_TXT);
});

it("should decrement the number of moves", () => {
  board.place(COMPUTER, 0);
  const moves = board.moves;

  board.place(EMPTY, 0);

  expect(board.moves).toBe(moves - 1);
});

it("should expect the user to be about to win the game", () => {
  board.place(USER, 0);
  board.place(COMPUTER, 1);
  board.place(USER, 4);
  board.place(COMPUTER, 3);

  expect(board.isAboutToWin(USER)).not.toBe(-1);

  board.reset();

  board.place(USER, 0);
  board.place(COMPUTER, 5);
  board.place(USER, 2);
  board.place(COMPUTER, 3);

  expect(board.isAboutToWin(USER)).not.toBe(-1);

  board.reset();

  board.place(USER, 1);
  board.place(COMPUTER, 5);
  board.place(USER, 2);
  board.place(COMPUTER, 3);

  expect(board.isAboutToWin(USER)).not.toBe(-1);
});

it("should not expect the user to be about to win the game", () => {
  board.place(USER, 0);

  expect(board.isAboutToWin(USER)).toBe(-1);
});

it("should throw when checking that the player who is about to win the game is invalid", () => {
  board.place(USER, 0);
  board.place(COMPUTER, 1);
  board.place(USER, 4);
  board.place(COMPUTER, 3);

  expect(() => {
    board.isAboutToWin(INVALID_PLAYER);
  }).toThrow(INVALID_PLAYER_TXT);
});

it("should throw when checking that the player who is about to win the game in two moves single is invalid", () => {
  expect(() => {
    board.canWinInTwoMovesSingle(INVALID_PLAYER);
  }).toThrow(INVALID_PLAYER_TXT);
});

it("should expect to win in two moves single", () => {
  const arr = [
    [0, 1, 2],
    [1, 0, 2],
    [2, 0, 1],
  ];

  for (let i = 0; i < arr.length; i++) {
    board.place(USER, arr[i][0]);

    const result = board.canWinInTwoMovesSingle(USER);

    expect(
      result.filter((value) => [arr[i][1], arr[i][2]].includes(value))
    ).toEqual([arr[i][1], arr[i][2]]);

    board.reset();
  }
});

it("should not expect to win in two moves single", () => {
  board.place(COMPUTER, 0);
  board.place(USER, 1);
  board.place(COMPUTER, 4);
  board.place(USER, 3);

  expect(board.canWinInTwoMovesSingle(USER)).toBe(-1);
});

it("should throw checking that the player who is about to win the game in two moves double is invalid", () => {
  expect(() => {
    board.canWinInTwoMovesDouble(INVALID_PLAYER);
  }).toThrow(INVALID_PLAYER_TXT);
});

it("should expect to win in two moves double", () => {
  const arr = [0, 1, 2, 3, 6];

  board.place(USER, arr[1]);
  board.place(COMPUTER, 4);
  board.place(USER, arr[3]);
  board.place(COMPUTER, 7);

  const result = board.canWinInTwoMovesDouble(USER);

  expect(result.filter((value) => [arr[0]].includes(value))).toEqual([arr[0]]);
});

it("should not expect to win in two moves double", () => {
  board.place(COMPUTER, 0);
  board.place(USER, 1);
  board.place(COMPUTER, 4);
  board.place(USER, 3);

  expect(board.canWinInTwoMovesDouble(USER)).toBe(-1);
});

it("should expect the user to be the winner of the game", () => {
  const arr = [
    [0, 1, 2, 3, 4],
    [3, 4, 5, 0, 1],
    [6, 7, 8, 0, 1],
    [0, 3, 6, 1, 2],
    [1, 4, 7, 0, 2],
    [2, 5, 8, 0, 1],
    [0, 4, 8, 1, 2],
    [2, 4, 6, 0, 1],
  ];

  for (let i = 0; i < arr.length; i++) {
    board.place(USER, arr[i][0]);
    board.place(COMPUTER, arr[i][3]);
    board.place(USER, arr[i][1]);
    board.place(COMPUTER, arr[i][4]);
    board.place(USER, arr[i][2]);

    expect(board.isAWinner(USER)).not.toEqual([]);

    board.reset();
  }
});

it("should expect the game to be a tie", () => {
  board.place(COMPUTER, 0);
  board.place(USER, 1);
  board.place(COMPUTER, 2);
  board.place(USER, 3);
  board.place(COMPUTER, 4);
  board.place(USER, 5);
  board.place(USER, 6);
  board.place(COMPUTER, 7);
  board.place(USER, 8);

  expect(board.isFull).toBeTruthy();
  expect(board.isAWinner(USER)).toEqual([]);
  expect(board.isAWinner(COMPUTER)).toEqual([]);
});

it("should expect winning squares on the board", () => {
  const arr = [
    [0, 1, 2, 3, 4],
    [3, 4, 5, 0, 1],
    [6, 7, 8, 0, 1],
    [0, 3, 6, 1, 2],
    [1, 4, 7, 0, 2],
    [2, 5, 8, 0, 1],
    [0, 4, 8, 1, 2],
    [2, 4, 6, 0, 1],
  ];

  for (let i = 0; i < arr.length; i++) {
    board.place(USER, arr[i][0]);
    board.place(COMPUTER, arr[i][3]);
    board.place(USER, arr[i][1]);
    board.place(COMPUTER, arr[i][4]);
    board.place(USER, arr[i][2]);

    expect(board.isAWinner(USER)).toEqual([arr[i][0], arr[i][1], arr[i][2]]);

    board.reset();
  }
});

it("should not expect winning squares on the board", () => {
  board.place(USER, 0);
  board.place(COMPUTER, 3);
  board.place(USER, 1);
  board.place(COMPUTER, 4);

  expect(board.isAWinner(USER)).toEqual([]);
});
