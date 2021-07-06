import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { CategoryContext } from "../../../contexts/CategoryContext";
import { GameContext } from "../../../contexts/GameContext";
import Repository from "../../../components/Repository/Repository";

jest.mock("../../../components/Category/Category", () => () => <select />);

describe("Repository", () => {
  let categories;
  let error;
  let game;

  beforeEach(() => {
    categories = [
      { folder: "habana" },
      { folder: "montreal" },
      { folder: "vancouver" },
      { folder: "spain" },
      { folder: "germany" },
      { folder: "soccer" },
      { folder: "fruits" },
      { folder: "animals" },
      { folder: "puppies" },
      { folder: "seinfeld" },
    ];

    error = "";

    game = {
      category: {
        id: 0,
        folder: "habana",
        name: "HAVANA_LANDMARKS",
      },
    };
  });

  const renderRepository = () => {
    return render(
      <CategoryContext.Provider value={{ categories, error }}>
        <GameContext.Provider value={{ game }}>
          <Repository />
        </GameContext.Provider>
      </CategoryContext.Provider>
    );
  };

  it("renders the Repository component correctly", () => {
    const { asFragment } = renderRepository();

    expect(asFragment()).toMatchSnapshot();
  });

  it("should not display the Repository info if the categories haven't been fetched yet", () => {
    categories = "";

    renderRepository();

    expect(screen.queryByTestId("repository")).toBeNull();
  });

  it("should display a loading message", () => {
    categories = "";

    renderRepository();

    expect(screen.queryByTestId("loading")).not.toBeNull();
  });

  it("should apply the repository class name", () => {
    renderRepository();

    expect(screen.getByTestId("repository")).toHaveClass("repository");
  });

  it("should apply the repository-images class name", () => {
    renderRepository();

    expect(screen.getByTestId("images")).toHaveClass("repository-images");
  });

  it("should display the right number of images", () => {
    renderRepository();

    expect(screen.getByTestId("images").children.length).toBe(20);
    expect(screen.getAllByTestId("image").length).toBe(20);
  });

  it("should apply the right url to the images", () => {
    const url =
      "https://firebasestorage.googleapis.com/v0/b/puzzle-ebd10.appspot.com/o/images";

    renderRepository();
    const images = screen.getAllByTestId("image");

    for (let i = 0; i < images.length; i++) {
      expect(images[i]).toHaveAttribute("src", expect.stringContaining(url));
    }
  });
});
