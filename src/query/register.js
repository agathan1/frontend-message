import axios from "axios";

const register = async ({ username, email, password }) => {
  const body = {
    username,
    email,
    password,
  };
  // console.log(body);
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/register`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // Ambil data langsung
  } catch (error) {
    console.error("Failed to update messages:", error);
    throw error.response?.data || error;
  }
};

export default register;
