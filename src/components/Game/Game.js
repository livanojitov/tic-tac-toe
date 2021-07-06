import React, { useContext } from "react";
import { GameDBContext } from "../../contexts/GameDBContext";
import { DictionaryContext } from "../../contexts/DictionaryContext";
import { GameContext } from "../../contexts/GameContext";
import Category from "../Category/Category";
import Images from "../Images/Images";
import StartGame from "../StartGame/StartGame";
import Level from "../Level/Level";
import BoardUI from "../Board/BoardUI";
import * as constants from "../../Constants";
import useGame from "../../hooks/useGame";
import "./Game.scss";

const { LOST, WON } = constants;

const Game = () => {
  const { dispatch } = useContext(GameDBContext);
  const { dictionary } = useContext(DictionaryContext);
  const { game, dispatch: dispatchGame } = useContext(GameContext);

  const { gameInitHandler, gameOverHandler, result } = useGame(
    dispatch,
    dispatchGame
  );

  return dictionary ? (
    <div className="game text-center" data-testid="game">
      <Category />

      <Images />

      <div className="settings">
        <StartGame />
        <Level />
      </div>

      <BoardUI onGameOver={gameOverHandler} />
      <div className="board-footer">
        {game.over && (
          <>
            <span>{dictionary.GAME_OVER}: </span>
            <span data-testid="message">
              {result === LOST
                ? dictionary.MESSAGE_LOST
                : result === WON
                ? dictionary.MESSAGE_WON
                : dictionary.MESSAGE_DRAW}
            </span>
          </>
        )}

        {((!result && game.disabled) || game.over) && (
          <button
            data-testid="play"
            className="play-again"
            onClick={gameInitHandler}
          >
            {game.over ? dictionary.PLAY_AGAIN : dictionary.PLAY}
          </button>
        )}
      </div>
    </div>
  ) : (
    <div className="loading" data-testid="loading">
      Loading the game section of the page...
    </div>
  );
};

export default Game;
