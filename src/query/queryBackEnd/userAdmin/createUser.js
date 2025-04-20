import axios from "axios";

export const createUser = async ({ username, password, role, email }) => {
  const token = localStorage.getItem("tokenAdmin");
  const body = {
    username,
    password,
    role,
    email,
  };

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/users`,
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
