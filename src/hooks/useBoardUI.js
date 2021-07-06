import { useCallback, useEffect, useState } from "react";
import Computer from "../components/Board/Computer";
import Board from "../components/Board/Board";
import { USER, COMPUTER, LOST, WON, DRAW } from "../Constants";

const board = new Board();
const computer = new Computer(board);

let over = false;
let player = "";
let result = "";
let winners = [];

function useBoardUI({ disabled, first, level, images, category }, onGameOver) {
  const categoryId = category.id;
  const { user: imageUser, computer: imageComputer } = images;
  const [players, setPlayers] = useState(board.players);

  const play = useCallback((e) => {
    if (!over) {
      if (player === COMPUTER) {
        computer.play();
      } else {
        board.place(USER, e.target.id);
      }

      setPlayers(board.players);

      winners = board.isAWinner(player);
      if (winners.length) {
        over = true;
        result = player === COMPUTER ? LOST : WON;
      } else if (board.isFull) {
        over = true;
        result = DRAW;
      } else {
        player = player === COMPUTER ? USER : COMPUTER;
        if (player === COMPUTER) {
          play();
        }
      }
    }
  }, []);

  useEffect(() => {
    if (disabled) {
      board.reset();
      over = false;
      player = "";
      result = "";
      winners = [];
    } else {
      setPlayers(board.players);
    }
  }, [disabled]);

  useEffect(() => {
    if (disabled === false) {
      if (first === COMPUTER && !player) {
        player = COMPUTER;
        play();
      } else {
        player = USER;
      }
    }
  }, [disabled, first, play]);

  useEffect(() => {
    if (disabled) {
      board.level = level;
      board.first = first;
    }
  }, [disabled, first, level]);

  useEffect(() => {
    if (over) {
      onGameOver({
        board: players,
        categoryId,
        first,
        imageUser,
        imageComputer,
        level,
        result,
        winners,
      });
    }
  }, [categoryId, first, imageUser, imageComputer, level, onGameOver, players]);

  return {
    over,
    play,
    players,
    winners,
  };
}

export default useBoardUI;
