import React, { useContext } from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import GameDBContextProvider, {
  GameDBContext,
} from "../../contexts/GameDBContext";

let mockGames = [];
jest.mock("../../hooks/useLocalStorage", () => {
  return jest.fn(() => ({
    games: mockGames,
  }));
});

const renderTestComponent = () => {
  const TestComponent = () => {
    const { games, getGame } = useContext(GameDBContext);

    if (games.length) {
      const {
        categoryId,
        imageUser,
        imageComputer,
        first,
        level,
        board: players,
        winners,
        result,
      } = getGame(0);

      return (
        <div>
          <div data-testid="categoryId">{categoryId}</div>
          <div data-testid="imageUser">{imageUser}</div>
          <div data-testid="imageComputer">{imageComputer}</div>
          <div data-testid="first">{first}</div>
          <div data-testid="level">{level}</div>
          <div data-testid="players">{players}</div>
          <div data-testid="winners">{winners}</div>
          <div data-testid="result">{result}</div>
        </div>
      );
    } else {
      return <div data-testid="games">{getGame(0)}</div>;
    }
  };

  return render(
    <GameDBContextProvider>
      <TestComponent />
    </GameDBContextProvider>
  );
};

it("should not provide a game list when the local storage json file is empty", async () => {
  mockGames = [];

  renderTestComponent();

  expect(screen.getByTestId("games")).toHaveTextContent("");
});

it("should provide a game list when the local storage json file is not empty", async () => {
  mockGames = [
    {
      id: 0,
      categoryId: 0,
      imageUser: 13,
      imageComputer: 11,
      first: 2,
      level: 1,
      board: [2, 0, 0, 2, 1, 0, 2, 0, 1],
      winners: [0, 3, 6],
      result: 1,
    },
  ];

  renderTestComponent();

  expect(screen.getByTestId("categoryId")).toHaveTextContent(mockGames[0].id);
  expect(screen.getByTestId("imageUser")).toHaveTextContent(
    mockGames[0].imageUser
  );
  expect(screen.getByTestId("imageComputer")).toHaveTextContent(
    mockGames[0].imageComputer
  );
  expect(screen.getByTestId("first")).toHaveTextContent(mockGames[0].first);
  expect(screen.getByTestId("level")).toHaveTextContent(mockGames[0].level);
  expect(screen.getByTestId("players")).toHaveTextContent(
    mockGames[0].board.join("")
  );
  expect(screen.getByTestId("winners")).toHaveTextContent(
    mockGames[0].winners.join("")
  );
  expect(screen.getByTestId("result")).toHaveTextContent(mockGames[0].result);
});
