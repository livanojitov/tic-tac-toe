import React, { useContext } from "react";
import { DictionaryContext } from "../../contexts/DictionaryContext";
import { GameDBContext } from "../../contexts/GameDBContext";
import GameHistorical from "../Game/Historical";

const Historical = () => {
  const { dictionary } = useContext(DictionaryContext);
  const { games } = useContext(GameDBContext);
  let historical;

  if (dictionary) {
    if (games && games.length > 0) {
      historical = games.map((game) => {
        return <GameHistorical key={game.id} game={game} />;
      });
    } else {
      historical = (
        <div className="board-footer">
          {dictionary && dictionary.NO_HISTORY_YET}
        </div>
      );
    }

    return <div className="text-center">{historical}</div>;
  } else {
    return <div className="loading">Loading the Historical page...</div>;
  }
};

export default Historical;
