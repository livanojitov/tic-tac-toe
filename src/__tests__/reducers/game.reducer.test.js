import "@testing-library/jest-dom/extend-expect";
import { gameReducer } from "../../store/game/gameReducer";
import {
  changeCategory,
  changeDisabled,
  changeImages,
  changeLevel,
  changeOver,
} from "../../store/game/gameActions";
import { USER, RANDOM, HARD, IMAGES_PER_CATEGORY } from "../../Constants";

describe("Game reducer", () => {
  const initialState = {
    category: {
      id: 5,
      folder: "soccer",
      name: "SOCCER_PLAYERS",
    },
    images: {
      user: Math.floor(Math.random() * IMAGES_PER_CATEGORY),
      computer: Math.floor(Math.random() * IMAGES_PER_CATEGORY),
    },
    first: USER,
    level: RANDOM,
    disabled: true,
  };

  it("should return the initial state", () => {
    expect(gameReducer(initialState, {})).toEqual(initialState);
  });

  it("should change the category", () => {
    const category = {
      id: 0,
      folder: "habana",
      name: "HAVANA_LANDMARKS",
    };

    expect(gameReducer(initialState, changeCategory(category))).toEqual({
      ...initialState,
      category: {
        ...category,
      },
    });
  });

  it("should change the disable status", () => {
    const disabled = false;

    expect(gameReducer(initialState, changeDisabled(disabled))).toEqual({
      ...initialState,
      disabled,
    });
  });

  it("should change the images", () => {
    const images = {
      user: 10,
      computer: 11,
    };

    expect(gameReducer(initialState, changeImages(images))).toEqual({
      ...initialState,
      images: {
        ...images,
      },
    });
  });

  it("should change the level", () => {
    const level = HARD;

    expect(gameReducer(initialState, changeLevel(level))).toEqual({
      ...initialState,
      level,
    });
  });

  it("should change over", () => {
    const over = true;

    expect(gameReducer(initialState, changeOver(over))).toEqual({
      ...initialState,
      over,
    });
  });
});
