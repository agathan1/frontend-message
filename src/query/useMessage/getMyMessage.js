import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const getMyMessage = () => {
  const token = localStorage.getItem("tokenUser");
  const {
    data: myMessage,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["myMessage"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/my-message`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
    refetchOnWindowFocus: false,
  });
  return { myMessage, isPending, isError, error };
};
