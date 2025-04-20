import axios from "axios";

export const postMessage = async ({ send_to, message }) => {
  const token =
    localStorage.getItem("tokenUser") || localStorage.getItem("tokenAdmin");
  const body = {
    send_to,
    message,
  };
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/message`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Ambil data langsung
  } catch (error) {
    console.error("Failed to create messages:", error);
    throw error.response?.data || error;
  }
};
