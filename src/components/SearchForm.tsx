import { useState } from "react";
import { fetchFlights, searchAirports } from "../services/api";
import FlightCard from "./FlightCard";
import flightsData from "../data/flightData";
const SearchForm = () => {
  const [from, setFrom] = useState(""); // Stores input value for 'From'
  const [to, setTo] = useState(""); // Stores input value for 'To'
  const [departureDate, setDepartureDate] = useState("");
  const [toLoading, setToLoading] = useState(false);
  const [fromLoading, setFromLoading] = useState(false);

  const [fromLocations, setFromLocations] = useState([]); // Stores airports for 'From'
  const [toLocations, setToLocations] = useState([]); // Stores airports for 'To'
  const [fromSkyId, setFromSkyId] = useState(""); // Stores selected skyId for 'From'
  const [toSkyId, setToSkyId] = useState(""); // Stores selected skyId for 'To'
  const [originSkyId, setOriginSkyId] = useState("");
  const [destinationSkyId, setDestinationSkyId] = useState("");
  const [originEntityId, setOriginEntityId] = useState("");
  const [destinationEntityId, setDestinationEntityId] = useState("");
  const [flights, setFlights] = useState<any>({});
  // Function to fetch airport suggestions for 'From'
  const handleFromSearch = async (query) => {
    if (query.length > 2) {
      setFromLoading(true); // Show loading state
      try {
        const data = await searchAirports(query);
        setFromLocations(data.data); // Update 'From' location suggestions
      } catch (error) {
        console.error('Error fetching airports for "From":', error);
      } finally {
        setFromLoading(false); // Hide loading state
      }
    } else {
      setFromLocations([]); // Clear suggestions if input is too short
    }
  };

  // Function to fetch airport suggestions for 'To'
  const handleToSearch = async (query) => {
    if (query.length > 2) {
      setToLoading(true); // Show loading state
      try {
        const data = await searchAirports(query);
        setToLocations(data.data); // Update 'To' location suggestions
      } catch (error) {
        console.error('Error fetching airports for "To":', error);
      } finally {
        setToLoading(false); // Hide loading state
      }
    } else {
      setToLocations([]); // Clear suggestions if input is too short
    }
  };

  // Inside the JSX, show loading state

  // Function to handle selection from the dropdown
  const handleSelectFrom = (location: any) => {
    console.log("location: ", location);
    setOriginSkyId(location.navigation.relevantFlightParams.skyId);
    setOriginEntityId(location.navigation.relevantFlightParams.entityId);
    setFrom(location.presentation.title); // Update input field with selected airport name
    setFromSkyId(location.skyId); // Store selected skyId
    setFromLocations([]); // Clear the dropdown
  };

  const handleSelectTo = (location: any) => {
    setDestinationSkyId(location.navigation.relevantFlightParams.entityId);
    setDestinationEntityId(location.navigation.relevantFlightParams.entityId);
    setTo(location.presentation.title); // Update input field with selected airport name
    setToSkyId(location.skyId); // Store selected skyId
    setToLocations([]); // Clear the dropdown
  };

  const handleSearch = async (e: any) => {
    e.preventDefault();

    try {
      const params = {
        originSkyId: originSkyId,
        destinationSkyId: destinationSkyId,
        originEntityId: originEntityId,
        destinationEntityId: destinationEntityId,
        date: departureDate,
        cabinClass: "economy",
        adults: 1,
        childrens: 2,
      };

      const data = await fetchFlights(params);
      console.log("flight data: ", data);
      setFlights(data);
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      //   setLoading(false);
    }
  };

  return (
    <div className="bg-secondary p-6 rounded-lg shadow-md">
      <form className="flex flex-col md:flex-row md:space-x-4">
        {/* Input for 'From' */}
        <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
          <input
            type="text"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              handleFromSearch(e.target.value);
            }}
            placeholder="Enter Origin"
            className="w-full px-4 py-2 border rounded"
          />
          {/* Dropdown for 'To' suggestions */}
          <ul className="absolute left-0 right-0 bg-white border rounded shadow-lg z-10 max-h-60 overflow-y-auto">
            {fromLoading ? (
              <li className="px-4 py-2 hover:bg-gray-200">please wait...</li>
            ) : (
              fromLocations.length > 0 &&
              fromLocations.map((location) => (
                <li
                  key={location.skyId}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelectFrom(location)}
                >
                  {location.presentation.title} ({location.skyId})
                </li>
              ))
            )}
          </ul>
        </div>
        {/* <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
          <input
            type="text"
            value={from}
            onChange={(e) => {
              setFrom(e.target.value);
              handleFromSearch(e.target.value);
            }}
            placeholder="Enter Origin"
            className="w-full px-4 py-2 border rounded"
          />
          {fromLocations.length > 0 && (
            <ul className="absolute left-0 right-0 bg-white border rounded shadow-lg z-10 max-h-60 overflow-y-auto">
              {loading ? (
                <li className="px-4 py-2 text-center text-gray-500">
                  Loading...
                </li>
              ) : (
                fromLocations.map((location) => (
                  <li
                    key={location.skyId}
                    className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSelectFrom(location)}
                  >
                    {location.presentation.title} ({location.skyId})
                  </li>
                ))
              )}
            </ul>
          )}
        </div> */}

        {/* Input for 'To' */}
        <div className="relative w-full md:w-1/3 mb-4 md:mb-0">
          <input
            type="text"
            value={to}
            onChange={(e) => {
              setTo(e.target.value);
              handleToSearch(e.target.value);
            }}
            placeholder="Enter Destination"
            className="w-full px-4 py-2 border rounded"
          />
          {/* Dropdown for 'To' suggestions */}
          <ul className="absolute left-0 right-0 bg-white border rounded shadow-lg z-10 max-h-60 overflow-y-auto">
            {toLoading ? (
              <li className="px-4 py-2 hover:bg-gray-200">please wait...</li>
            ) : (
              toLocations.length > 0 &&
              toLocations.map((location: any) => (
                <li
                  key={location.skyId}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleSelectTo(location)}
                >
                  {location.presentation.title} ({location.skyId})
                </li>
              ))
            )}
          </ul>
        </div>

        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded"
        />

        <button
          type="button"
          className="bg-accent text-white px-6 py-2 rounded hover:bg-red-600 mt-4 md:mt-0"
          onClick={handleSearch}
        >
          Search
        </button>
      </form>
      {/* <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"> */}
      {flightsData && flightsData.status && (
        <div className="max-w-full mx-auto bg-gray-100 rounded-lg lg:p-6">
          <h2 className="text-lg font-semibold mb-4">
            {flightsData.data.context.totalResults} RESULTS
          </h2>
          {flightsData.data.itineraries.map((item: any) => (
            <FlightCard key={item.id} flight={item} />
          ))}
        </div>
      )}
      {/* </div> */}
    </div>
  );
};

export default SearchForm;
