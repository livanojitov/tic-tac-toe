import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { DictionaryContext } from "../../../contexts/DictionaryContext";
import { GameContext } from "../../../contexts/GameContext";
import Level from "../../../components/Level/Level";
import { RANDOM } from "../../../Constants";

describe("Level", () => {
  let dictionary;
  let game;
  let dispatch;

  beforeEach(() => {
    dictionary = {
      LEVEL: "Level",
      LEVEL_EASY: "Easy",
      LEVEL_HARD: "Hard",
      LEVEL_NORMAL: "Normal",
      LEVEL_TOOLTIP: "How much thinking the computer does before playing.",
    };

    game = {
      level: RANDOM,
      disabled: true,
    };

    dispatch = jest.fn();
  });

  const renderLevel = () => {
    return render(
      <DictionaryContext.Provider value={{ dictionary }}>
        <GameContext.Provider value={{ game, dispatch }}>
          <Level />
        </GameContext.Provider>
      </DictionaryContext.Provider>
    );
  };

  it("renders correctly", () => {
    const { asFragment } = renderLevel();

    expect(asFragment()).toMatchSnapshot();
  });

  it("should display the level dropdown", () => {
    renderLevel();

    expect(screen.getByTestId("level")).not.toBeNull();
    expect(screen.getByTestId("level")).toHaveClass("level");
  });

  it("should change the computer playing level in the dropdown", () => {
    renderLevel();

    expect(
      screen.getByRole("option", { name: dictionary.LEVEL_EASY }).selected
    ).toBeTruthy();
    expect(
      screen.getByRole("option", { name: dictionary.LEVEL_HARD }).selected
    ).toBeFalsy();

    userEvent.selectOptions(
      screen.getByTestId("select"),
      screen.getByText(dictionary.LEVEL_HARD)
    );

    expect(
      screen.getByRole("option", { name: dictionary.LEVEL_EASY }).selected
    ).toBeFalsy();
    expect(
      screen.getByRole("option", { name: dictionary.LEVEL_HARD }).selected
    ).toBeTruthy();
  });
});
