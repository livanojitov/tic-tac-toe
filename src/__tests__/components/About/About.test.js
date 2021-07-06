import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { DictionaryContext } from "../../../contexts/DictionaryContext";
import About from "../../../components/About/About";

describe("About", () => {
  const renderAbout = (dictionary, error) => {
    return render(
      <DictionaryContext.Provider value={{ dictionary, error }}>
        <About />
      </DictionaryContext.Provider>
    );
  };

  it("renders correctly", () => {
    const dictionary = {
      GAME_WRITTEN_WITH: "This game has been developed with:",
      SOURCE_CODE: "Source Code:",
      OTHER_GAMES: "Other projects:",
    };
    const error = "";

    const { asFragment } = renderAbout(dictionary, error);

    expect(asFragment()).toMatchSnapshot();
  });

  it("should not display the info if dictionary hasn't been fetched yet", () => {
    const dictionary = "";
    const error = "";

    renderAbout(dictionary, error);

    expect(screen.queryByTestId("about")).toBeNull();
  });

  it("should display a loading message", () => {
    const dictionary = "";
    const error = "";

    renderAbout(dictionary, error);

    expect(screen.getByTestId("loading")).toHaveTextContent(
      "Loading the About page..."
    );
  });

  it("should display the About info and apply the 'about' class once the dictionary is fetched", () => {
    const dictionary = {
      GAME_WRITTEN_WITH: "This game has been developed with:",
      SOURCE_CODE: "Source Code:",
      OTHER_GAMES: "Other projects:",
    };
    const error = "";

    renderAbout(dictionary, error);

    expect(screen.getByTestId("about")).not.toBeNull();
    expect(screen.getByTestId("about")).toHaveClass("about");
  });

  it("should display the labels 'Game developed with', 'Source Code', 'Other projects'", () => {
    const dictionary = {
      GAME_WRITTEN_WITH: "This game has been developed with:",
      SOURCE_CODE: "Source Code:",
      OTHER_GAMES: "Other projects:",
    };
    const error = "";

    renderAbout(dictionary, error);

    expect(screen.getByTestId("gameWrittenWith")).toHaveTextContent(
      dictionary["GAME_WRITTEN_WITH"]
    );
    expect(screen.getByTestId("sourceCode")).toHaveTextContent(
      dictionary["SOURCE_CODE"]
    );
    expect(screen.getByTestId("otherGames")).toHaveTextContent(
      dictionary["OTHER_GAMES"]
    );
  });

  it("should display the 'Game developed with' info", () => {
    const dictionary = {
      GAME_WRITTEN_WITH: "This game has been developed with:",
      SOURCE_CODE: "Source Code:",
      OTHER_GAMES: "Other projects:",
    };
    const error = "";

    renderAbout(dictionary, error);

    expect(screen.queryByText("React.js")).not.toBeNull();
    expect(screen.queryByText("React Hooks")).not.toBeNull();
    expect(screen.queryByText("Context API")).not.toBeNull();
    expect(screen.queryByText("Local Storage")).not.toBeNull();
    expect(screen.queryByText("Firebase")).not.toBeNull();
    expect(screen.queryByText("Javascript")).not.toBeNull();
    expect(screen.queryByText("ES6")).not.toBeNull();
    expect(screen.queryByText("HTML5")).not.toBeNull();
    expect(screen.queryByText("CSS3")).not.toBeNull();
    expect(screen.queryByText("SASS")).not.toBeNull();
    expect(screen.queryByText("Jest")).not.toBeNull();
    expect(screen.queryByText("React Testing Library")).not.toBeNull();
  });

  it("should display the 'Source code' info", () => {
    const dictionary = {
      GAME_WRITTEN_WITH: "This game has been developed with:",
      SOURCE_CODE: "Source Code:",
      OTHER_GAMES: "Other projects:",
    };
    const error = "";

    renderAbout(dictionary, error);

    expect(screen.getByTestId("source")).toHaveTextContent(
      "https://github.com/lojito/tic-tac-toe"
    );
  });

  it("should display the 'Other projects' info", () => {
    const dictionary = {
      GAME_WRITTEN_WITH: "This game has been developed with:",
      SOURCE_CODE: "Source Code:",
      OTHER_GAMES: "Other projects:",
    };
    const error = "";

    renderAbout(dictionary, error);

    expect(screen.queryByText("Puzzle (Angular)")).not.toBeNull();
    expect(screen.queryByText("Matching pairs (Vue.js)")).not.toBeNull();
    expect(screen.queryByText("Tic-tac-toe 4x4 (Django)")).not.toBeNull();
    expect(screen.queryByText("Tic-tac-toe (Python)")).not.toBeNull();
    expect(screen.queryByText("Base converter (Rust)")).not.toBeNull();
    expect(screen.queryByText("UEFA Champions League (C)")).not.toBeNull();
    expect(
      screen.queryByText("Bubble sort sorting algorithm (Assembly)")
    ).not.toBeNull();
  });
});
