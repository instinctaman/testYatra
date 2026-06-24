import React, { useState } from "react";
import api from "../services/api";

function FlightSearch() {

  const [flights, setFlights] = useState([]);
  const [departureDate, setDepartureDate] = useState("2026-07-15");

  const searchFlights = async () => {

    try {

      const response = await api.post(
        "/flight/search",
        {
          origin: "DEL",
          destination: "BOM",
          departure_date: departureDate,
          adults: 1,
          children: 0,
          infants: 0,
        }
      );

      setFlights(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">

      <button
        className="btn btn-primary mb-3"
        onClick={searchFlights}
      >
        Search Flights
      </button>

      {flights.map((flight, index) => (
        <div className="card p-3 mb-3" key={index}>

          <h5>{flight.airline}</h5>

          <p>
            {flight.origin} → {flight.destination}
          </p>

          <p>Departure: {flight.departure}</p>

          <p>Arrival: {flight.arrival}</p>

          <p>Stops: {flight.stops}</p>

          <p>Duration: {flight.duration} mins</p>

          <p>Fare: ₹{flight.price}</p>

          <button className="btn btn-success">
            Book Now
          </button>

        </div>
      ))}

    </div>
  );
}

export default FlightSearch;