import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const login = async ({ email, password }) => {
  const body = {
    email,
    password,
  };  

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/login`,
      body, {
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
