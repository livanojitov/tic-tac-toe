import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { DictionaryContext } from "../../../contexts/DictionaryContext";
import { GameContext } from "../../../contexts/GameContext";
import StartGame from "../../../components/StartGame/StartGame";
import { USER } from "../../../Constants";

describe("StartGame", () => {
  let dictionary;
  let game;
  let dispatch;

  beforeEach(() => {
    dictionary = {
      START: "You Start",
      START_TOOLTIP: "Who starts playing the game: You or the computer?",
      YES: "Yes",
      NO: "No",
    };

    game = {
      first: USER,
      disabled: true,
    };

    dispatch = jest.fn();
  });

  const renderStartGame = () => {
    return render(
      <DictionaryContext.Provider value={{ dictionary }}>
        <GameContext.Provider value={{ game, dispatch }}>
          <StartGame />
        </GameContext.Provider>
      </DictionaryContext.Provider>
    );
  };

  it("renders correctly", () => {
    const { asFragment } = renderStartGame();

    expect(asFragment()).toMatchSnapshot();
  });

  it("should display the start player dropdown", () => {
    renderStartGame();

    const startGame = screen.getByTestId("startgame");
    expect(startGame).not.toBeNull();
    expect(startGame).toHaveClass("start");
  });

  it("should change the starting player in the dropdown", () => {
    renderStartGame();

    expect(
      screen.getByRole("option", { name: dictionary.YES }).selected
    ).toBeTruthy();
    expect(
      screen.getByRole("option", { name: dictionary.NO }).selected
    ).toBeFalsy();

    userEvent.selectOptions(
      screen.getByTestId("select"),
      screen.getByText(dictionary.NO)
    );

    expect(
      screen.getByRole("option", { name: dictionary.YES }).selected
    ).toBeFalsy();
    expect(
      screen.getByRole("option", { name: dictionary.NO }).selected
    ).toBeTruthy();
  });
});
