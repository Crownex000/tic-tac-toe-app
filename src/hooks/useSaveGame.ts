import { useMutation, useQueryClient } from "@tanstack/react-query";

const BASE_URL =
  import.meta.env.VITE_APP_ENV === "production"
    ? import.meta.env.VITE_PRODUCTION_URL
    : import.meta.env.VITE_DEV_URL;

interface GameData {
  player1: string;
  player2: string;
  description: string;
  winner: string;
  data: string[];
}

const useSaveGame = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<unknown, Error, GameData, unknown>({
    mutationFn: async (newRecord: GameData) => {
      const response = await fetch(`${BASE_URL}/record`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRecord),
      });
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to save record: ${errorMessage}`);
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history"] });
    },
    onError: (error: Error) => {
      console.error("Error saving game:", error.message);
      alert(`Error saving game: ${error.message}`);
    },
  });

  const saveGame = (gameData: GameData) => {
    mutation.mutate(gameData);
  };

  return { saveGame, isError: mutation.isError };
};

export default useSaveGame;
