import React, { createContext, useContext, useEffect, useReducer } from "react";
import { CategoryContext } from "./CategoryContext";
import { gameReducer } from "../store/game/gameReducer";
import { USER, RANDOM, IMAGES_PER_CATEGORY } from "../Constants";
import { changeCategory } from "../store/game/gameActions";

export const GameContext = createContext();

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

  over: false,
};

const GameContextProvider = ({ children }) => {
  const [game, dispatch] = useReducer(gameReducer, initialState);
  const { categories } = useContext(CategoryContext);

  useEffect(() => {
    dispatch(
      changeCategory(categories[Math.floor(Math.random() * categories.length)])
    );
  }, [categories]);

  return (
    <GameContext.Provider value={{ game, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
