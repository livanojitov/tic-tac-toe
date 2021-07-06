import React, { useContext } from "react";
import PropTypes from "prop-types";
import { GameContext } from "../../contexts/GameContext";
import Square from "./Square";
import useBoardUI from "../../hooks/useBoardUI";
import { EMPTY, USER, COMPUTER } from "../../Constants";
import "./Board.scss";

const BoardUI = ({ onGameOver = () => {} }) => {
  const { game } = useContext(GameContext);
  const { category, disabled, images } = game;
  const { folder } = category;
  const { user: imageUser, computer: imageComputer } = images;

  const { over, play, players, winners } = useBoardUI(game, onGameOver);

  const squares = players.map((player, ind) => {
    const image =
      player === COMPUTER
        ? `${folder}%2F${imageComputer}`
        : player === USER
        ? `${folder}%2F${imageUser}`
        : "default";
    const isDisabled = disabled || over || player !== EMPTY ? true : false;
    const win = over ? (winners.indexOf(ind) !== -1 ? "win" : "") : "";

    return (
      <Square
        disabled={isDisabled}
        id={ind}
        image={image}
        key={ind}
        win={win}
      />
    );
  });

  return (
    <div className="board" onClick={play}>
      {squares}
    </div>
  );
};

BoardUI.propTypes = {
  onGameOver: PropTypes.func,
};

export default BoardUI;
