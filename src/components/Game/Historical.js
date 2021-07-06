import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { CategoryContext } from "../../contexts/CategoryContext";
import { DictionaryContext } from "../../contexts/DictionaryContext";
import { GameDBContext } from "../../contexts/GameDBContext";
import BoardUI from "../Board/Historical";
import Category from "../Category/Historical";
import Images from "../Images/Historical";
import Level from "../Level/Historical";
import StartGame from "../StartGame/Historical";
import { removeGame } from "../../store/gameDB/gameDBActions";
import * as constants from "../../Constants";
import "./Game.scss";

const Historical = ({ game, history, match }) => {
  const { dictionary } = useContext(DictionaryContext);
  const { categories } = useContext(CategoryContext);
  const { getGame, dispatch } = useContext(GameDBContext);
  const { LOST, WON } = constants;

  let id,
    categoryId,
    folder,
    imageComputer,
    imageUser,
    first,
    level,
    players,
    winners,
    result;

  game = history ? getGame(match.params.id * 1) : game;
  ({
    id,
    categoryId,
    imageComputer,
    imageUser,
    first,
    level,
    board: players,
    winners,
    result,
  } = game);

  folder = categories[categoryId].folder;
  return categories && dictionary ? (
    <div>
      <Category categoryId={categoryId} />

      <Images
        imageUser={imageUser}
        imageComputer={imageComputer}
        folder={folder}
      />

      <div className="settings">
        <StartGame first={first} />
        <Level level={level} />
      </div>

      {history && (
        <BoardUI
          imageUser={imageUser}
          imageComputer={imageComputer}
          players={players}
          winners={winners}
          folder={folder}
        />
      )}

      <div className="board-footer">
        <span>
          {result === LOST
            ? dictionary.MESSAGE_LOST
            : result === WON
            ? dictionary.MESSAGE_WON
            : dictionary.MESSAGE_DRAW}
        </span>

        <div className="buttons">
          {!history && (
            <button className="see-game">
              <Link to={`/historical/${id}`}>{dictionary.SEE_GAME}</Link>
            </button>
          )}

          <input
            type="button"
            value={dictionary.DELETE_GAME}
            onClick={(e) => {
              dispatch(removeGame(id));
              if (history) {
                history.push("/historical");
              }
            }}
            className="delete-game"
          />

          {history && (
            <input
              type="button"
              value={dictionary.BACK}
              onClick={(e) => {
                history.push("/historical");
              }}
              className="back"
            />
          )}
        </div>
      </div>

      <hr />
    </div>
  ) : (
    <div className="loading">Loading the Historical page...</div>
  );
};

Historical.propTypes = {
  game: PropTypes.object,
  history: PropTypes.object,
  match: PropTypes.object,
};

export default Historical;
