import { useQuery } from "@tanstack/react-query";

const BASE_URL =
  import.meta.env.VITE_APP_ENV === "production"
    ? import.meta.env.VITE_PRODUCTION_URL
    : import.meta.env.VITE_DEV_URL;

const useLoadHistory = () => {
  const {
    data: history,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["history"],
    queryFn: async () => {
      const response = await fetch(`${BASE_URL}/history`);
      if (!response.ok) {
        throw new Error("Failed to fetch history");
      }
      return response.json();
    },
  });

  return { history, isLoading, error };
};

export default useLoadHistory;
