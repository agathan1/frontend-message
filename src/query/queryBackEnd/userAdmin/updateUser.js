import axios from "axios";

export const updateUser = async ({ id, username, password, role, email }) => {
  const token = localStorage.getItem("tokenAdmin");
  const body = {
    username,
    password,
    role,
    email,
  };


  try {
    const response = await axios.patch(
      `${import.meta.env.VITE_API_URL}/users-update/${id}`,
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
    // console.error("Failed to update messages:", error);
    throw error.response?.data || error;
  }
};
