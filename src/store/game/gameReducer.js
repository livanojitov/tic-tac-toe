import {
  CHANGE_CATEGORY,
  CHANGE_DISABLED,
  CHANGE_FIRST,
  CHANGE_IMAGES,
  CHANGE_LEVEL,
  CHANGE_OVER,
} from "./gameTypes";

export const gameReducer = (state, action) => {
  const newState = {
    ...state,
    category: {
      ...state.category,
    },
    images: {
      ...state.images,
    },
  };

  switch (action.type) {
    case CHANGE_CATEGORY:
      return {
        ...newState,
        category: {
          ...action.category,
        },
      };

    case CHANGE_DISABLED:
      return {
        ...newState,
        disabled: action.disabled,
      };

    case CHANGE_FIRST:
      return {
        ...newState,
        first: action.first,
      };

    case CHANGE_IMAGES:
      return {
        ...newState,
        images: {
          ...action.images,
        },
      };

    case CHANGE_LEVEL:
      return {
        ...newState,
        level: action.level,
      };

    case CHANGE_OVER:
      return {
        ...newState,
        over: action.over,
      };

    default:
      return state;
  }
};
