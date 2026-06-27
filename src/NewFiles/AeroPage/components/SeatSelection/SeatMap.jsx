import React from "react";
import "./SeatMap.css";
import Seat from "./Seat";

const SeatMap = ({ seatRows, onSeatClick }) => {
  const rows = Object.keys(seatRows).sort((a, b) => Number(a) - Number(b));

  return (
    <div className="seat-map card">
      <div className="seat-map-header">
        <h2>Select Your Seat</h2>
        <span>Click an available seat to assign it to the selected passenger.</span>
      </div>

      <div className="seat-map-wrapper">
        <div className="aircraft">

          {/* Aircraft Nose */}
          <div className="aircraft-nose">
            <div className="cockpit-window left" />
            <div className="cockpit-window right" />
          </div>

          {/* Column Headers */}
          <div className="seat-header">
            <div className="row-number-placeholder" />

            <div className="seat-column">A</div>
            <div className="seat-column">B</div>
            <div className="seat-column">C</div>

            <div className="aisle-header">AISLE</div>

            <div className="seat-column">D</div>
            <div className="seat-column">E</div>
            <div className="seat-column">F</div>
          </div>

          {/* Seat Rows */}
          {rows.map((row) => {
            const seats = seatRows[row];

            return (
              <React.Fragment key={row}>
                {(Number(row) === 12 || Number(row) === 13) && (
                  <div className="exit-row-banner">
                    EXIT ROW
                  </div>
                )}

                {Number(row) === 15 && (
                  <div className="wing-banner">
                    AIRCRAFT WING
                  </div>
                )}

                <div className="seat-row">
                  <div className="row-number">
                    {row}
                  </div>

                  {seats.slice(0, 3).map((seat) => (
                    <Seat
                      key={seat.id}
                      seat={seat}
                      onClick={onSeatClick}
                    />
                  ))}

                  <div className="aisle-space" />

                  {seats.slice(3).map((seat) => (
                    <Seat
                      key={seat.id}
                      seat={seat}
                      onClick={onSeatClick}
                    />
                  ))}
                </div>
              </React.Fragment>
            );
          })}

          {/* Aircraft Tail */}
          <div className="aircraft-tail" />
        </div>
      </div>
    </div>
  );
};

export default SeatMap;