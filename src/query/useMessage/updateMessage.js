import axios from "axios";

export const updateMessage = async ({ send_to, message, id }) => {
  const token =
    localStorage.getItem("tokenUser") || localStorage.getItem("tokenAdmin");
  const body = {
    send_to,
    message,
  };

  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}/message-update/${id}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log("Response update", response.data); // debug isi responsenya
    return response.data; // Ambil data langsung
  } catch (error) {
    // console.error("Failed to update messages:", error);
    throw error.response?.data || error;
  }
};
