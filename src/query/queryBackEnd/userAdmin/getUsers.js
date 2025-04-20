import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const getUsers = ({ queryKey }) => {
  const tokenAdmin = localStorage.getItem("tokenAdmin");
  const [key, page = 1, limit = 5] = queryKey;

  // console.log(key, page, limit);

  const {
    data: allUsers,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: [key, page, limit],
    // queryKey: [queryKey],
    // queryKey: ["getAllMessage"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/users-list`,
          {
            params: {
              page,
              limit: key === "getAllUsers" ? 5 : limit, // kalau key-nya itu, pakai limit 5
            },
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokenAdmin}`,
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

  return { allUsers, isLoading, error, refetch };
};