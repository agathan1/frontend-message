import axios from "axios";

export const deleteUser = async (id) => {
    const token = localStorage.getItem("tokenAdmin");
    try {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/users-delete/${id}`, 
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
            }}
        );
        return response.data;
    } catch (error) {
        console.error("Failed to delete messages:", error);
        throw error.response?.data || error;
    }
};

