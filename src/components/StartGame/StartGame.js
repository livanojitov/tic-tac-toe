import React, { useContext, useMemo } from "react";
import { DictionaryContext } from "../../contexts/DictionaryContext";
import { GameContext } from "../../contexts/GameContext";
import { changeFirst } from "../../store/game/gameActions";
import { USER, COMPUTER } from "../../Constants";
import "./StartGame.scss";

const StartGame = () => {
  const { dictionary } = useContext(DictionaryContext);
  const { game, dispatch } = useContext(GameContext);

  return useMemo(() => {
    return (
      <div className="start" data-testid="startgame">
        <span title={dictionary.START_TOOLTIP}>{dictionary.START}?</span>
        <select
          data-testid="select"
          defaultValue={game.first}
          onChange={(e) => {
            dispatch(changeFirst(e.target.value * 1));
          }}
          disabled={!game.disabled}
        >
          <option data-testid="select-option" key={0} value={USER}>
            {dictionary.YES}
          </option>
          <option data-testid="select-option" key={1} value={COMPUTER}>
            {dictionary.NO}
          </option>
        </select>
      </div>
    );
  }, [dictionary, game.first, game.disabled, dispatch]);
};

export default StartGame;
