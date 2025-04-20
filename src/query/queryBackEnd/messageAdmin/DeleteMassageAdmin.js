import axios from "axios";

const deleteMassageAdmin = async (id) => {
    const token = localStorage.getItem("tokenAdmin");
    try {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/message/${id}`, 
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

export default deleteMassageAdmin;

