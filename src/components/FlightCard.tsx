// src/components/FlightCard.jsx
import { Link } from "react-router-dom";

const FlightCard = ({ flight }: any) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col">
      <h2 className="text-lg font-semibold text-primary">{flight.airline}</h2>
      <p className="text-secondary mt-2">
        Flight Number: {flight.flightNumber}
      </p>
      <p className="text-secondary">Departure: {flight.departureTime}</p>
      <p className="text-secondary">Arrival: {flight.arrivalTime}</p>
      <p className="text-secondary">Price: ${flight.price}</p>
      <Link
        to={`/flight/${flight.id}`}
        className="mt-auto bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 text-center"
      >
        View Details
      </Link>
    </div>
  );
};

export default FlightCard;
