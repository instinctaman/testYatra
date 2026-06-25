import { useLocation } from "react-router-dom";

function FlightResults() {
  const location = useLocation();

  const flights = location.state?.flights || [];

  return (
    <div className="container mt-5">

      <h2>Flight Results</h2>

      {flights.length > 0 ? (
        flights.map((flight, index) => (
          <div className="card p-3 mb-3" key={index}>
            <h5>{flight.airline}</h5>

            <p>
              {flight.origin} → {flight.destination}
            </p>

            <p>
              {flight.departure}
            </p>

            <p>
              ₹ {flight.price}
            </p>
          </div>
        ))
      ) : (
        <div className="alert alert-warning">
          No flights found
        </div>
      )}

    </div>
  );
}

export default FlightResults;