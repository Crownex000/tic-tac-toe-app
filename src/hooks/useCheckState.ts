import { useCallback, useState } from "react";
import { PlayerProps } from "../types";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const useCheckState = () => {
  const [winner, setWinner] = useState<string | null | undefined>(null);
  const [isDraw, setIsDraw] = useState<boolean>(false);

  const checkWinner = useCallback(
    (data: string[], players: PlayerProps): string | null => {
      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (data[a] && data[a] === data[b] && data[a] === data[c]) {
          const gameWinner = Object.values(players).find(
            (player) => player.sign === data[a]
          );
          setWinner(gameWinner?.name);
          return data[a];
        }
      }
      setWinner(null);
      return null;
    },
    []
  );

  const checkIsDraw = useCallback(
    (data: string[]): boolean => {
      const isBoardFull = data.every((cell) => cell !== "");
      setIsDraw(isBoardFull && !winner);
      return isBoardFull && !winner;
    },
    [winner]
  );

  const evaluateGameState = useCallback(
    (data: string[], players: PlayerProps) => {
      checkWinner(data, players);
      checkIsDraw(data);
    },
    [checkWinner, checkIsDraw]
  );

  return {
    winner,
    isDraw,
    evaluateGameState,
  };
};

export default useCheckState;
