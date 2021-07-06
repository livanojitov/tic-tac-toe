import React, { useContext, useMemo } from "react";
import { DictionaryContext } from "../../contexts/DictionaryContext";
import { GameContext } from "../../contexts/GameContext";
import { changeLevel } from "../../store/game/gameActions";
import { RANDOM, HARD } from "../../Constants";
import "./Level.scss";

const Level = () => {
  const { dictionary } = useContext(DictionaryContext);
  const { game, dispatch } = useContext(GameContext);

  return useMemo(() => {
    return (
      <div className="level" data-testid="level">
        <span title={dictionary.LEVEL_TOOLTIP}>{dictionary.LEVEL}?</span>
        <select
          data-testid="select"
          defaultValue={game.level}
          onChange={(e) => {
            dispatch(changeLevel(e.target.value * 1));
          }}
          disabled={!game.disabled}
        >
          <option data-testid="select-option" key={RANDOM} value={RANDOM}>
            {" "}
            {dictionary.LEVEL_EASY}
          </option>
          <option data-testid="select-option" key={HARD} value={HARD}>
            {" "}
            {dictionary.LEVEL_HARD}
          </option>
        </select>
      </div>
    );
  }, [dictionary, game.disabled, game.level, dispatch]);
};

export default Level;
