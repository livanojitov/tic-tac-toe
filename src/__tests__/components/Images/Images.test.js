import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom/extend-expect";
import { DictionaryContext } from "../../../contexts/DictionaryContext";
import { GameContext } from "../../../contexts/GameContext";
import Images from "../../../components/Images/Images";
import useImages from "../../../hooks/useImages";

jest.mock("../../../hooks/useImages");

describe("Images", () => {
  let dictionary;
  let game;
  let dispatch;
  let error;
  let refreshImageHandler;

  beforeEach(() => {
    dictionary = {
      YOU: "You",
      USER_IMAGE_TOOLTIP: "You will play with this image.",
      REFRESH_TOOLTIP: "Click to play with a different image.",
      OPPONENT: "PC",
      COMPUTER_IMAGE_TOOLTIP: "The computer will play with this image.",
    };

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
    };

    dispatch = jest.fn();

    error = "";

    refreshImageHandler = jest.fn();
  });

  const renderImages = () => {
    useImages.mockReturnValue({
      images: { user: 0, computer: 1 },
      refreshImage: refreshImageHandler,
    });

    return render(
      <DictionaryContext.Provider value={{ dictionary, error }}>
        <GameContext.Provider value={{ game, dispatch }}>
          <Images />
        </GameContext.Provider>
      </DictionaryContext.Provider>
    );
  };

  it("renders the Image component correctly", () => {
    const { asFragment } = renderImages();

    expect(asFragment()).toMatchSnapshot();
  });

  it("should not display the images if dictionary hasn't been fetched yet", () => {
    dictionary = "";

    renderImages();

    expect(screen.queryByTestId("images")).toBeNull();
  });

  it("should display the images if dictionary has already been fetched", () => {
    renderImages();

    expect(screen.getByTestId("images")).not.toBeNull();
  });

  it("should call the refresh image handler when clicking on the user image", () => {
    renderImages();

    userEvent.click(screen.getByTestId("user-image"));

    expect(refreshImageHandler).toHaveBeenCalled();
  });

  it("should call the refresh image handler when clicking on the computer image", () => {
    renderImages();

    userEvent.click(screen.getByTestId("computer-image"));

    expect(refreshImageHandler).toHaveBeenCalled();
    expect(refreshImageHandler).toHaveBeenCalled();
  });
});
