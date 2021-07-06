import React from "react";
import PropTypes from "prop-types";
import Square from "./Square";
import * as constants from "../../Constants";
import "./Board.scss";

const COMPUTER = constants.COMPUTER;
const USER = constants.USER;

const Historical = ({ folder, imageUser, imageComputer, players, winners }) => {
  const board = players.map((player, ind) => {
    const image =
      player === COMPUTER
        ? `${folder}%2F${imageComputer}`
        : player === USER
        ? `${folder}%2F${imageUser}`
        : "default";
    const win = winners.indexOf(ind) !== -1 ? "win" : "";

    return (
      <Square disabled={true} id={ind} image={image} key={ind} win={win} />
    );
  });

  return <div className="board">{board}</div>;
};

Historical.propTypes = {
  folder: PropTypes.string,
  imageUser: PropTypes.number,
  imageComputer: PropTypes.number,
  players: PropTypes.array,
  winners: PropTypes.array,
};

export default Historical;
