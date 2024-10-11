// src/services/api.js
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY; // Replace with your RapidAPI key
const BASE_URL = "https://sky-scrapper.p.rapidapi.com/api/v2";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-rapidapi-key": API_KEY,
    "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
  },
});

export const fetchFlights = async (params: any) => {
  try {
    const response = await apiClient.get("/flights", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw error;
  }
};
