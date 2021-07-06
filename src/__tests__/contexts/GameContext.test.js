import React, { useContext } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";
import { COMPUTER, HARD } from "../../Constants";
import GameContextProvider, { GameContext } from "../../contexts/GameContext";
import { CategoryContext } from "../../contexts/CategoryContext";

import {
  changeCategory,
  changeDisabled,
  changeFirst,
  changeImages,
  changeLevel,
  changeOver,
} from "../../store/game/gameActions";

describe("GameContext", () => {
  let categories;
  let newState;
  let game;
  let dispatch;

  beforeAll(() => {
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

    newState = {
      category: {
        id: 0,
        folder: "habana",
        name: "HAVANA_LANDMARKS",
      },

      images: {
        user: 0,
        computer: 1,
      },

      first: COMPUTER,

      level: HARD,

      disabled: false,

      over: true,
    };
  });

  const renderContextWithCategory = () => {
    const TestComponent = () => {
      ({ game, dispatch } = useContext(GameContext));

      let randomCategoryId = Math.floor(Math.random() * categories.length);
      while (randomCategoryId === game.category.id) {
        randomCategoryId = Math.floor(Math.random() * categories.length);
      }

      newState.category = {
        ...categories[randomCategoryId],
      };

      return (
        <>
          <div data-testid="id">{game.category.id}</div>
          <div data-testid="folder">{game.category.folder}</div>
          <div data-testid="name">{game.category.name}</div>

          <button
            data-testid="changeCategory"
            onClick={() => dispatch(changeCategory(newState.category))}
          >
            Change the category
          </button>
        </>
      );
    };

    return render(
      <CategoryContext.Provider value={{ categories }}>
        <GameContextProvider>
          <TestComponent />
        </GameContextProvider>
      </CategoryContext.Provider>
    );
  };

  const renderContextWithImages = () => {
    const TestComponent = () => {
      ({ game, dispatch } = useContext(GameContext));

      newState.images.user = game.images.computer;
      newState.images.computer = game.images.user;

      return (
        <>
          <div data-testid="userImage">{game.images.user}</div>
          <div data-testid="computerImage">{game.images.computer}</div>

          <button
            data-testid="changeImages"
            onClick={() => dispatch(changeImages(newState.images))}
          >
            Change the images
          </button>
        </>
      );
    };

    return render(
      <CategoryContext.Provider value={{ categories }}>
        <GameContextProvider>
          <TestComponent />
        </GameContextProvider>
      </CategoryContext.Provider>
    );
  };

  const renderContextWithStartingPlayer = () => {
    const TestComponent = () => {
      ({ game, dispatch } = useContext(GameContext));

      return (
        <>
          <div data-testid="startingPlayer">{game.first}</div>

          <button
            data-testid="changeStartingPlayer"
            onClick={() => dispatch(changeFirst(newState.first))}
          >
            Change the starting player
          </button>
        </>
      );
    };

    return render(
      <CategoryContext.Provider value={{ categories }}>
        <GameContextProvider>
          <TestComponent />
        </GameContextProvider>
      </CategoryContext.Provider>
    );
  };

  const renderContextWithLevel = () => {
    const TestComponent = () => {
      ({ game, dispatch } = useContext(GameContext));

      return (
        <>
          <div data-testid="level">{game.level}</div>

          <button
            data-testid="changeLevel"
            onClick={() => dispatch(changeLevel(newState.level))}
          >
            Change the computer playing level
          </button>
        </>
      );
    };

    return render(
      <CategoryContext.Provider value={{ categories }}>
        <GameContextProvider>
          <TestComponent />
        </GameContextProvider>
      </CategoryContext.Provider>
    );
  };

  const renderContextWithDisabledStatus = () => {
    const TestComponent = () => {
      ({ game, dispatch } = useContext(GameContext));

      return (
        <>
          <button data-testid="disabled" disabled={game.disabled}>
            {game.disabled.toString()}
          </button>

          <button
            data-testid="changeDisabled"
            onClick={() => dispatch(changeDisabled(newState.disabled))}
          >
            Change the disabled status
          </button>
        </>
      );
    };

    return render(
      <CategoryContext.Provider value={{ categories }}>
        <GameContextProvider>
          <TestComponent />
        </GameContextProvider>
      </CategoryContext.Provider>
    );
  };

  const renderContextWithOverStatus = () => {
    const TestComponent = () => {
      ({ game, dispatch } = useContext(GameContext));

      return (
        <>
          <div data-testid="over">{game.over.toString()}</div>

          <button
            data-testid="changeOver"
            onClick={() => dispatch(changeOver(newState.over))}
          >
            Change the game over status
          </button>
        </>
      );
    };

    return render(
      <CategoryContext.Provider value={{ categories }}>
        <GameContextProvider>
          <TestComponent />
        </GameContextProvider>
      </CategoryContext.Provider>
    );
  };

  it("should change the category", () => {
    renderContextWithCategory();

    const { id, folder, name } = game.category;
    expect(screen.getByTestId("id")).toHaveTextContent(id);
    expect(screen.getByTestId("folder")).toHaveTextContent(folder);
    expect(screen.getByTestId("name")).toHaveTextContent(name);

    userEvent.click(screen.getByTestId("changeCategory"));

    expect(screen.getByTestId("id")).not.toHaveTextContent(/^id$/);
    expect(screen.getByTestId("folder")).not.toHaveTextContent(folder);
    expect(screen.getByTestId("name")).not.toHaveTextContent(name);
  });

  it("should change the images", () => {
    renderContextWithImages();

    const { user: imageUser, computer: imageComputer } = game.images;
    expect(screen.getByTestId("userImage")).toHaveTextContent(imageUser);
    expect(screen.getByTestId("computerImage")).toHaveTextContent(
      imageComputer
    );

    userEvent.click(screen.getByTestId("changeImages"));

    expect(screen.getByTestId("userImage")).not.toHaveTextContent(
      /^imageUser$/
    );
    expect(screen.getByTestId("computerImage")).not.toHaveTextContent(
      /^imageComputer$/
    );
  });

  it("should change the starting player", () => {
    renderContextWithStartingPlayer();

    const first = game.first;
    expect(screen.getByTestId("startingPlayer")).toHaveTextContent(first);

    userEvent.click(screen.getByTestId("changeStartingPlayer"));
    expect(screen.getByTestId("startingPlayer")).not.toHaveTextContent(first);
  });

  it("should change the computer playing level", () => {
    renderContextWithLevel();

    const level = game.level;
    expect(screen.getByTestId("level")).toHaveTextContent(level);

    userEvent.click(screen.getByTestId("changeLevel"));
    expect(screen.getByTestId("level")).not.toHaveTextContent(level);
  });

  it("should change the board disabled status", () => {
    renderContextWithDisabledStatus();

    expect(screen.getByTestId("disabled")).toBeDisabled();

    userEvent.click(screen.getByTestId("changeDisabled"));
    expect(screen.getByTestId("disabled")).not.toBeDisabled();
  });

  it("should change the game over status", () => {
    renderContextWithOverStatus();

    const over = game.over.toString();
    expect(screen.getByTestId("over")).toHaveTextContent(over);

    userEvent.click(screen.getByTestId("changeOver"));
    expect(screen.getByTestId("over")).not.toHaveTextContent(over);
  });
});
