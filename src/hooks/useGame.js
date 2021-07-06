import { useCallback } from "react";
import { changeDisabled, changeOver } from "../store/game/gameActions";
import { addGame } from "../store/gameDB/gameDBActions";

let result = "";

function useGame(dispatch, dispatchGame) {
  const gameInitHandler = useCallback(() => {
    dispatchGame(changeOver(false));
    dispatchGame(changeDisabled(false));
  }, [dispatchGame]);

  const gameOverHandler = useCallback(
    (game) => {
      dispatchGame(changeOver(true));
      dispatchGame(changeDisabled(true));
      result = game.result;
      dispatch(addGame(game));
    },
    [dispatch, dispatchGame]
  );

  return { gameInitHandler, gameOverHandler, result };
}

export default useGame;
