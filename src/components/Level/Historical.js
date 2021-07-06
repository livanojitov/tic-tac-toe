import React, { useContext } from "react";
import { DictionaryContext } from "../../contexts/DictionaryContext";
import { RANDOM, HARD } from "../../Constants";
import "./Level.scss";

const Historical = ({ level }) => {
  const { dictionary } = useContext(DictionaryContext);

  return dictionary ? (
    <div className="level">
      {dictionary.LEVEL}:&nbsp;
      {level === RANDOM
        ? dictionary.LEVEL_EASY
        : level === HARD
        ? dictionary.LEVEL_HARD
        : dictionary.LEVEL_NORMAL}
    </div>
  ) : null;
};

export default Historical;
