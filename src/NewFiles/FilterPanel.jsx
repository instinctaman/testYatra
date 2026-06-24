import React, { useState } from 'react';
import './FilterPanel.css';

const filterGroups = [
  {
    id: "stops",
    title: "Stops",
    icon: "🛑",
    items: ["Non-stop", "1 Stop", "2+ Stops"],
  },
  {
    id: "airlines",
    title: "Airlines",
    icon: "🛬",
    items: ["Vistara", "IndiGo", "Air India", "Akasa Air"],
  },
  {
    id: "time",
    title: "Departure Time",
    icon: "🕒",
    items: ["Before 8 AM", "8 AM - 12 PM", "12 PM - 6 PM", "After 6 PM"],
  },
];

const FilterPanel = () => {
  // Price Range
  const [priceRange, setPriceRange] = useState(8000);

  // Checkbox States
  const [stops, setStops] = useState({
    "Non-stop": false,
    "1 Stop": false,
    "2+ Stops": false,
  });

  const [airlines, setAirlines] = useState({
    "Vistara": false,
    "IndiGo": false,
    "Air India": false,
    "Akasa Air": false,
  });

  const [departureTime, setDepartureTime] = useState({
    "Before 8 AM": false,
    "8 AM - 12 PM": false,
    "12 PM - 6 PM": false,
    "After 6 PM": false,
  });

  const formatPrice = (value) => {
    return `INR ${Math.round(value / 1000)}k`;
  };

  // Reset All Filters
  const resetAllFilters = () => {
    setPriceRange(8000);
    setStops({
      "Non-stop": false,
      "1 Stop": false,
      "2+ Stops": false,
    });
    setAirlines({
      "Vistara": false,
      "IndiGo": false,
      "Air India": false,
      "Akasa Air": false,
    });
    setDepartureTime({
      "Before 8 AM": false,
      "8 AM - 12 PM": false,
      "12 PM - 6 PM": false,
      "After 6 PM": false,
    });
  };

  const handleCheckboxChange = (category, item) => {
    if (category === 'stops') {
      setStops(prev => ({ ...prev, [item]: !prev[item] }));
    } else if (category === 'airlines') {
      setAirlines(prev => ({ ...prev, [item]: !prev[item] }));
    } else if (category === 'time') {
      setDepartureTime(prev => ({ ...prev, [item]: !prev[item] }));
    }
  };

  return (
    <div className="filter-panel">
      {/* Header */}
      <div className="filter-header">
        <h5>Filters</h5>
        <button 
          type="button" 
          className="reset-btn"
          onClick={resetAllFilters}
        >
          Reset
        </button>
      </div>

      {/* Price Range */}
      <div className="price-section">
        <label className="section-title">Price range</label>
        
        <input
          type="range"
          className="price-slider"
          min="4000"
          max="12000"
          step="100"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
        />
        
        <div className="price-labels">
          <span>INR 4k</span>
          <span className="current-price">{formatPrice(priceRange)}</span>
          <span>INR 12k</span>
        </div>
      </div>

      {/* Scrollable Filter Groups */}
      <div className="filter-groups-scroll">
        {/* Stops */}
        <div className="filter-group">
          <div className="group-header">
            <span className="group-icon">{filterGroups[0].icon}</span>
            <span className="group-title">{filterGroups[0].title}</span>
          </div>
          <div className="checkbox-list">
            {filterGroups[0].items.map((item) => (
              <label className="checkbox-item" key={item}>
                <input
                  type="checkbox"
                  checked={stops[item]}
                  onChange={() => handleCheckboxChange('stops', item)}
                />
                <span className="checkmark"></span>
                <span className="checkbox-label">{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Airlines */}
        <div className="filter-group">
          <div className="group-header">
            <span className="group-icon">{filterGroups[1].icon}</span>
            <span className="group-title">{filterGroups[1].title}</span>
          </div>
          <div className="checkbox-list">
            {filterGroups[1].items.map((item) => (
              <label className="checkbox-item" key={item}>
                <input
                  type="checkbox"
                  checked={airlines[item]}
                  onChange={() => handleCheckboxChange('airlines', item)}
                />
                <span className="checkmark"></span>
                <span className="checkbox-label">{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Departure Time */}
        <div className="filter-group">
          <div className="group-header">
            <span className="group-icon">{filterGroups[2].icon}</span>
            <span className="group-title">{filterGroups[2].title}</span>
          </div>
          <div className="checkbox-list">
            {filterGroups[2].items.map((item) => (
              <label className="checkbox-item" key={item}>
                <input
                  type="checkbox"
                  checked={departureTime[item]}
                  onChange={() => handleCheckboxChange('time', item)}
                />
                <span className="checkmark"></span>
                <span className="checkbox-label">{item}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;