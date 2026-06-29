import React from "react";

const Section = ({ title, children }) => {
  return (
    <div className="fare-section">
      <div className="fare-section-title">
        {title}
      </div>

      <div className="fare-section-content">
        {children}
      </div>
    </div>
  );
};

export default Section;