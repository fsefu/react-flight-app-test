import axios from "axios";

type FetchOptions = {
  headers?: Record<string, string>;
};

export const fetchAPI = async (
  url: string,
  options: FetchOptions = {}
): Promise<any> => {
  try {
    const response = await axios.get(url, {
      ...options,
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_API_KEY,
        "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    return response.data;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};
