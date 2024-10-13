// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { fetchFlights } from "../services/api";

// const FlightDetails = () => {
//   const { id } = useParams();
//   const [flight, setFlight] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getFlight = async () => {
//       try {
//         const data = await fetchFlights({ id });
//         setFlight(data.flight);
//       } catch (error) {
//         console.error("Error fetching flight details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getFlight();
//   }, [id]);

//   if (loading) {
//     return <p>Loading flight details...</p>;
//   }

//   if (!flight) {
//     return <p>Flight not found.</p>;
//   }

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold text-primary">
//         {flight.airline} - {flight.flightNumber}
//       </h2>
//       <p className="text-secondary mt-2">From: {flight.from}</p>
//       <p className="text-secondary">To: {flight.to}</p>
//       <p className="text-secondary">Departure: {flight.departureTime}</p>
//       <p className="text-secondary">Arrival: {flight.arrivalTime}</p>
//       <p className="text-secondary">Price: ${flight.price}</p>
//       {/* Add more detailed information as needed */}
//     </div>
//   );
// };

// export default FlightDetails;
