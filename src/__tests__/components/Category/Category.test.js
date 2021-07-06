import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { CategoryContext } from "../../../contexts/CategoryContext";
import { DictionaryContext } from "../../../contexts/DictionaryContext";
import { GameContext } from "../../../contexts/GameContext";

import Category from "../../../components/Category/Category";

describe("Category", () => {
  let dictionary;
  let categories;
  let dispatch;
  let game;

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
    };

    dispatch = jest.fn();
  });

  const renderCategory = () => {
    return render(
      <DictionaryContext.Provider value={{ dictionary }}>
        <CategoryContext.Provider value={{ categories }}>
          <GameContext.Provider value={{ game, dispatch }}>
            <Category />
          </GameContext.Provider>
        </CategoryContext.Provider>
      </DictionaryContext.Provider>
    );
  };

  it("renders the Category component correctly", () => {
    const { asFragment } = renderCategory();

    expect(asFragment()).toMatchSnapshot();
  });

  it("should not display the categories if dictionary and categories haven't been fetched yet", () => {
    dictionary = "";
    categories = "";

    renderCategory();

    expect(screen.queryByTestId("categories")).toBeNull();
  });

  it("should not display the categories if dictionary hasn't been fetched yet", () => {
    dictionary = "";

    renderCategory();

    expect(screen.queryByTestId("categories")).toBeNull();
  });

  it("should not display the categories if they haven't been fetched yet", () => {
    categories = "";

    renderCategory();

    expect(screen.queryByTestId("categories")).toBeNull();
  });

  it("should apply the categories class", () => {
    renderCategory();

    expect(screen.getByTestId("categories")).toHaveClass("categories");
  });

  it("should display the category label", () => {
    renderCategory();

    expect(screen.getByTestId("description")).toHaveTextContent(
      dictionary["CATEGORY"]
    );
  });

  it("should change the current category", () => {
    renderCategory();

    userEvent.selectOptions(
      screen.getByTestId("select"),
      screen.getByText(dictionary[categories[2].name])
    );

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      category: categories[2],
      type: "CHANGE_CATEGORY",
    });
  });
});
