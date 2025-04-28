import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getMessage = ({ queryKey }) => {
  const [key, page = 1, limit] = queryKey;

  // console.log(key, page, limit);

  const {
    data: allMessage,
    isLoading,
    error,
    refetch,
    isError,
  } = useQuery({
    queryKey: [key, page, limit],
    // queryKey: [queryKey],
    // queryKey: ["getAllMessage"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/message-list`,
          {
            params: {
              page,
              limit: key === "getAllMessageAdmin" ? 5 : limit, // kalau key-nya itu, pakai limit 5
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  return { allMessage, isLoading, error, refetch, isError };
};
