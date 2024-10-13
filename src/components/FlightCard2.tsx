interface Segment {
  id: string;
  origin: {
    flightPlaceId: string;
    displayCode: string;
    parent: {
      displayCode: string;
      name: string;
    };
    name: string;
    type: string;
    country: string;
  };
  destination: {
    flightPlaceId: string;
    displayCode: string;
    parent: {
      displayCode: string;
      name: string;
    };
    name: string;
    type: string;
    country: string;
  };
  departure: string;
  arrival: string;
  durationInMinutes: number;
  flightNumber: string;
  marketingCarrier: {
    name: string;
    logoUrl: string;
  };
}

interface Leg {
  id: string;
  origin: {
    name: string;
    displayCode: string;
    city: string;
    country: string;
  };
  destination: {
    name: string;
    displayCode: string;
    city: string;
    country: string;
  };
  durationInMinutes: number;
  departure: string;
  arrival: string;
  carriers: {
    marketing: Array<{
      id: number;
      name: string;
      logoUrl: string;
    }>;
  };
  segments: Segment[];
}

interface Price {
  raw: number;
  formatted: string;
}

interface Itinerary {
  id: string;
  price: Price;
  legs: Leg[];
  isSelfTransfer: boolean;
  farePolicy: {
    isChangeAllowed: boolean;
    isCancellationAllowed: boolean;
  };
}

interface Data {
  context: {
    status: string;
    totalResults: number;
  };
  itineraries: Itinerary[];
  filterStats: {
    duration: {
      min: number;
      max: number;
    };
    airports: Array<{
      city: string;
      airports: Array<{
        id: string;
        name: string;
      }>;
    }>;
    carriers: Array<{
      id: number;
      name: string;
      logoUrl: string;
    }>;
  };
  destinationImageUrl: string;
}

interface FlightCardProps {
  data: Data;
}

const FlightCard: React.FC<FlightCardProps> = ({ data }) => {
  const { context, itineraries, filterStats, destinationImageUrl } = data;

  if (!itineraries || itineraries.length === 0) {
    return <div>No itineraries available.</div>;
  }

  return (
    <div className="flight-card">
      {/* Display context information */}
      <div className="flight-context">
        <h2>Flight Search Results</h2>
        <p>Status: {context.status}</p>
        <p>Total Results: {context.totalResults}</p>
      </div>

      {/* Display the destination image */}
      <div className="flight-destination-image">
        <img src={destinationImageUrl} alt="Destination" />
      </div>

      {/* Loop through itineraries */}
      {itineraries.map((itinerary) => (
        <div key={itinerary.id} className="itinerary-card">
          <h3>Itinerary ID: {itinerary.id}</h3>
          <p>Price: {itinerary.price.formatted}</p>
          <p>Self Transfer: {itinerary.isSelfTransfer ? "Yes" : "No"}</p>
          <p>
            Change Allowed:{" "}
            {itinerary.farePolicy.isChangeAllowed ? "Yes" : "No"}
          </p>
          <p>
            Cancellation Allowed:{" "}
            {itinerary.farePolicy.isCancellationAllowed ? "Yes" : "No"}
          </p>

          {/* Display each leg of the itinerary */}
          {itinerary.legs.map((leg) => (
            <div key={leg.id} className="flight-leg">
              <h4>Leg ID: {leg.id}</h4>
              <p>
                From: {leg.origin.name} ({leg.origin.displayCode}),{" "}
                {leg.origin.city}, {leg.origin.country}
              </p>
              <p>
                To: {leg.destination.name} ({leg.destination.displayCode}),{" "}
                {leg.destination.city}, {leg.destination.country}
              </p>
              <p>Departure: {new Date(leg.departure).toLocaleString()}</p>
              <p>Arrival: {new Date(leg.arrival).toLocaleString()}</p>
              <p>
                Duration: {Math.floor(leg.durationInMinutes / 60)}h{" "}
                {leg.durationInMinutes % 60}m
              </p>

              {/* Display segments within each leg */}
              {leg.segments.map((segment) => (
                <div key={segment.id} className="flight-segment">
                  <h5>Segment ID: {segment.id}</h5>
                  <p>Flight Number: {segment.flightNumber}</p>
                  <p>
                    From: {segment.origin.name} ({segment.origin.displayCode})
                  </p>
                  <p>
                    To: {segment.destination.name} (
                    {segment.destination.displayCode})
                  </p>
                  <p>
                    Departure: {new Date(segment.departure).toLocaleString()}
                  </p>
                  <p>Arrival: {new Date(segment.arrival).toLocaleString()}</p>
                  <p>
                    Duration: {Math.floor(segment.durationInMinutes / 60)}h{" "}
                    {segment.durationInMinutes % 60}m
                  </p>
                  <p>Carrier: {segment.marketingCarrier.name}</p>
                  <img
                    src={segment.marketingCarrier.logoUrl}
                    alt={segment.marketingCarrier.name}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}

      {/* Display filter stats */}
      <div className="filter-stats">
        <h4>Filter Statistics</h4>
        <p>Duration Min: {filterStats.duration.min} minutes</p>
        <p>Duration Max: {filterStats.duration.max} minutes</p>

        <h4>Airports</h4>
        {filterStats.airports.map((airport) => (
          <div key={airport.city}>
            <p>{airport.city}</p>
            <ul>
              {airport.airports.map((a) => (
                <li key={a.id}>{a.name}</li>
              ))}
            </ul>
          </div>
        ))}

        <h4>Carriers</h4>
        {filterStats.carriers.map((carrier) => (
          <div key={carrier.id}>
            <img src={carrier.logoUrl} alt={carrier.name} />
            <p>{carrier.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlightCard;

// import React from "react";

// type Carrier = {
//   id: number;
//   name: string;
//   logoUrl: string;
// };

// type Segment = {
//   id: string;
//   origin: {
//     displayCode: string;
//     name: string;
//     country: string;
//   };
//   destination: {
//     displayCode: string;
//     name: string;
//     country: string;
//   };
//   departure: string;
//   arrival: string;
//   durationInMinutes: number;
//   flightNumber: string;
//   marketingCarrier: Carrier;
// };

// type Leg = {
//   id: string;
//   origin: {
//     name: string;
//     displayCode: string;
//     city: string;
//     country: string;
//   };
//   destination: {
//     name: string;
//     displayCode: string;
//     city: string;
//     country: string;
//   };
//   durationInMinutes: number;
//   stopCount: number;
//   departure: string;
//   arrival: string;
//   carriers: {
//     marketing: Carrier[];
//   };
//   segments: Segment[];
// };

// type Itinerary = {
//   id: string;
//   price: {
//     raw: number;
//     formatted: string;
//   };
//   legs: Leg[];
// };

// type FlightCardProps = {
//   itinerary: Itinerary;
// };

// const formatTime = (time: string) =>
//   new Date(time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
// const formatDate = (time: string) => new Date(time).toLocaleDateString();

// const FlightCard: React.FC<FlightCardProps> = ({ itinerary }) => {
//   const { price, legs } = itinerary;

//   return (
//     <div className="max-w-lg mx-auto p-4 border rounded-lg shadow-lg bg-white mb-4">
//       <div className="flex justify-between items-center">
//         <h3 className="text-lg font-bold">Price: {price.formatted}</h3>
//         <span className="bg-green-500 text-white px-2 py-1 rounded">
//           Stops: {legs[0].stopCount}
//         </span>
//       </div>

//       {legs.map((leg, index) => (
//         <div key={leg.id} className="mt-4">
//           <div className="flex justify-between items-center">
//             <div>
//               <h4 className="font-semibold">
//                 {leg.origin.city} ({leg.origin.displayCode}) →{" "}
//                 {leg.destination.city} ({leg.destination.displayCode})
//               </h4>
//               <p className="text-sm text-gray-600">
//                 {formatDate(leg.departure)} at {formatTime(leg.departure)} -{" "}
//                 {formatTime(leg.arrival)}
//               </p>
//             </div>
//             <div className="flex items-center">
//               {leg.carriers.marketing.map((carrier) => (
//                 <img
//                   key={carrier.id}
//                   src={carrier.logoUrl}
//                   alt={carrier.name}
//                   className="w-8 h-8 ml-2"
//                 />
//               ))}
//             </div>
//           </div>
//           <div className="mt-2 text-sm">
//             Duration: {Math.floor(leg.durationInMinutes / 60)}h{" "}
//             {leg.durationInMinutes % 60}m
//           </div>

//           {leg.segments.length > 1 && (
//             <div className="mt-4">
//               <h5 className="font-bold">Flight Segments:</h5>
//               {leg.segments.map((segment) => (
//                 <div key={segment.id} className="p-2 bg-gray-100 rounded mt-2">
//                   <p>
//                     {segment.origin.displayCode} →{" "}
//                     {segment.destination.displayCode}
//                   </p>
//                   <p className="text-sm">
//                     Departure: {formatTime(segment.departure)}, Arrival:{" "}
//                     {formatTime(segment.arrival)}
//                   </p>
//                   <p className="text-sm">
//                     Flight Number: {segment.flightNumber}
//                   </p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FlightCard;

// // import { Link } from "react-router-dom";

// // interface FlightCardProps {
// //   flight: {
// //     id: string;
// //     price: {
// //       raw: number;
// //       formatted: string;
// //     };
// //     legs: {
// //       id: string;
// //       origin: {
// //         name: string;
// //         displayCode: string;
// //         city: string;
// //         country: string;
// //       };
// //       destination: {
// //         name: string;
// //         displayCode: string;
// //         city: string;
// //         country: string;
// //       };
// //       departure: string;
// //       arrival: string;
// //       carriers: {
// //         marketing: {
// //           name: string;
// //           logoUrl: string;
// //         }[];
// //       };
// //       segments: {
// //         flightNumber: string;
// //         origin: {
// //           name: string;
// //           displayCode: string;
// //         };
// //         destination: {
// //           name: string;
// //           displayCode: string;
// //         };
// //         departure: string;
// //         arrival: string;
// //       }[];
// //     }[];
// //     destinationImageUrl?: string;
// //   };
// // }

// // const FlightCard = ({ flight }: FlightCardProps) => {
// //   const {
// //     legs,
// //     price,
// //     id,
// //     destinationImageUrl = "https://content.skyscnr.com/m/3719e8f4a5daf43d/original/Flights-Placeholder.jpg",
// //   } = flight;

// //   return (
// //     <div className="bg-white shadow-md rounded-lg p-4 flex flex-col">
// //       {/* Flight Image */}
// //       <img
// //         src={destinationImageUrl}
// //         alt="Flight Destination"
// //         className="rounded-lg mb-4 w-full object-cover h-48"
// //       />

// //       {/* Loop through each leg of the flight */}
// //       {legs.map((leg, index) => {
// //         const {
// //           origin,
// //           destination,
// //           departure,
// //           arrival,
// //           carriers: { marketing: airlineData },
// //           segments,
// //         } = leg;

// //         const airline =
// //           airlineData.length > 0 ? airlineData[0].name : "Unknown Airline";
// //         const flightNumber = segments[0]?.flightNumber || "N/A";
// //         const departureTime = new Date(departure).toLocaleString();
// //         const arrivalTime = new Date(arrival).toLocaleString();

// //         return (
// //           <div key={index} className="mb-4">
// //             {/* Flight Details for each leg */}
// //             <div className="flex justify-between items-center mb-2">
// //               <h2 className="text-lg font-semibold text-primary">{airline}</h2>
// //               <img
// //                 src={airlineData[0]?.logoUrl}
// //                 alt={airline}
// //                 className="h-6 w-6"
// //               />
// //             </div>
// //             <p className="text-secondary mt-2">Flight Number: {flightNumber}</p>
// //             <p className="text-secondary">
// //               Departure: {departureTime} from {origin.name} (
// //               {origin.displayCode})
// //             </p>
// //             <p className="text-secondary">
// //               Arrival: {arrivalTime} at {destination.name} (
// //               {destination.displayCode})
// //             </p>

// //             {/* Loop through segments */}
// //             <div className="mt-4">
// //               {segments.map((segment, segIndex) => (
// //                 <div key={segIndex} className="border-t pt-2">
// //                   <p className="text-sm">
// //                     Segment {segIndex + 1}: {segment.origin.name} (
// //                     {segment.origin.displayCode}) to {segment.destination.name}{" "}
// //                     ({segment.destination.displayCode})
// //                   </p>
// //                   <p className="text-sm">
// //                     Departure: {new Date(segment.departure).toLocaleString()},
// //                     Arrival: {new Date(segment.arrival).toLocaleString()}
// //                   </p>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         );
// //       })}

// //       {/* Price and View Details */}
// //       <p className="text-secondary mt-4 text-lg font-bold">
// //         Price: {price.formatted}
// //       </p>
// //       <Link
// //         to={`/flight/${id}`}
// //         className="mt-auto bg-primary text-white px-4 py-2 rounded hover:bg-blue-600 text-center"
// //       >
// //         View Details
// //       </Link>
// //     </div>
// //   );
// // };

// // export default FlightCard;
