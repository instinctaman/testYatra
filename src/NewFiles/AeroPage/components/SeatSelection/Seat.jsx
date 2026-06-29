import React from "react";
import "./Seat.css";
import {
  FaCrown,
  FaDoorOpen,
  FaExpandArrowsAlt,
} from "react-icons/fa";

const Seat = ({ seat, onClick }) => {
  const getSeatClass = () => {
    let classes = "seat";

    if (seat.occupied) {
      classes += " occupied";
    } else if (seat.selected) {
      classes += " selected";
    } else {
      classes += " available";
    }

    if (seat.category === "premium") {
      classes += " premium";
    }

    if (seat.category === "exit") {
      classes += " exit";
    }

    if (seat.category === "extraLegroom") {
      classes += " extra-legroom";
    }

    return classes;
  };

  const getCategoryIcon = () => {
    switch (seat.category) {
      case "premium":
        return <FaCrown />;

      case "exit":
        return <FaDoorOpen />;

      case "extraLegroom":
        return <FaExpandArrowsAlt />;

      default:
        return null;
    }
  };

  return (
    <button
      type="button"
      disabled={seat.occupied}
      className={getSeatClass()}
      onClick={() => onClick(seat.id)}
      aria-label={`Seat ${seat.id}`}
      title={`${seat.id} • ₹${seat.price}`}
    >
      {/* Seat Number */}
      <span className="seat-id">
        {seat.column}
      </span>

      {/* Passenger Badge */}
      {seat.selected && (
        <div className="passenger-badge">
          {seat.passengerId}
        </div>
      )}

      {/* Premium / Exit / Extra Legroom */}
      {seat.category !== "standard" && (
        <div className="seat-category-icon">
          {getCategoryIcon()}
        </div>
      )}

      {/* Price Tooltip */}
      <div className="seat-price">
        ₹{seat.price}
      </div>
    </button>
  );
};

export default Seat;