import {
  CHANGE_CATEGORY,
  CHANGE_DISABLED,
  CHANGE_FIRST,
  CHANGE_IMAGES,
  CHANGE_LEVEL,
  CHANGE_OVER,
} from "./gameTypes";

export const changeCategory = (category) => {
  return {
    type: CHANGE_CATEGORY,
    category,
  };
};

export const changeDisabled = (disabled) => {
  return {
    type: CHANGE_DISABLED,
    disabled,
  };
};

export const changeFirst = (first) => {
  return {
    type: CHANGE_FIRST,
    first,
  };
};

export const changeImages = (images) => {
  return {
    type: CHANGE_IMAGES,
    images,
  };
};

export const changeLevel = (level) => {
  return {
    type: CHANGE_LEVEL,
    level,
  };
};

export const changeOver = (over) => {
  return {
    type: CHANGE_OVER,
    over,
  };
};
