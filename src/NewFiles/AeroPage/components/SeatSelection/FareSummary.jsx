import React from "react";
import "./FareSummary.css";
import {
  FaChair,
  FaUser,
  FaReceipt,
  FaCheckCircle,
} from "react-icons/fa";

const FareSummary = ({
  passengers,
  selectedSeats,
  totalAmount,
  gst,
  grandTotal,
  addons = [],
  finalTotal = grandTotal,
}) => {
  const getSeatPrice = (seatNumber) => {
    const seat = selectedSeats.find(
      (item) => item.id === seatNumber
    );

    return seat ? seat.price : 0;
  };

  return (
    <div className="fare-summary card">

      <div className="fare-header">

        <h2>
          <FaReceipt />
          Fare Summary
        </h2>

      </div>

      {/* Passenger Seats */}

      <div className="summary-section">

        <h3>Passengers</h3>

        {passengers.map((passenger) => (
          <div
            key={passenger.id}
            className="summary-passenger"
          >
            <div className="summary-left">

              <FaUser />

              <div>

                <span className="passenger-name">
                  {passenger.name}
                </span>

                <span className="passenger-type">
                  {passenger.type}
                </span>

              </div>

            </div>

            <div className="summary-right">

              {passenger.seat ? (
                <>
                  <div className="seat-tag">

                    <FaChair />

                    {passenger.seat}

                  </div>

                  <span className="seat-price-value">
                    ₹{getSeatPrice(passenger.seat)}
                  </span>
                </>
              ) : (
                <span className="no-seat">
                  Not Selected
                </span>
              )}

            </div>

          </div>
        ))}

      </div>

      {/* Price Details */}

      <div className="price-breakup">

        <div className="price-row">

          <span>Seat Charges</span>

          <strong>
            ₹{totalAmount}
          </strong>

        </div>

        <div className="price-row">

          <span>GST (18%)</span>

          <strong>
            ₹{gst}
          </strong>

        </div>

        <div className="divider" />

        <div className="price-row total-row">

          <span>Seat Total</span>

          <strong>
            ₹{grandTotal}
          </strong>

        </div>

        {addons
          .filter((addon) => addon.price > 0)
          .map((addon) => (
            <div className="price-row addon-row" key={addon.label}>
              <span>{addon.label}</span>
              <strong>â‚¹{addon.price}</strong>
            </div>
          ))}

        <div className="price-row total-row final-row">
          <span>Total Payable</span>
          <strong>â‚¹{finalTotal}</strong>
        </div>

      </div>

      {/* Footer */}

      <div className="summary-footer">

        <FaCheckCircle />

        <span>
          Seats will be confirmed after payment.
        </span>

      </div>

    </div>
  );
};

export default FareSummary;
