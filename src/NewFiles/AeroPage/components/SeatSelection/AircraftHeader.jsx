import React from "react";
import "./AircraftHeader.css";
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaPlane,
} from "react-icons/fa";

const AircraftHeader = () => {
  return (
    <div className="aircraft-header card">

      <div className="flight-top">

        <div className="airline">

          <div className="airline-logo">
            AI
          </div>

          <div>
            <h3>Air India</h3>
            <span>AI-302</span>
          </div>

        </div>

        <div className="aircraft-name">
          <FaPlane />
          Airbus A320
        </div>

      </div>

      <div className="route-section">

        <div className="city">

          <span className="airport-code">
            DEL
          </span>

          <span className="city-name">
            Delhi
          </span>

          <span className="time">
            09:20
          </span>

        </div>

        <div className="route-line">

          <div className="line" />

          <FaPlane className="plane-icon" />

          <div className="line" />

        </div>

        <div className="city">

          <span className="airport-code">
            BOM
          </span>

          <span className="city-name">
            Mumbai
          </span>

          <span className="time">
            11:35
          </span>

        </div>

      </div>

      <div className="flight-info">

        <div className="info-box">

          <FaPlaneDeparture />

          <div>
            <label>Departure</label>
            <p>28 Aug 2026</p>
          </div>

        </div>

        <div className="info-box">

          <FaPlaneArrival />

          <div>
            <label>Arrival</label>
            <p>28 Aug 2026</p>
          </div>

        </div>

        <div className="info-box">

          <FaPlane />

          <div>
            <label>Cabin</label>
            <p>Economy</p>
          </div>

        </div>

        <div className="info-box">

          <FaPlane />

          <div>
            <label>Duration</label>
            <p>2h 15m</p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default AircraftHeader;