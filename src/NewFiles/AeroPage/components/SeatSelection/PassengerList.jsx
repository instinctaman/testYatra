import React from "react";
import "./PassengerList.css";
import {
  FaUser,
  FaChair,
  FaTimesCircle,
  FaCheckCircle,
} from "react-icons/fa";

const PassengerList = ({
  passengers,
  activePassengerId,
  onPassengerSelect,
  onRemoveSeat,
}) => {
  return (
    <div className="passenger-card card">
      <div className="passenger-header">
        <h2>Select Passenger</h2>
        <span>{passengers.length} Traveller(s)</span>
      </div>

      <div className="passenger-list">
        {passengers.map((passenger) => {
          const isActive = passenger.id === activePassengerId;

          return (
            <div
              key={passenger.id}
              className={`passenger-item ${
                isActive ? "active-passenger" : ""
              }`}
              onClick={() => onPassengerSelect(passenger.id)}
            >
              <div className="passenger-left">
                <div className="passenger-avatar">
                  <FaUser />
                </div>

                <div className="passenger-details">
                  <h3>{passenger.name}</h3>

                  <span>{passenger.type}</span>
                </div>
              </div>

              <div className="passenger-right">
                {passenger.seat ? (
                  <>
                    <div className="seat-chip">
                      <FaChair />

                      <span>{passenger.seat}</span>
                    </div>

                    <button
                      className="remove-seat-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveSeat(passenger.id);
                      }}
                    >
                      <FaTimesCircle />
                    </button>
                  </>
                ) : (
                  <div className="seat-not-selected">
                    <FaCheckCircle />

                    <span>Select Seat</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PassengerList;