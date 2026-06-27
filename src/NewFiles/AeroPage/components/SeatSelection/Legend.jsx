import React from "react";
import "./Legend.css";

const legendItems = [
  {
    label: "Available",
    className: "available",
  },
  {
    label: "Selected",
    className: "selected",
  },
  {
    label: "Occupied",
    className: "occupied",
  },
  {
    label: "Premium",
    className: "premium",
  },
  {
    label: "Exit Row",
    className: "exit",
  },
  {
    label: "Extra Legroom",
    className: "extra-legroom",
  },
];

const Legend = () => {
  return (
    <div className="legend card">

      <div className="legend-header">
        <h2>Seat Legend</h2>
      </div>

      <div className="legend-grid">
        {legendItems.map((item) => (
          <div className="legend-item" key={item.label}>

            <div
              className={`legend-seat ${item.className}`}
            />

            <span>{item.label}</span>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Legend;