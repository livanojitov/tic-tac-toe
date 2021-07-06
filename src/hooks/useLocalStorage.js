import { useReducer, useEffect, useRef } from "react";
import { gameDBReducer } from "../store/gameDB/gameDBReducer";

function useLocalStorage(key, initialValue) {
  const isLoading = useRef(false);

  const [games, dispatch] = useReducer(gameDBReducer, [], () => {
    try {
      isLoading.current = true;

      const gamesJson = window.localStorage.getItem(key);

      return gamesJson ? JSON.parse(gamesJson) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    if (isLoading.current) {
      isLoading.current = false;

      return;
    }

    localStorage.setItem(key, JSON.stringify(games));
  }, [key, games]);

  return { games, dispatch };
}

export default useLocalStorage;
