import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { CategoryContext } from "../../../contexts/CategoryContext";
import { DictionaryContext } from "../../../contexts/DictionaryContext";
import { GameDBContext } from "../../../contexts/GameDBContext";
import { GameContext } from "../../../contexts/GameContext";
import Game from "../../../components/Game/Game";
import useGame from "../../../hooks/useGame";
import { USER, RANDOM, LOST, WON, DRAW } from "../../../Constants";

jest.mock("../../../components/Board/BoardUI", () => () => (
  <label>Board</label>
));

jest.mock("../../../hooks/useGame");

describe("Game", () => {
  let dictionary;
  let categories;
  let game;
  let dispatch;
  let error;

  beforeEach(() => {
    dictionary = {
      ANIMALS: "Animals",
      FRUITS_AND_VEGETABLES: "Fruits & Vegetables",
      GERMANY_LANDMARKS: "Germany landmarks",
      HAVANA_LANDMARKS: "Havana landmarks",
      MONTREAL_LANDMARKS: "Montreal landmarks",
      PUPPIES: "Puppies",
      SEINFELD: "Seinfeld",
      SOCCER_PLAYERS: "Soccer players",
      SPAIN_LANDMARKS: "Spain landmarks",
      VANCOUVER_LANDMARKS: "Vancouver landmarks",
      CATEGORY: "Category",
      PLAY: "Play",
      PLAY_AGAIN: "Play again",
      MESSAGE_WON: "You won!",
      MESSAGE_LOST: "You lost!",
      MESSAGE_DRAW: "It's a draw!",
    };

    categories = [
      { id: 0, name: "HAVANA_LANDMARKS", folder: "habana" },
      { id: 1, name: "MONTREAL_LANDMARKS", folder: "montreal" },
      { id: 2, name: "VANCOUVER_LANDMARKS", folder: "vancouver" },
      { id: 3, name: "SPAIN_LANDMARKS", folder: "spain" },
      { id: 4, name: "GERMANY_LANDMARKS", folder: "germany" },
      { id: 5, name: "SOCCER_PLAYERS", folder: "soccer" },
      { id: 6, name: "FRUITS_AND_VEGETABLES", folder: "fruits" },
      { id: 7, name: "ANIMALS", folder: "animals" },
      { id: 8, name: "PUPPIES", folder: "puppies" },
      { id: 9, name: "SEINFELD", folder: "seinfeld" },
    ];

    game = {
      category: {
        id: 0,
        folder: "habana",
        name: "HAVANA_LANDMARKS",
      },
      images: {
        user: 0,
        computer: 1,
      },
      first: USER,
      level: RANDOM,
      disabled: true,
      over: false,
    };

    dispatch = jest.fn();

    error = "";
  });

  const renderGame = (result = "") => {
    useGame.mockReturnValue({
      gameInitHandler: jest.fn,
      gameOverHandler: jest.fn,
      result,
    });

    return render(
      <DictionaryContext.Provider value={{ dictionary, error }}>
        <GameDBContext.Provider value={{ dispatch }}>
          <CategoryContext.Provider value={{ categories }}>
            <GameContext.Provider value={{ game, dispatch }}>
              <Game />
            </GameContext.Provider>
          </CategoryContext.Provider>
        </GameDBContext.Provider>
      </DictionaryContext.Provider>
    );
  };

  it("renders correctly", () => {
    const { asFragment } = renderGame();

    expect(asFragment()).toMatchSnapshot();
  });

  it("should not display the Game info if dictionary hasn't been fetched yet", () => {
    dictionary = "";

    renderGame();

    expect(screen.queryByTestId("game")).toBeNull();
  });

  it("should display a loading message while fetching the dictionary", () => {
    dictionary = "";

    renderGame();

    expect(screen.getByTestId("loading")).not.toBeNull();
  });

  it("should display the game lost message", () => {
    game.over = true;

    renderGame(LOST);

    expect(screen.getByTestId("message")).toHaveTextContent(
      dictionary.MESSAGE_LOST
    );
  });

  it("should display the game won message", () => {
    game.over = true;

    renderGame(DRAW);

    expect(screen.getByTestId("message")).toHaveTextContent(
      dictionary.MESSAGE_DRAW
    );
  });

  it("should display the game draw message", () => {
    game.over = true;

    renderGame(WON);

    expect(screen.getByTestId("message")).toHaveTextContent(
      dictionary.MESSAGE_WON
    );
  });
});
