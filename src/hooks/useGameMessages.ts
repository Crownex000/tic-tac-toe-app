import { useCallback, useState } from "react";
import moment from "moment";

const useGameMessages = () => {
  const [moves, setMoves] = useState<string[]>([]);

  // Function to log player moves
  const handleGameMoves = useCallback(
    (playerName: string, sign: string, position: number) => {
      const timestamp = moment().format("HH:mm:ss");
      const moveMessage = `${timestamp}: ${playerName} (${sign}) placed at position ${
        position + 1
      }`;
      setMoves((prevMoves) => [...prevMoves, moveMessage]);
    },
    []
  );

  // Function to generate a game description
  const handleGameDescription = useCallback(
    (options: { player1: string; player2: string }) => {
      const timestamp = moment().format("YYYY-MM-DD HH:mm:ss");
      return `${options.player1} vs ${options.player2} at ${timestamp}`;
    },
    []
  );

  return {
    moves,
    setMoves,
    handleGameMoves,
    handleGameDescription,
  };
};

export default useGameMessages;
