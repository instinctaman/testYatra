import "./FilterPanel.css";

export default function FilterPanel({ flights, filters, setFilters }) {
  const airlines = [...new Set(flights.map((f) => f.airline))];
  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h4>Filters</h4>
        <button className="reset-btn">Reset</button>
      </div>

      {/* Stops */}

      <div className="filter-card">
        <h6>Stops</h6>

        <select
          className="form-select"
          value={filters.stops}
          onChange={(e) =>
            setFilters({
              ...filters,
              stops: e.target.value,
            })
          }
        >
          <option value="all">All Stops</option>
          <option value="0">Non Stop</option>
          <option value="1">1 Stop</option>
          <option value="2">2+ Stops</option>
        </select>
      </div>

      {/* Price */}

      <div className="filter-card">
        <h6>Price</h6>

        <input
          type="range"
          min="1000"
          max="30000"
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters({
              ...filters,
              maxPrice: Number(e.target.value),
            })
          }
        />

        <div className="price-range">₹1,000 - ₹{filters.maxPrice}</div>
      </div>

      {/* Airlines */}

      <div className="filter-card">
        <h6>Airlines</h6>

        {airlines.map((airline) => (
          <label key={airline}>
            <input
              type="radio"
              checked={filters.airline === airline}
              onChange={() =>
                setFilters({
                  ...filters,
                  airline,
                })
              }
            />
            {airline}
          </label>
        ))}
      </div>

      {/* Departure */}

      <div className="filter-card">
        <h6>Departure</h6>

        <button className="time-chip">Morning</button>

        <button className="time-chip">Afternoon</button>

        <button className="time-chip">Evening</button>

        <button className="time-chip">Night</button>
      </div>

      {/* Duration */}

      <div className="filter-card">
        <input
          type="range"
          min="30"
          max="1000"
          value={filters.maxDuration}
          onChange={(e) =>
            setFilters({
              ...filters,
              maxDuration: Number(e.target.value),
            })
          }
        />

        <div>Up to {filters.maxDuration} mins</div>
      </div>

      {/* Cabin */}

      <div className="filter-card">
        <h6>Cabin</h6>

        <label>
          <input type="radio" name="cabin" />
          Economy
        </label>

        <label>
          <input type="radio" name="cabin" />
          Business
        </label>
      </div>

      {/* Refund */}

      <div className="filter-card">
        <label>
          <input type="checkbox" />
          Refundable Only
        </label>
      </div>

      <button className="apply-btn">Apply Filters</button>
    </div>
  );
}
