import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const getUserById = ({id}) => {
    const tokenAdmin = localStorage.getItem("tokenAdmin");
    const { data: detailUser, isPending, isError, error } = useQuery({
        queryKey: ["usersById", id],
        queryFn: async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/users/${id}`, {
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
        refetchOnWindowFocus: false,
    });
    return { detailUser, isPending, isError, error };
};

