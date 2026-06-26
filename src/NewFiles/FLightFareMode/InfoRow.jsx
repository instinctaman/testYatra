import React from "react";

const InfoRow = ({
  icon,
  text,
  color = "#374151",
}) => {
  return (
    <div className="info-row">
      <div className="info-icon">
        {icon}
      </div>

      <span
        className="info-text"
        style={{ color }}
      >
        {text}
      </span>
    </div>
  );
};

export default InfoRow;