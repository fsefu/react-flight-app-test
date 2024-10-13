import { useState } from "react";
import { fetchFlights, searchAirports } from "../services/api";
import FlightCard from "./FlightCard";

const SearchForm = () => {
  const [from, setFrom] = useState(""); // Stores input value for 'From'
  const [to, setTo] = useState(""); // Stores input value for 'To'
  const [departureDate, setDepartureDate] = useState("");
  const [toLoading, setToLoading] = useState(false);
  const [fromLoading, setFromLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [fromLocations, setFromLocations] = useState([]); // Stores airports for 'From'
  const [toLocations, setToLocations] = useState([]); // Stores airports for 'To'

  const [originSkyId, setOriginSkyId] = useState("");
  const [destinationSkyId, setDestinationSkyId] = useState("");
  const [originEntityId, setOriginEntityId] = useState("");
  const [destinationEntityId, setDestinationEntityId] = useState("");
  const [flights, setFlights] = useState<any>({});
  // Function to fetch airport suggestions for 'From'
  const handleFromSearch = async (query: any) => {
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
  const handleToSearch = async (query: any) => {
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
    setFromLocations([]); // Clear the dropdown
  };

  const handleSelectTo = (location: any) => {
    setDestinationSkyId(location.navigation.relevantFlightParams.entityId);
    setDestinationEntityId(location.navigation.relevantFlightParams.entityId);
    setTo(location.presentation.title); // Update input field with selected airport name
    setToLocations([]); // Clear the dropdown
  };

  const handleSearch = async (e: any) => {
    e.preventDefault();
    setIsSearching(true);
    try {
      const params: any = {
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
      setIsSearching(false);
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
              fromLocations.map((location: any) => (
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
          min={new Date().toISOString().split("T")[0]} // Set the minimum date to today
          required
        />

        <button
          type="button"
          className="relative bg-accent text-white px-6 py-2 rounded hover:bg-red-600 mt-4 md:mt-0 flex items-center justify-center"
          onClick={handleSearch}
          disabled={isSearching}
        >
          <span className={isSearching ? "invisible" : "visible"}>Search</span>

          {isSearching && (
            <svg
              aria-hidden="true"
              role="status"
              className="absolute inline w-4 h-4 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
          )}
        </button>
      </form>
      {flights && flights.status && (
        <div className="max-w-full mx-auto bg-gray-100 rounded-lg lg:p-6">
          <h2 className="text-lg font-semibold mb-4">
            {flights.data.context.totalResults} RESULTS
          </h2>
          {flights.data.itineraries.map((item: any) => (
            <FlightCard key={item.id} flight={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchForm;
