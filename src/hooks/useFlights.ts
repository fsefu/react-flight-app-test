import { useState, useEffect } from "react";
import { fetchFlights } from "../services/api";

const useFlights = (params: any) => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFlights = async () => {
      setLoading(true);
      try {
        const data = await fetchFlights(params);
        setFlights(data.flights);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (params.from && params.to && params.departureDate) {
      getFlights();
    }
  }, [params]);

  return { flights, loading, error };
};

export default useFlights;
