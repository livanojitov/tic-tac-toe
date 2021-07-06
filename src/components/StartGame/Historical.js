import React, { useContext } from "react";
import { DictionaryContext } from "../../contexts/DictionaryContext";
import { COMPUTER } from "../../Constants";
import "./StartGame.scss";

const Historical = ({ first }) => {
  const { dictionary } = useContext(DictionaryContext);

  return dictionary ? (
    <div className="start">
      {dictionary.STARTED_BY}&nbsp;
      {first === COMPUTER
        ? dictionary.STARTED_BY_COMPUTER
        : dictionary.STARTED_BY_PLAYER}
    </div>
  ) : null;
};

export default Historical;
