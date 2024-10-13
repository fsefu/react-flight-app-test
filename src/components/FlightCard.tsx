interface FlightCardProps {
  flight: any;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  // Format the dates
  const departureDate = new Date(flight.legs[0].departure);
  const arrivalDate = new Date(flight.legs[0].arrival);

  // Format parts of the date and time
  const formatDate = (date: any) =>
    date.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  const formatTime = (date: any) =>
    date.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  // utils.js
  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 shadow-md max-w-screen-4xl mx-auto lg:flex lg:space-x-8 mb-4 lg:mb-8">
      <div className="lg:w-2/3">
        {/* Date and Times */}
        <div className="flex justify-between text-xs lg:text-sm text-gray-500 mb-4">
          {/* <div>Mon, Oct 14</div>
          <div>Mon, Oct 14, 2024</div> */}
          <div>{formatDate(departureDate)}</div>
          <div>{formatDate(arrivalDate)}</div>
        </div>

        <div className="flex justify-between items-center mb-2 text-xs">
          <div className="text-lg lg:text-2xl font-bold text-black">
            {formatTime(departureDate)}
          </div>
          <div className="text-lg lg:text-2xl font-bold text-black">
            {formatTime(arrivalDate)}
          </div>
        </div>

        {/* Route Information */}
        <div className="flex items-center justify-between text-base lg:text-lg font-semibold text-gray-700 mb-2">
          <div>{flight.legs[0].origin.displayCode}</div>
          <div className="flex-grow border-t border-gray-300 mx-4"></div>
          <div className="text-xs lg:text-sm text-gray-500">
            {flight.legs[0].stopCount > 0 ? (
              <div>
                {flight.legs[0].stopCount}{" "}
                {flight.legs[0].stopCount === 1 ? "Stop" : "Stops"}
              </div>
            ) : (
              <div>Nonstop</div>
            )}{" "}
            <div className="text-xs lg:text-sm text-gray-500">
              {formatDuration(flight.legs[0].durationInMinutes)}
            </div>
          </div>
          <div className="flex-grow border-t border-gray-300 mx-4"></div>
          <div>{flight.legs[0].destination.displayCode}</div>
        </div>
      </div>

      {/* Price and Flight Miles */}
      <div className="lg:w-1/3 lg:border-l lg:border-gray-300 lg:pl-4">
        <div className="flex justify-between items-center mb-4 lg:block">
          {/* Flight miles section */}
          <div className="flex items-center space-x-2 mb-4 lg:mb-2 ">
            <img
              src={flight.legs[0].carriers.marketing[0].logoUrl}
              alt="Flight miles icon"
              className="w-6 h-6 lg:h-12 lg:w-12"
            />
            {/* <span className="text-xs lg:text-sm text-gray-600">
              Earn Up to 100 miles
            </span> */}
          </div>

          <div className="text-right">
            <span className="text-lg lg:text-2xl font-semibold text-green-600">
              {flight.price.formatted}
            </span>
            <div className="text-xs lg:text-sm text-gray-500">
              Per Passenger
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center lg:block">
          <div></div>
          <div className="flex-grow border-t border-gray-300 mx-4 lg:mx-0 lg:mt-2"></div>
          <div className="bg-green-100 text-green-600 px-2 py-1 rounded text-xs font-semibold lg:mt-4">
            Lowest price
          </div>
        </div>

        <div className="text-green-600 text-xs lg:text-sm font-semibold mt-4">
          More Detail {">"}
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
