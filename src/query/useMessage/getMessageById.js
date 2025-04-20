import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export const getMessageById = ({id}) => {
    const { data: detailData, isPending, isError, error } = useQuery({
        queryKey: ["message", id],
        queryFn: async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_URL}/message-list/${id}`
                );
                return response.data;
            } catch (error) {
                console.error(error);
            }
        },
        refetchOnWindowFocus: false,
    });
    return { detailData, isPending, isError, error };
};

