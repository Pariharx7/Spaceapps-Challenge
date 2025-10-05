import axios from 'axios';

// Base URL for the NASA POWER API
const NASA_API_URL = "https://power.larc.nasa.gov/api/temporal/daily/point";

/**
 * Fetches historical weather data for a specific location from the NASA POWER API.
 * @param {number} lat - The latitude of the location.
 * @param {number} lon - The longitude of the location.
 * @returns {Promise<object>} A promise that resolves to the API data.
 */
export const fetchNasaData = async (lat, lon) => {
  // Define the weather parameters we want to retrieve
  const parameters = "T2M_MAX,T2M_MIN,PRECTOTCORR,WS10M,RH2M";

  try {
    console.log(`Fetching NASA data for lat: ${lat}, lon: ${lon}`);
    const response = await axios.get(NASA_API_URL, {
      params: {
        parameters,
        community: "RE",
        longitude: lon,
        latitude: lat,
        start: "2001", // Using a 20+ year range for good climatology data
        end: "2023",
        format: "JSON"
      }
    });
    return response.data;
  } catch (error) {
    // Log the error for debugging and throw a new, cleaner error for the controller to handle
    console.error("Error fetching from NASA POWER API:", error.message);
    throw new Error("Failed to fetch data from the external NASA service.");
  }
};