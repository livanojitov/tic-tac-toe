import { ADD_GAME, REMOVE_GAME } from "./gameDBTypes";

export const addGame = (game) => {
  return {
    type: ADD_GAME,
    game,
  };
};

export const removeGame = (id) => {
  return {
    type: REMOVE_GAME,
    id,
  };
};
