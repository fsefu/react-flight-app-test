// src/components/SearchForm.jsx
import { useState } from "react";
import { fetchFlights } from "../services/api";
import FlightCard from "./FlightCard";

const SearchForm = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [flights, setFlights] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const params = { from, to, departureDate };
      const data = await fetchFlights(params);
      setFlights(data.flights);
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-secondary p-6 rounded-lg shadow-md">
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row md:space-x-4"
      >
        <input
          type="text"
          placeholder="From"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded mb-4 md:mb-0"
          required
        />
        <input
          type="text"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded mb-4 md:mb-0"
          required
        />
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded mb-4 md:mb-0"
          required
        />
        <button
          type="submit"
          className="bg-accent text-white px-6 py-2 rounded hover:bg-red-600"
        >
          Search
        </button>
      </form>
      {loading ? (
        <p className="mt-4">Loading flights...</p>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {flights.map((flight: any) => (
            <FlightCard key={flight.id} flight={flight} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchForm;
