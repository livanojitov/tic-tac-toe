import { ADD_GAME, REMOVE_GAME } from "./gameDBTypes";

export const gameDBReducer = (state, action) => {
  switch (action.type) {
    case ADD_GAME:
      action.game.id = state.length === 0 ? 0 : state[state.length - 1].id + 1;
      return [...state, action.game];

    case REMOVE_GAME:
      return state.filter((game) => game.id !== action.id);

    default:
      return state;
  }
};
