import "@testing-library/jest-dom/extend-expect";
import { gameDBReducer } from "../../store/gameDB/gameDBReducer";
import { addGame, removeGame } from "../../store/gameDB/gameDBActions";

describe("Game DB reducer", () => {
  const game = {
    board: [2, 0, 0, 2, 0, 1, 2, 1, 0],
    categoryId: 0,
    first: 2,
    imageComputer: 1,
    imageUser: 0,
    level: 1,
    result: 1,
    winners: [0, 3, 6],
  };

  it("should return the initial state", () => {
    const initialState = [];

    expect(gameDBReducer(initialState, {})).toEqual(initialState);
  });

  it("should add a new game when the state is empty", () => {
    const initialState = [];

    expect(gameDBReducer(initialState, addGame(game))).toEqual([
      {
        id: 0,
        ...game,
      },
      ...initialState,
    ]);
  });

  it("should add a new game when the state is not empty", () => {
    const initialState = [
      {
        id: 0,
        ...game,
      },
    ];

    const game1 = {
      board: [2, 0, 0, 2, 0, 1, 2, 1, 0],
      categoryId: 0,
      first: 2,
      imageComputer: 1,
      imageUser: 0,
      level: 1,
      result: 1,
      winners: [0, 3, 6],
    };

    expect(gameDBReducer(initialState, addGame(game1))).toEqual([
      ...initialState,
      {
        id: 1,
        ...game1,
      },
    ]);
  });

  it("should remove the game", () => {
    const initialState = [
      {
        id: 0,
        ...game,
      },
    ];

    expect(gameDBReducer(initialState, removeGame(0))).toEqual([]);
  });
});
