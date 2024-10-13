// src/services/api.js
import { fetchAPI } from "./api_helper";

const BASE_URL = "https://sky-scrapper.p.rapidapi.com/api/v1/flights";

// Define the type for the parameters
interface FlightParams {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  date: string;
  cabinClass: string;
  adults: string;
  childrens: string;
}

/**
 * Fetch flights based on provided parameters
 * @param {FlightParams} params - Query parameters (originSkyId, destinationSkyId, etc.)
 */
export const fetchFlights = async (params: FlightParams) => {
  const {
    originSkyId,
    destinationSkyId,
    originEntityId,
    destinationEntityId,
    date,
    cabinClass,
    adults,
    childrens,
  } = params;

  const query = new URLSearchParams({
    originSkyId,
    destinationSkyId,
    originEntityId,
    destinationEntityId,
    date,
    cabinClass,
    adults,
    childrens,
    sortBy: "best",
    currency: "USD",
    market: "en-US",
    countryCode: "US",
  });

  const url = `${BASE_URL}/searchFlights?${query.toString()}`;
  return await fetchAPI(url);
};

/**
 * Fetch nearby airports based on latitude and longitude
 * @param {string} lat - Latitude
 * @param {string} lng - Longitude
 */
export const getNearbyAirports = async (lat: string, lng: string) => {
  const url = `${BASE_URL}/getNearByAirports?lat=${lat}&lng=${lng}`;
  return await fetchAPI(url);
};

/**
 * Search airports by city or place name
 * @param {string} query - Search query (city, address, place name, etc.)
 */
export const searchAirports = async (query: string) => {
  const url = `${BASE_URL}/searchAirport?query=${query}`;
  return await fetchAPI(url);
};
