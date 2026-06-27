
// export default NewFlightResults;
import React, { useState, useEffect } from "react";
import   "./NewFlightResults.css";

// ====================== HOOK ======================
function useScrollThreshold(threshold = 80) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
}

// ====================== MOCK DATA ======================
const MOCK_FLIGHTS = [
  { id: 1, airline: "IndiGo", code: "6E", flightNo: "6E-204", dep: "06:00", arr: "08:10", from: "DEL", to: "BOM", depTerminal: "2", arrTerminal: "1", duration: "2h 10m", stops: 0, price: 4599, oldPrice: null, fareType: "SAVER", tags: ["Cheapest", "Fastest"], meal: false, refundable: false },
  { id: 2, airline: "Air India", code: "AI", flightNo: "AI-865", dep: "07:30", arr: "09:55", from: "DEL", to: "BOM", depTerminal: "3", arrTerminal: "2", duration: "2h 25m", stops: 0, price: 5210, oldPrice: 6100, fareType: "FLEX", tags: ["Free Meal"], meal: true, refundable: true },
  { id: 3, airline: "SpiceJet", code: "SG", flightNo: "SG-117", dep: "09:15", arr: "11:30", from: "DEL", to: "BOM", depTerminal: "1D", arrTerminal: "1", duration: "2h 15m", stops: 0, price: 4199, oldPrice: null, fareType: "VALUE", tags: [], meal: false, refundable: false },
  { id: 4, airline: "Vistara", code: "UK", flightNo: "UK-995", dep: "11:00", arr: "13:30", from: "DEL", to: "BOM", depTerminal: "3", arrTerminal: "2", duration: "2h 30m", stops: 0, price: 6100, oldPrice: null, fareType: "PREMIUM", tags: ["Free Meal", "Extra Legroom"], meal: true, refundable: true },
  { id: 5, airline: "IndiGo", code: "6E", flightNo: "6E-712", dep: "14:00", arr: "16:20", from: "DEL", to: "BOM", depTerminal: "2", arrTerminal: "1", duration: "2h 20m", stops: 0, price: 4899, oldPrice: null, fareType: "SAVER", tags: [], meal: false, refundable: false },
  { id: 6, airline: "Air India", code: "AI", flightNo: "AI-102", dep: "16:45", arr: "19:30", from: "DEL", to: "BOM", depTerminal: "3", arrTerminal: "2", duration: "2h 45m", stops: 1, stopCity: "NAG", layover: "45m", price: 5899, oldPrice: null, fareType: "FLEX", tags: [], meal: true, refundable: true },
];

const AIRLINE_COLORS = {
  IndiGo: "#2d2e7f",
  "Air India": "#c8102e",
  SpiceJet: "#e87722",
  Vistara: "#6b3fa0",
};

// ====================== COMPONENTS ======================
function FullSearchBar({ onSearchClick }) {
  return (
    <div className="full-search-bar">
      <div className="search-field"><span className="field-label">FROM</span><div className="field-city">Delhi</div><div className="field-airport">Indira Gandhi Intl. DEL</div></div>
      <button className="swap-btn" title="Swap cities">⇌</button>
      <div className="search-field"><span className="field-label">TO</span><div className="field-city">Mumbai</div><div className="field-airport">Chhatrapati Shivaji BOM</div></div>
      <div className="search-divider" />
      <div className="search-field"><span className="field-label">DEPARTURE</span><div className="field-city">25 Jul '25</div><div className="field-airport">Thursday</div></div>
      <div className="search-divider" />
      <div className="search-field"><span className="field-label">TRAVELLERS & CLASS</span><div className="field-city">1 Adult</div><div className="field-airport">Economy</div></div>
      <button className="search-btn" onClick={onSearchClick}>Search</button>
    </div>
  );
}

function CompactSearchBar({ onModifyClick }) {
  return (
    <div className="compact-bar">
      <div className="compact-left">
        <span className="compact-route">Delhi → Mumbai</span>
        <span className="compact-dot">•</span>
        <span className="compact-detail">25 Jul '25</span>
        <span className="compact-dot">•</span>
        <span className="compact-detail">1 Adult · Economy</span>
      </div>
      <button className="modify-btn" onClick={onModifyClick}>Modify Search</button>
    </div>
  );
}

function SearchHeader({ onSearchClick, onModifyClick }) {
  const isScrolled = useScrollThreshold(80);
  return (
    <header className={`search-header ${isScrolled ? "scrolled" : ""}`}>
      <div className="header-inner">
        {isScrolled ?<FullSearchBar onSearchClick={onSearchClick}/> : <FullSearchBar onSearchClick={onSearchClick} />}
      </div>
    </header>
  );
}

function Filters({ onFilterChange }) {
  const [stops, setStops] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [priceRange, setPriceRange] = useState(20000);
  const [departureTimes, setDepartureTimes] = useState([]);

  const toggleItem = (list, setList, val) => {
    const newList = list.includes(val) ? list.filter(x => x !== val) : [...list, val];
    setList(newList);
    onFilterChange({ stops: newList, airlines, priceRange, departureTimes: [] });
  };

  return (
    <div className="filters-panel">
      <div className="filter-header">
        <span>Filters</span>
        <button className="filter-reset" onClick={() => {
          setStops([]); setAirlines([]); setPriceRange(20000); setDepartureTimes([]);
          onFilterChange({ stops: [], airlines: [], priceRange: 20000, departureTimes: [] });
        }}>Reset All</button>
      </div>

      <div className="filter-section">
        <div className="filter-title">Number of Stops</div>
        {["Non Stop", "1 Stop", "1+ Stops"].map(stop => (
          <label key={stop} className="filter-option">
            <input type="checkbox" checked={stops.includes(stop)} onChange={() => toggleItem(stops, setStops, stop)} />
            <span className="checkbox-custom" />
            <span className="filter-label">{stop}</span>
          </label>
        ))}
      </div>

      <div className="filter-section">
        <div className="filter-title">Max Price</div>
        <div className="price-display">
          <span>₹2,000</span>
          <span className="price-selected">₹{priceRange.toLocaleString()}</span>
        </div>
        <input type="range" min={2000} max={20000} step={500} value={priceRange} onChange={e => {
          setPriceRange(Number(e.target.value));
          onFilterChange({ stops, airlines, priceRange: Number(e.target.value), departureTimes: [] });
        }} className="price-slider" />
      </div>

      <div className="filter-section">
        <div className="filter-title">Airlines</div>
        {["IndiGo", "Air India", "SpiceJet", "Vistara"].map(airline => (
          <label key={airline} className="filter-option airline-option">
            <input type="checkbox" checked={airlines.includes(airline)} onChange={() => toggleItem(airlines, setAirlines, airline)} />
            <span className="checkbox-custom" />
            <span className="filter-label">{airline}</span>
          </label>
        ))}
      </div>

      <div className="filter-section">
        <div className="filter-title">Departure</div>
        {["Morning", "Noon", "Evening", "Night"].map(airline => (
          <label key={airline} className="filter-option airline-option">
            <input type="checkbox" checked={airlines.includes(airline)} onChange={() => toggleItem(airlines, setAirlines, airline)} />
            <span className="checkbox-custom" />
            <span className="filter-label">{airline}</span>
          </label>
        ))}
      </div>
    </div>

    
  );
}

function FlightCard({ flight }) {
  const [expanded, setExpanded] = useState(false);
  const accentColor = AIRLINE_COLORS[flight.airline] || "#2563eb";

  return (
    <div className="flight-card">
      <div className="card-main">
        <div className="airline-col">
          <div className="airline-logo-box" style={{ background: accentColor }}>{flight.code}</div>
          <div className="airline-name">{flight.airline}</div>
          <div className="flight-number">{flight.flightNo}</div>
        </div>

        <div className="time-col">
          <div className="flight-time">{flight.dep}</div>
          <div className="flight-airport">{flight.from}</div>
        </div>

        <div className="duration-col">
          <div className="duration-label">{flight.duration}</div>
          <div className="duration-line">
            <div className="line-dot" />
            <div className="line-track" />
            {flight.stops === 0 ? <div className="nonstop-label">Non stop</div> : <div className="stop-label">{flight.stopCity}</div>}
            <div className="line-track" />
            <div className="line-dot" />
          </div>
        </div>

        <div className="time-col">
          <div className="flight-time">{flight.arr}</div>
          <div className="flight-airport">{flight.to}</div>
        </div>

        <div className="price-col">
          {flight.oldPrice && <div className="old-price">₹{flight.oldPrice}</div>}
          <div className="flight-price">₹{flight.price}</div>
          <button className="book-btn" style={{ background: accentColor }}>Book Now</button>
          <button className="details-toggle" onClick={() => setExpanded(!expanded)}>
            {expanded ? "Hide Details ▲" : "Flight Details ▼"}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="card-expanded">
          <div className="baggage-info">
            <span>🧳 Cabin: 7 kg</span>
            <span>📦 Check-in: 15 kg</span>
          </div>
        </div>
      )}
    </div>
  );
}

function FlightList({ filters }) {
  const [sortBy, setSortBy] = useState("CHEAPEST");

  let filteredFlights = [...MOCK_FLIGHTS];

  if (filters.airlines.length > 0) {
    filteredFlights = filteredFlights.filter(f => filters.airlines.includes(f.airline));
  }
  if (filters.priceRange) {
    filteredFlights = filteredFlights.filter(f => f.price <= filters.priceRange);
  }

  if (sortBy === "CHEAPEST") filteredFlights.sort((a, b) => a.price - b.price);
  if (sortBy === "FASTEST") filteredFlights.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));

  return (
    <div>
      <div className="result-summary">
        <span className="result-count">{filteredFlights.length} flights found</span>
        <span className="result-route">Delhi → Mumbai • 25 Jul • 1 Adult</span>
      </div>

      <div className="sort-bar">
        {["CHEAPEST", "FASTEST", "EARLIEST", "LATEST"].map(opt => (
          <button key={opt} className={`sort-btn ${sortBy === opt ? "active" : ""}`} onClick={() => setSortBy(opt)}>
            {opt}
          </button>
        ))}
      </div>

      {filteredFlights.map(flight => <FlightCard key={flight.id} flight={flight} />)}
    </div>
  );
}

// ====================== MAIN EXPORT ======================
export default function NewFlightResults() {
  const [filters, setFilters] = useState({ stops: [], airlines: [], priceRange: 20000, departureTimes: [] });

  const handleSearchClick = () => alert("Search triggered! (Replace with modal if needed)");
  const handleModifyClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="bg-gray-100 min-h-screen">
      <SearchHeader onSearchClick={handleSearchClick} onModifyClick={handleModifyClick} />
      <div className="page-body">
        <Filters onFilterChange={setFilters} />
        <div className="main-content">
          <FlightList filters={filters} />
        </div>
      </div>
    </div>
  );
}
