type FetchOptions = {
  headers?: Record<string, string>;
};

export const fetchAPI = async (
  url: string,
  options: FetchOptions = {}
): Promise<any> => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_API_KEY,
        "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API fetch error:", error);
    throw error;
  }
};
