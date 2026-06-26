import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./FlightSearchBar.css";

const CITIES = [
  { city: "New Delhi", code: "DEL", country: "India", airport: "Indira Gandhi International Airport" },
  { city: "Mumbai", code: "BOM", country: "India", airport: "Chhatrapati Shivaji Maharaj International Airport" },
  { city: "Bangalore", code: "BLR", country: "India", airport: "Kempegowda International Airport" },
  { city: "Hyderabad", code: "HYD", country: "India", airport: "Rajiv Gandhi International Airport" },
  { city: "Chennai", code: "MAA", country: "India", airport: "Chennai International Airport" },
  { city: "Kolkata", code: "CCU", country: "India", airport: "Netaji Subhas Chandra Bose International Airport" },
  { city: "Pune", code: "PNQ", country: "India", airport: "Pune Airport" },
  { city: "Ahmedabad", code: "AMD", country: "India", airport: "Sardar Vallabhbhai Patel International Airport" },
  { city: "Jaipur", code: "JAI", country: "India", airport: "Jaipur International Airport" },
  { city: "Goa", code: "GOI", country: "India", airport: "Goa International Airport" },
  { city: "Dubai", code: "DXB", country: "UAE", airport: "Dubai International Airport" },
  { city: "Singapore", code: "SIN", country: "Singapore", airport: "Singapore Changi Airport" },
  { city: "London", code: "LHR", country: "UK", airport: "Heathrow Airport" },
  { city: "New York", code: "JFK", country: "USA", airport: "John F. Kennedy International Airport" },
  { city: "Bangkok", code: "BKK", country: "Thailand", airport: "Suvarnabhumi Airport" },
];

const POPULAR_ROUTES = [
  { from: "DEL", to: "BOM" },
  { from: "BLR", to: "DXB" },
  { from: "BOM", to: "SIN" },
  { from: "DEL", to: "GOI" },
];

const FARE_TYPES = ["Regular", "Student", "Senior Citizen", "Corporate"];

const NAV_TABS = [
  { id: "flights", label: "Flights", icon: "✈" },
  { id: "hotels", label: "Hotels", icon: "🏨" },
  { id: "packages", label: "Packages", icon: "🗺" },
  { id: "cruises", label: "Cruises", icon: "🚢" },
];

// Calendar Component
function Calendar({ selectedDate, onDateSelect, minDate }) {
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate || Date.now()));

  useEffect(() => {
    if (selectedDate) {
      setCurrentMonth(new Date(selectedDate));
    }
  }, [selectedDate]);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = (e) => {
    e.stopPropagation();
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const nextMonth = (e) => {
    e.stopPropagation();
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const isDateDisabled = (day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return new Date(dateStr) < new Date(minDate);
  };

  const handleDateClick = (day) => {
    if (isDateDisabled(day)) return;
    const newDate = new Date(year, month, day);
    const formattedDate = `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}-${String(newDate.getDate()).padStart(2, '0')}`;
    onDateSelect(formattedDate);
  };

  const dates = [];
  for (let i = 0; i < firstDay; i++) dates.push(null);
  for (let day = 1; day <= daysInMonth; day++) dates.push(day);

  return (
    <div className="fsb-calendar">
      <div className="fsb-calendar-header">
        <button onClick={prevMonth}>←</button>
        <span>{currentMonth.toLocaleString('default', { month: 'long' })} {year}</span>
        <button onClick={nextMonth}>→</button>
      </div>

      <div className="fsb-calendar-weekdays">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
          <div key={d} className="fsb-calendar-weekday">{d}</div>
        ))}
      </div>

      <div className="fsb-calendar-grid">
        {dates.map((day, i) => (
          day ? (
            <button
              key={i}
              className={`fsb-calendar-day ${
                selectedDate === `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}` 
                  ? 'fsb-selected' : ''
              } ${isDateDisabled(day) ? 'fsb-disabled' : ''}`}
              onClick={() => handleDateClick(day)}
              disabled={isDateDisabled(day)}
            >
              {day}
            </button>
          ) : <div key={i} className="fsb-calendar-empty" />
        ))}
      </div>
    </div>
  );
}

export default function FlightSearchBar() {
  const navigate = useNavigate();

  const [activeNav, setActiveNav] = useState("flights");
  const [tripType, setTripType] = useState("round-trip");
  const [from, setFrom] = useState(CITIES[0]);
  const [to, setTo] = useState(CITIES[1]);
  const [departure, setDeparture] = useState("2026-07-12");
  const [returnDate, setReturnDate] = useState("2026-07-18");
  const [travellers, setTravellers] = useState({ adults: 1, children: 0, infants: 0 });
  const [cabinClass, setCabinClass] = useState("Economy");
  const [fareType, setFareType] = useState("Regular");

  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [showTravellerDropdown, setShowTravellerDropdown] = useState(false);
  const [showDepartureCalendar, setShowDepartureCalendar] = useState(false);
  const [showReturnCalendar, setShowReturnCalendar] = useState(false);

  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");

  const fromRef = useRef(null);
  const toRef = useRef(null);
  const travellerRef = useRef(null);
  const departureRef = useRef(null);
  const returnRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (fromRef.current && !fromRef.current.contains(e.target)) setShowFromDropdown(false);
      if (toRef.current && !toRef.current.contains(e.target)) setShowToDropdown(false);
      if (travellerRef.current && !travellerRef.current.contains(e.target)) setShowTravellerDropdown(false);
      if (departureRef.current && !departureRef.current.contains(e.target)) setShowDepartureCalendar(false);
      if (returnRef.current && !returnRef.current.contains(e.target)) setShowReturnCalendar(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filteredFrom = CITIES.filter(c =>
    c.city.toLowerCase().includes(fromQuery.toLowerCase()) ||
    c.code.toLowerCase().includes(fromQuery.toLowerCase())
  );

  const filteredTo = CITIES.filter(c =>
    c.city.toLowerCase().includes(toQuery.toLowerCase()) ||
    c.code.toLowerCase().includes(toQuery.toLowerCase())
  );

  const totalTravellers = travellers.adults + travellers.children + travellers.infants;

  const swapCities = () => {
    setFrom(to);
    setTo(from);
  };

  const handleTripType = (type) => {
    setTripType(type);
    if (type === "one-way") setReturnDate("");
    else if (!returnDate) setReturnDate("2026-07-18");
  };

  const updateTraveller = (type, delta) => {
    setTravellers(prev => {
      const next = { ...prev, [type]: Math.max(0, prev[type] + delta) };
      if (next.adults < 1) next.adults = 1;
      return next;
    });
  };

  const formatDate = (val) => {
    if (!val) return "";
    const d = new Date(val);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    return `${day}-${month}-${d.getFullYear()}`;
  };

  const handleDepartureSelect = (newDate) => {
    setDeparture(newDate);
    setShowDepartureCalendar(false);
    if (tripType === "round-trip" && (!returnDate || new Date(newDate) > new Date(returnDate))) {
      setReturnDate(newDate);
    }
  };

  const handleReturnSelect = (newDate) => {
    setReturnDate(newDate);
    setShowReturnCalendar(false);
  };

  // Search Button Handler
  const handleSearch = () => {
    const searchData = {
      from: from.code,
      to: to.code,
      departureDate: departure,
      returnDate: tripType === "round-trip" ? returnDate : null,
      tripType,
      travellers,
      cabinClass,
      fareType,
    };

    navigate("/search-results", { state: searchData });
  };

  return (
    <div className="fsb-card">
      {/* TOP NAV */}
      <div className="fsb-nav-row">
        {NAV_TABS.map(tab => (
          <button
            key={tab.id}
            className={`fsb-nav-tab ${activeNav === tab.id ? "fsb-nav-active" : ""}`}
            onClick={() => setActiveNav(tab.id)}
          >
            <span className="fsb-nav-icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* TRIP TYPE */}
      <div className="fsb-trip-row">
        {[
          { id: "one-way", label: "One Way" },
          { id: "round-trip", label: "Round Trip" },
          { id: "multi-city", label: "Multi City" },
        ].map(opt => (
          <label key={opt.id} className={`fsb-radio-label ${tripType === opt.id ? "fsb-radio-active" : ""}`}>
            <span className={`fsb-radio-circle ${tripType === opt.id ? "fsb-radio-circle-active" : ""}`}>
              {tripType === opt.id && <span className="fsb-radio-dot" />}
            </span>
            {opt.label}
            <input
              type="radio"
              name="tripType"
              value={opt.id}
              checked={tripType === opt.id}
              onChange={() => handleTripType(opt.id)}
              className="fsb-radio-hidden"
            />
          </label>
        ))}
      </div>

      {/* FIELDS */}
      <div className="fsb-fields-outer">
        {/* FROM */}
        <div ref={fromRef} className="fsb-field-cell">
          <div className="fsb-field-inner" onClick={() => { setShowFromDropdown(true); setFromQuery(""); }}>
            <div className="fsb-field-label">From</div>
            <div className="fsb-big-city">{from.city}</div>
            <div className="fsb-sub-city">{from.code}, {from.country}</div>
          </div>
          {showFromDropdown && (
            <div className="fsb-dropdown">
              <input autoFocus className="fsb-dropdown-input" placeholder="Search city or airport..."
                value={fromQuery} onChange={e => setFromQuery(e.target.value)} />
              {filteredFrom.map(c => (
                <div key={c.code} className="fsb-dropdown-item"
                  onClick={() => { setFrom(c); setShowFromDropdown(false); }}>
                  <div className="fsb-drop-row">
                    <div>
                      <div className="fsb-drop-city">{c.city}</div>
                      <div className="fsb-drop-airport">{c.airport}</div>
                    </div>
                    <span className="fsb-drop-code">{c.code}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button className="fsb-swap-btn" onClick={swapCities}>⇄</button>

        {/* TO */}
        <div ref={toRef} className="fsb-field-cell">
          <div className="fsb-field-inner" onClick={() => { setShowToDropdown(true); setToQuery(""); }}>
            <div className="fsb-field-label">To</div>
            <div className="fsb-big-city">{to.city}</div>
            <div className="fsb-sub-city">{to.code}, {to.country}</div>
          </div>
          {showToDropdown && (
            <div className="fsb-dropdown">
              <input autoFocus className="fsb-dropdown-input" placeholder="Search city or airport..."
                value={toQuery} onChange={e => setToQuery(e.target.value)} />
              {filteredTo.map(c => (
                <div key={c.code} className="fsb-dropdown-item"
                  onClick={() => { setTo(c); setShowToDropdown(false); }}>
                  <div className="fsb-drop-row">
                    <div>
                      <div className="fsb-drop-city">{c.city}</div>
                      <div className="fsb-drop-airport">{c.airport}</div>
                    </div>
                    <span className="fsb-drop-code">{c.code}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* DEPARTURE */}
        <div ref={departureRef} className="fsb-field-cell fsb-date-cell">
          <div className="fsb-field-inner fsb-date-label" onClick={() => setShowDepartureCalendar(v => !v)}>
            <div className="fsb-field-label">Departure</div>
            <div className="fsb-big-city">{departure ? formatDate(departure) : "Select Date"}</div>
            <div className="fsb-sub-city">Flexible fares enabled</div>
          </div>
          {showDepartureCalendar && (
            <div className="fsb-dropdown fsb-calendar-dropdown">
              <Calendar 
                selectedDate={departure} 
                onDateSelect={handleDepartureSelect} 
                minDate={new Date().toISOString().split('T')[0]} 
              />
            </div>
          )}
        </div>

        {/* RETURN */}
        <div ref={returnRef} className={`fsb-field-cell fsb-date-cell ${tripType === "one-way" ? "fsb-return-disabled" : ""}`}
          onClick={() => {
            if (tripType === "one-way") handleTripType("round-trip");
            else setShowReturnCalendar(v => !v);
          }}
        >
          <div className="fsb-field-inner fsb-date-label">
            <div className="fsb-field-label">Return</div>
            {tripType === "round-trip" ? (
              <>
                <div className="fsb-big-city">{returnDate ? formatDate(returnDate) : "Select Date"}</div>
                <div className="fsb-sub-city">Best return matrix</div>
              </>
            ) : (
              <>
                <div className="fsb-add-date">+ Add Date</div>
                <div className="fsb-sub-city">Click to add return</div>
              </>
            )}
          </div>
          {showReturnCalendar && tripType === "round-trip" && (
            <div className="fsb-dropdown fsb-calendar-dropdown">
              <Calendar 
                selectedDate={returnDate} 
                onDateSelect={handleReturnSelect} 
                minDate={departure} 
              />
            </div>
          )}
        </div>

        {/* TRAVELLERS */}
        <div ref={travellerRef} className="fsb-field-cell">
          <div className="fsb-field-inner" onClick={() => setShowTravellerDropdown(v => !v)}>
            <div className="fsb-field-label">Travellers</div>
            <div className="fsb-traveller-count">
              <span className="fsb-big-city">{totalTravellers}</span>
              <span className="fsb-person-label">{totalTravellers === 1 ? "Person" : "Persons"}</span>
            </div>
            <div className="fsb-sub-city">{cabinClass}</div>
          </div>

          {showTravellerDropdown && (
            <div className="fsb-dropdown fsb-traveller-dropdown">
              <div className="fsb-traveller-section">
                {[
                  { key: "adults", label: "Adults", sub: "12+ yrs" },
                  { key: "children", label: "Children", sub: "2-12 yrs" },
                  { key: "infants", label: "Infants", sub: "Below 2 yrs" },
                ].map(({ key, label, sub }) => (
                  <div key={key} className="fsb-traveller-row">
                    <div>
                      <div className="fsb-tr-label">{label}</div>
                      <div className="fsb-tr-sub">{sub}</div>
                    </div>
                    <div className="fsb-counter">
                      <button className="fsb-counter-btn" onClick={() => updateTraveller(key, -1)}>−</button>
                      <span className="fsb-counter-val">{travellers[key]}</span>
                      <button className="fsb-counter-btn" onClick={() => updateTraveller(key, 1)}>+</button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="fsb-class-section">
                <div className="fsb-tr-label fsb-class-title">Cabin Class</div>
                <div className="fsb-class-grid">
                  {["Economy", "Premium Economy", "Business", "First Class"].map(cls => (
                    <button key={cls}
                      className={`fsb-class-btn ${cabinClass === cls ? "fsb-class-active" : ""}`}
                      onClick={() => setCabinClass(cls)}>{cls}</button>
                  ))}
                </div>
              </div>

              <button className="fsb-apply-btn" onClick={() => setShowTravellerDropdown(false)}>Apply</button>
            </div>
          )}
        </div>
      </div>

      {/* FARE TYPE */}
      <div className="fsb-fare-row">
        <span className="fsb-section-label">Fare type</span>
        {FARE_TYPES.map(ft => (
          <button key={ft}
            className={`fsb-fare-btn ${fareType === ft ? "fsb-fare-active" : ""}`}
            onClick={() => setFareType(ft)}>{ft}</button>
        ))}
      </div>

      {/* POPULAR ROUTES + SEARCH BUTTON */}
      <div className="fsb-popular-row">
        <span className="fsb-section-label">Popular</span>
        {POPULAR_ROUTES.map((r, i) => (
          <button key={i} className="fsb-popular-btn"
            onClick={() => {
              const f = CITIES.find(c => c.code === r.from);
              const t = CITIES.find(c => c.code === r.to);
              if (f) setFrom(f);
              if (t) setTo(t);
            }}>
            {r.from} → {r.to}
          </button>
        ))}

        <div className="fbs-searching-btn">
          <Link to="/search-page" className="fsb-search-btn" onClick={handleSearch}>
            <span className="fsb-search-icon">🔍</span>
            Search Flights
          </Link>
        </div>
      </div>
    </div>
  );
}