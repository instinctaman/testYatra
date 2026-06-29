import { useMemo, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import FlightSearchBar from "../NewFiles/FlightSearchBar";
import SeatSelection from "../NewFiles/AeroPage/page/SeatSelection/SeatSelect";
import Auth from "../pages/Auth";
import heroImage from "../assets/images/plane.jpg";
import logo from "../assets/images/logo/logo-white.png";
import Barcode from "react-barcode";
import "./booking.css";

const cities = [
  {
    code: "DEL",
    city: "New Delhi",
    airport: "Indira Gandhi International Airport",
  },
  {
    code: "BOM",
    city: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj International Airport",
  },
  {
    code: "BLR",
    city: "Bengaluru",
    airport: "Kempegowda International Airport",
  },
  {
    code: "HYD",
    city: "Hyderabad",
    airport: "Rajiv Gandhi International Airport",
  },
  { code: "MAA", city: "Chennai", airport: "Chennai International Airport" },
  {
    code: "CCU",
    city: "Kolkata",
    airport: "Netaji Subhas Chandra Bose International Airport",
  },
  { code: "GOI", city: "Goa", airport: "Manohar International Airport" },
  { code: "DXB", city: "Dubai", airport: "Dubai International Airport" },
];

const airlines = {
  IndiGo: { code: "6E", color: "#26378a" },
  "Air India": { code: "AI", color: "#d92d55" },
  "Akasa Air": { code: "QP", color: "#ef6c38" },
  SpiceJet: { code: "SG", color: "#d71920" },
};

const flights = [
  {
    id: 1,
    airline: "IndiGo",
    no: "6E 6114",
    depart: "06:10",
    arrive: "08:20",
    duration: "2h 10m",
    stops: 0,
    price: 4899,
    tag: "Cheapest",
    depTerminal: "T2",
    arrTerminal: "T1",
    seats: 5,
  },
  {
    id: 2,
    airline: "Air India",
    no: "AI 2957",
    depart: "07:45",
    arrive: "09:55",
    duration: "2h 10m",
    stops: 0,
    price: 5340,
    tag: "Best value",
    depTerminal: "T3",
    arrTerminal: "T2",
    seats: 8,
  },
  {
    id: 3,
    airline: "Akasa Air",
    no: "QP 1411",
    depart: "09:20",
    arrive: "11:25",
    duration: "2h 05m",
    stops: 0,
    price: 5180,
    tag: "Fastest",
    depTerminal: "T2",
    arrTerminal: "T1",
    seats: 3,
  },
  {
    id: 4,
    airline: "IndiGo",
    no: "6E 2328",
    depart: "13:05",
    arrive: "15:25",
    duration: "2h 20m",
    stops: 0,
    price: 5799,
    tag: "Popular",
    depTerminal: "T1",
    arrTerminal: "T1",
    seats: 6,
  },
  {
    id: 5,
    airline: "SpiceJet",
    no: "SG 157",
    depart: "17:30",
    arrive: "20:25",
    duration: "2h 55m",
    stops: 1,
    price: 4560,
    tag: "Low fare",
    depTerminal: "T1",
    arrTerminal: "T1",
    seats: 4,
  },
  {
    id: 6,
    airline: "Air India",
    no: "AI 2423",
    depart: "20:10",
    arrive: "22:25",
    duration: "2h 15m",
    stops: 0,
    price: 6210,
    tag: "Free meal",
    depTerminal: "T3",
    arrTerminal: "T2",
    seats: 9,
  },
  {
    id: 7,
    airline: "IndiGo",
    no: "6E 418",
    depart: "11:35",
    arrive: "15:20",
    duration: "3h 45m",
    stops: 2,
    price: 4980,
    tag: "Smart saver",
    depTerminal: "T2",
    arrTerminal: "T1",
    seats: 7,
  },
  {
    id: 8,
    airline: "SpiceJet",
    no: "SG 305",
    depart: "22:15",
    arrive: "07:10",
    duration: "8h 55m",
    stops: 3,
    price: 4420,
    tag: "Multi stop",
    depTerminal: "T1",
    arrTerminal: "T1",
    seats: 11,
  },
];

const fareOptions = [
  {
    id: "value",
    name: "Saver Fare",
    extra: 0,
    desc: "Travel light and save",
    perks: [
      "15 kg check-in baggage",
      "7 kg cabin baggage",
      "Cancellation from ₹3,499",
    ],
  },
  {
    id: "flex",
    name: "Flexi Plus",
    extra: 849,
    desc: "More freedom for changes",
    perks: [
      "20 kg check-in baggage",
      "Free standard seat",
      "Date change from ₹499",
    ],
    recommended: true,
  },
  {
    id: "comfort",
    name: "IndiGo UpFront",
    extra: 1599,
    desc: "A smoother journey",
    perks: [
      "25 kg check-in baggage",
      "Meal and preferred seat",
      "Cancellation from ₹999",
    ],
  },
];

const fareServiceRows = [
  {
    icon: "bi-clock-history",
    label: "Cancellation",
    note: "From departure time",
    values: [
      "0h - 3h: Non Refundable|3h - 3d: INR 4,999|3d - 365d: INR 3,999",
      "0h - 3h: Non Refundable|3h - 24h: INR 3,499|24h - 365d: INR 2,499",
      "0h - 3h: Non Refundable|3h - 24h: INR 1,599|24h - 3d: INR 1,199|3d - 365d: INR 799",
    ],
  },
  {
    icon: "bi-calendar3",
    label: "Date Change",
    note: "From departure time",
    values: [
      "0h - 3h: Non Changeable|3h - 3d: INR 2,999|3d - 365d: INR 2,999",
      "0h - 3h: Non Changeable|3h - 3d: INR 999|3d - 365d: INR 299",
      "0h - 3h: Non Changeable|3h - 3d: INR 299|3d - 365d: Free Date Change",
    ],
  },
  {
    icon: "bi-grid-3x3-gap-fill",
    label: "Seat Selection",
    values: [
      "Standard: Chargeable|XL seats: Chargeable",
      "Standard: FREE|XL seats: Chargeable",
      "Standard: FREE|XL seats: FREE",
    ],
  },
  {
    icon: "bi-suitcase2-fill",
    label: "Checked Bag",
    values: ["15 Kgs", "20 Kgs", "25 Kgs"],
  },
  {
    icon: "bi-backpack2-fill",
    label: "Hand Bag",
    values: ["7 Kgs", "7 Kgs", "7 Kgs"],
  },
  {
    icon: "bi-cup-hot-fill",
    label: "Meal",
    values: ["Chargeable", "Complimentary", "Complimentary"],
  },
];

const money = (value) => `₹${Number(value).toLocaleString("en-IN")}`;
const stopLabel = (stops) => {
  if (stops === 0) return "Non stop";
  if (stops === 1) return "1 stop";
  if (stops === 2) return "2 stops";
  return "Multi stop";
};
const dateLabel = (
  value,
  options = { day: "2-digit", month: "short", year: "numeric" },
) => new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", options);
const offsetDate = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

const defaultSearch = {
  tripType: "oneway",
  from: "DEL",
  to: "BOM",
  departure: offsetDate(14),
  returnDate: offsetDate(20),
  adults: 1,
  cabin: "Economy",
};

function Brand({ light = false }) {
  return (
    <div className={`sb-brand ${light ? "sb-brand-light" : ""}`}>
      <span>
        {/* <i className="bi bi-airplane-fill" /> */}
        <img src={logo} className="logo" alt="" />
      </span>
    </div>
  );
}

function Header({ transparent = false }) {
  const navigate = useNavigate();
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const openAuth = (mode) => {
    setAuthMode(mode);
    setAuthOpen(true);
  };
  return (
    <>
      <header className={`sb-header ${transparent ? "sb-header-hero" : ""}`}>
        <button className="sb-logo-button" onClick={() => navigate("/")}>
          <Brand light={transparent} />
        </button>
        <nav>
          <a href="#offers">Offers</a>
          <a href="#support">Support</a>
          <button className="sb-mytrips">
            <i className="bi bi-suitcase2" /> My Trips
          </button>
          <button className="sb-signup" onClick={() => openAuth("signup")}>
            Sign up
          </button>
          <button className="sb-login" onClick={() => openAuth("login")}>
            <i className="bi bi-person-circle" /> Login
          </button>
        </nav>
      </header>
      <Auth
        key={authMode}
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        showHero={false}
        initialMode={authMode}
      />
    </>
  );
}

function SearchForm({ value, onChange, compact = false, onSubmit }) {
  const update = (key, val) => onChange({ ...value, [key]: val });
  const fromCity = cities.find((city) => city.code === value.from);
  const toCity = cities.find((city) => city.code === value.to);
  const swap = () => onChange({ ...value, from: value.to, to: value.from });
  return (
    <form
      className={`sb-search-card ${compact ? "sb-search-compact" : ""}`}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {!compact && (
        <div className="sb-trip-row">
          <div className="sb-radio-tabs">
            {[
              ["oneway", "One Way"],
              ["round", "Round Trip"],
            ].map(([id, label]) => (
              <label key={id} className={value.tripType === id ? "active" : ""}>
                <input
                  type="radio"
                  checked={value.tripType === id}
                  onChange={() => update("tripType", id)}
                />
                {label}
              </label>
            ))}
          </div>
          <span>Book domestic and international flights</span>
        </div>
      )}
      <div className="sb-search-grid">
        <label className="sb-search-field">
          <small>FROM</small>
          <select
            value={value.from}
            onChange={(e) => update("from", e.target.value)}
          >
            {cities.map((c) => (
              <option key={c.code} value={c.code}>
                {c.city} ({c.code})
              </option>
            ))}
          </select>
          <span>{fromCity?.airport}</span>
        </label>
        <button
          className="sb-swap"
          type="button"
          onClick={swap}
          aria-label="Swap cities"
        >
          <i className="bi bi-arrow-left-right" />
        </button>
        <label className="sb-search-field">
          <small>TO</small>
          <select
            value={value.to}
            onChange={(e) => update("to", e.target.value)}
          >
            {cities.map((c) => (
              <option key={c.code} value={c.code}>
                {c.city} ({c.code})
              </option>
            ))}
          </select>
          <span>{toCity?.airport}</span>
        </label>
        <label className="sb-search-field sb-date">
          <small>DEPARTURE</small>
          <input
            type="date"
            min={offsetDate(0)}
            value={value.departure}
            onChange={(e) => update("departure", e.target.value)}
          />
          <span>{dateLabel(value.departure, { weekday: "long" })}</span>
        </label>
        {value.tripType === "round" && (
          <label className="sb-search-field sb-date">
            <small>RETURN</small>
            <input
              type="date"
              min={value.departure}
              value={value.returnDate}
              onChange={(e) => update("returnDate", e.target.value)}
            />
            <span>{dateLabel(value.returnDate, { weekday: "long" })}</span>
          </label>
        )}
        <label className="sb-search-field">
          <small>TRAVELLERS & CLASS</small>
          <div className="sb-inline-selects">
            <select
              value={value.adults}
              onChange={(e) => update("adults", Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n} Adult{n > 1 ? "s" : ""}
                </option>
              ))}
            </select>
            <select
              value={value.cabin}
              onChange={(e) => update("cabin", e.target.value)}
            >
              <option>Economy</option>
              <option>Premium Economy</option>
              <option>Business</option>
            </select>
          </div>
          <span>
            {value.adults} traveller{value.adults > 1 ? "s" : ""}
          </span>
        </label>
      </div>
      <button className="sb-primary sb-search-button" type="submit">
        <i className="bi bi-search" /> {compact ? "Search" : "Search flights"}
      </button>
    </form>
  );
}

function Home({ search, setSearch }) {
  const navigate = useNavigate();
  const submit = () => navigate("/flights");
  return (
    <div className="sb-page">
      <section
        className="sb-hero"
        style={{
          backgroundImage: `linear-gradient(105deg, rgba(7, 25, 55, .92), rgba(13, 72, 111, .56)), url(${heroImage})`,
        }}
      >
        <Header transparent />
        {/* <div className="sb-hero-copy"><div className="sb-kicker"><i className="bi bi-stars" /> Your next story starts here</div><h1>Go where your heart<br />wants to be.</h1><p>Compare hundreds of flights, unlock transparent fares, and book your journey in minutes.</p></div> */}
        {/* <div className="sb-home-search"><div className="sb-service-tabs"><button className="active"><i className="bi bi-airplane" /> Flights</button><button type="button"><i className="bi bi-building" /> Hotels</button><button type="button"><i className="bi bi-train-front" /> Trains</button><button type="button"><i className="bi bi-bus-front" /> Buses</button><button type="button"><i className="bi bi-umbrella" /> Holidays</button></div><SearchForm value={search} onChange={setSearch} onSubmit={submit} /></div> */}
        <div className="sb-home-search">
          <FlightSearchBar />
        </div>
      </section>
      <section className="sb-section" id="offers">
        <div className="sb-section-title">
          <div>
            <span>LIMITED-TIME SAVINGS</span>
            <h2>Offers you'll love</h2>
          </div>
          <button>
            View all offers <i className="bi bi-arrow-right" />
          </button>
        </div>
        <div className="sb-offer-grid">
          <article className="sb-offer sb-offer-blue">
            <span>DOMESTIC FLIGHTS</span>
            <h3>Up to 15% off</h3>
            <p>
              Use code <b>YatraB2B15</b>
            </p>
            <button onClick={submit}>Book now</button>
          </article>
          <article className="sb-offer sb-offer-orange">
            <span>WEEKEND ESCAPE</span>
            <h3>Goa fares from ₹2,799</h3>
            <p>Sun, sand and savings await.</p>
            <button
              onClick={() => {
                setSearch({ ...search, to: "GOI" });
                submit();
              }}
            >
              Explore Goa
            </button>
          </article>
          <article className="sb-offer sb-offer-dark">
            <span>ZERO CONVENIENCE FEE</span>
            <h3>Pay less with UPI</h3>
            <p>Available on your first booking.</p>
            <button onClick={submit}>Grab the deal</button>
          </article>
        </div>
      </section>
      <section className="sb-confidence" id="support">
        <div>
          <i className="bi bi-shield-check" />
          <span>
            <b>Secure booking</b>
            <small>Your payments are protected</small>
          </span>
        </div>
        <div>
          <i className="bi bi-headset" />
          <span>
            <b>24/7 support</b>
            <small>We're here whenever you need us</small>
          </span>
        </div>
        <div>
          <i className="bi bi-tag" />
          <span>
            <b>Transparent fares</b>
            <small>No surprises at checkout</small>
          </span>
        </div>
        <div>
          <i className="bi bi-lightning-charge" />
          <span>
            <b>Instant confirmation</b>
            <small>Tickets delivered in seconds</small>
          </span>
        </div>
      </section>
      <footer className="sb-footer">
        <Brand light />
        <p>Made for journeys worth remembering.</p>
        <span>© 2026 YatraB2B Travel Technologies</span>
      </footer>
    </div>
  );
}

function FlightLogo({ flight }) {
  const a = airlines[flight.airline];
  return (
    <div className="sb-airline">
      <span style={{ background: a.color }}>{a.code}</span>
      <div>
        <b>{flight.airline}</b>
        <small>{flight.no}</small>
      </div>
    </div>
  );
}

function FareDrawer({
  flight,
  selectedFare,
  setSelectedFare,
  onClose,
  onContinue,
  travellers,
  from,
  to,
}) {
  if (!flight) return null;
  const selectedIndex = fareOptions.findIndex(
    (fare) => fare.id === selectedFare,
  );
  const total = (flight.price + fareOptions[selectedIndex].extra) * travellers;
  return (
    <div className="sb-modal-backdrop" onMouseDown={onClose}>
      <div className="sb-fare-modal" onMouseDown={(e) => e.stopPropagation()}>
        <div className="sb-modal-head">
          <h2>Fare Options</h2>
          <button onClick={onClose} aria-label="Close">
            <i className="bi bi-x-lg" />
          </button>
        </div>
        <div className="sb-fare-flight-strip">
          <b>ONWARD</b>
          <span className="sb-fare-airline-mark">
            {airlines[flight.airline].code}
          </span>
          <strong>
            {flight.no} &nbsp; {from} → {to} &nbsp; {flight.depart} -{" "}
            {flight.arrive}
          </strong>
        </div>
        <div className="sb-fare-scroll">
          <div className="sb-fare-compare">
            <div className="sb-service-title">Services</div>
            {fareOptions.map((fare) => (
              <button
                key={fare.id}
                className={`sb-fare-column-head ${selectedFare === fare.id ? "selected" : ""}`}
                onClick={() => setSelectedFare(fare.id)}
              >
                <i
                  className={`bi ${selectedFare === fare.id ? "bi-record-circle-fill" : "bi-circle"}`}
                />
                <span>
                  <strong>{money(flight.price + fare.extra)}</strong>
                  <small>{fare.name}</small>
                </span>
              </button>
            ))}
            {fareServiceRows.map((row) => (
              <div className="sb-fare-row" key={row.label}>
                <div className="sb-service-label">
                  <i className={`bi ${row.icon}`} />
                  <span>
                    <b>{row.label}</b>
                    {row.note && <small>{row.note}</small>}
                  </span>
                </div>
                {row.values.map((value, index) => (
                  <button
                    key={index}
                    className={`sb-fare-cell ${selectedIndex === index ? "selected" : ""}`}
                    onClick={() => setSelectedFare(fareOptions[index].id)}
                  >
                    {value.split("|").map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </button>
                ))}
              </div>
            ))}
          </div>
          <p className="sb-fare-important">
            <b>Important:</b> Details are based on information provided by the
            airline. Fees apply per traveller and exclude the service fee.
          </p>
        </div>
        <div className="sb-modal-foot">
          <span>
            <b>{money(total)}</b> /{" "}
            {travellers > 1 ? `${travellers} adults` : "adult"}
          </span>
          <button className="sb-primary" onClick={onContinue}>
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

function Results({ search, setSearch, booking, setBooking }) {
  const navigate = useNavigate();
  const [modify, setModify] = useState(false);
  const [sort, setSort] = useState("recommended");
  const [airlineFilter, setAirlineFilter] = useState([]);
  const [stopFilters, setStopFilters] = useState([]);
  const [maxPrice, setMaxPrice] = useState(7000);
  const [activeFlight, setActiveFlight] = useState(null);
  const [fare, setFare] = useState("flex");
  const shown = useMemo(() => {
    let list = flights.filter(
      (f) =>
        f.price <= maxPrice &&
        (!stopFilters.length ||
          stopFilters.some((filter) =>
            filter === "multi" ? f.stops >= 3 : f.stops === Number(filter),
          )) &&
        (!airlineFilter.length || airlineFilter.includes(f.airline)),
    );
    if (sort === "cheapest") list.sort((a, b) => a.price - b.price);
    if (sort === "fastest")
      list.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
    return list;
  }, [sort, airlineFilter, stopFilters, maxPrice]);
  const toggleStop = (stop) =>
    setStopFilters((v) =>
      v.includes(stop) ? v.filter((x) => x !== stop) : [...v, stop],
    );
  const toggleAirline = (a) =>
    setAirlineFilter((v) =>
      v.includes(a) ? v.filter((x) => x !== a) : [...v, a],
    );
  const chooseFare = () => {
    setBooking({
      ...booking,
      flight: activeFlight,
      fare: fareOptions.find((f) => f.id === fare),
    });
    navigate("/review");
  };
  return (
    <div className="sb-app-bg">
      {/* <Header /> */}
      <div className="sb-results-top">
        <div>
          <button onClick={() => navigate("/")}>
            <i className="bi bi-arrow-left" />
          </button>
          <span>
            <b>
              {search.from} <i className="bi bi-arrow-right" /> {search.to}
            </b>
            <small>
              {dateLabel(search.departure)} · {search.adults} Adult
              {search.adults > 1 ? "s" : ""} · {search.cabin}
            </small>
          </span>
        </div>
        <button className="sb-outline" onClick={() => setModify(!modify)}>
          <i className="bi bi-pencil" /> Modify search
        </button>
      </div>
      {modify && (
        <div className="sb-modify-wrap">
          <SearchForm
            value={search}
            onChange={setSearch}
            compact
            onSubmit={() => setModify(false)}
          />
        </div>
      )}
      <main className="sb-results-layout">
        <aside className="sb-filters">
          <div className="sb-filter-head">
            <h3>Filters</h3>
            <button
              onClick={() => {
                setAirlineFilter([]);
                setStopFilters([]);
                setMaxPrice(7000);
              }}
            >
              Clear all
            </button>
          </div>
          <section>
            <h4>Stops</h4>

            <label>
              <input
                type="checkbox"
                checked={stopFilters.includes("0")}
                onChange={() => toggleStop("0")}
              />
              <span>Non stop</span>
              <small>from ₹4,899</small>
            </label>

            {[
              ["1", "1 stop", "from INR 4,560"],
              ["2", "2 stops", "from INR 4,980"],
              ["multi", "Multi stops", "from INR 4,420"],
            ].map(([id, label, price]) => (
              <label key={id}>
                <input
                  type="checkbox"
                  checked={stopFilters.includes(id)}
                  onChange={() => toggleStop(id)}
                />
                <span>{label}</span>
                <small>{price}</small>
              </label>
            ))}
          </section>
          <section>
            <h4>Airlines</h4>
            {Object.keys(airlines).map((a) => (
              <label key={a}>
                <input
                  type="checkbox"
                  checked={airlineFilter.includes(a)}
                  onChange={() => toggleAirline(a)}
                />
                <span>{a}</span>
              </label>
            ))}
          </section>
          <section>
            <h4>Price per adult</h4>
            <input
              className="sb-range"
              type="range"
              min="4500"
              max="7000"
              step="100"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
            <div className="sb-price-range">
              <span>₹4,500</span>
              <b>{money(maxPrice)}</b>
            </div>
          </section>
          <section>
            <h4>Departure time</h4>
            <div className="sb-time-grid">
              {[
                ["sunrise", "Before 6 AM"],
                ["sun", "6 AM–12 PM"],
                ["brightness-high", "12–6 PM"],
                ["moon-stars", "After 6 PM"],
              ].map((x) => (
                <button key={x[1]}>
                  <i className={`bi bi-${x[0]}`} />
                  <small>{x[1]}</small>
                </button>
              ))}
            </div>
          </section>
        </aside>
        <section className="sb-flight-results">
          <div className="sb-result-head">
            <div>
              <h2>
                {shown.length} flights from{" "}
                {cities.find((c) => c.code === search.from)?.city}
              </h2>
              <p>Prices include taxes and fees</p>
            </div>
            <div className="sb-sort">
              Sort by{" "}
              {["recommended", "cheapest", "fastest"].map((s) => (
                <button
                  key={s}
                  className={sort === s ? "active" : ""}
                  onClick={() => setSort(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          {shown.length ? (
            shown.map((f) => (
              <article className="sb-flight-card" key={f.id}>
                <div className="sb-flight-tag">{f.tag}</div>
                <div className="sb-flight-main">
                  <FlightLogo flight={f} />
                  <div className="sb-route-time">
                    <div>
                      <b>{f.depart}</b>
                      <small>
                        {search.from} · {f.depTerminal}
                      </small>
                    </div>
                    <div className="sb-duration">
                      <small>{f.duration}</small>
                      <span>
                        <i className="bi bi-airplane-fill" />
                      </span>
                      <small>{stopLabel(f.stops)}</small>
                    </div>
                    <div>
                      <b>{f.arrive}</b>
                      <small>
                        {search.to} · {f.arrTerminal}
                      </small>
                    </div>
                  </div>
                  <div className="sb-flight-price">
                    <small>per adult</small>
                    <b>{money(f.price)}</b>
                    <span>{f.seats} seats left</span>
                  </div>
                  <button
                    className="sb-primary"
                    onClick={() => setActiveFlight(f)}
                  >
                    View fares
                  </button>
                </div>
                <div className="sb-card-foot">
                  <span>
                    <i className="bi bi-suitcase2" /> 15 kg check-in
                  </span>
                  <span>
                    <i className="bi bi-cup-hot" /> Meal available
                  </span>
                  <button>
                    Flight details <i className="bi bi-chevron-down" />
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="sb-empty">
              <i className="bi bi-search" />
              <h3>No flights match these filters</h3>
              <p>Try raising the price limit or clearing a filter.</p>
            </div>
          )}
        </section>
      </main>
      <FareDrawer
        flight={activeFlight}
        selectedFare={fare}
        setSelectedFare={setFare}
        onClose={() => setActiveFlight(null)}
        onContinue={chooseFare}
        travellers={search.adults}
        from={search.from}
        to={search.to}
      />
    </div>
  );
}

function Stepper({ active }) {
  const steps = [
    "Traveller details",
    "Seat selection",
    "Payment",
    "Confirmation",
  ];
  return (
    <div className="sb-stepper">
      {steps.map((s, i) => (
        <div className={i + 1 <= active ? "active" : ""} key={s}>
          <span>
            {i + 1 < active ? <i className="bi bi-check-lg" /> : i + 1}
          </span>
          <b>{s}</b>
          {i < steps.length - 1 && <em />}
        </div>
      ))}
    </div>
  );
}

function PriceSummary({
  search,
  booking,
  insurance = false,
  promo = false,
  seatCost = 0,
}) {
  const base = (booking.flight.price + booking.fare.extra) * search.adults;
  const taxes = 899 * search.adults;
  const convenience = 349;
  const insuranceCost = insurance ? 249 * search.adults : 0;
  const discount = promo ? 500 : 0;
  const total =
    base + taxes + convenience + insuranceCost + seatCost - discount;
  return (
    <aside className="sb-price-card">
      <h3>Fare summary</h3>
      <div>
        <span>
          Base fare ({search.adults} adult{search.adults > 1 ? "s" : ""})
        </span>
        <b>{money(base)}</b>
      </div>
      <div>
        <span>Taxes & surcharges</span>
        <b>{money(taxes)}</b>
      </div>
      <div>
        <span>Convenience fee</span>
        <b>{money(convenience)}</b>
      </div>
      {insurance && (
        <div>
          <span>Travel insurance</span>
          <b>{money(insuranceCost)}</b>
        </div>
      )}
      {seatCost > 0 && (
        <div>
          <span>Seat selection</span>
          <b>{money(seatCost)}</b>
        </div>
      )}
      {promo && (
        <div className="sb-discount">
          <span>Promo discount</span>
          <b>-{money(discount)}</b>
        </div>
      )}
      <hr />
      <div className="sb-total">
        <span>
          Total amount<small>including all taxes</small>
        </span>
        <b>{money(total)}</b>
      </div>
      <div className="sb-safe">
        <i className="bi bi-shield-lock-fill" />
        <span>
          <b>Safe & secure booking</b>
          <small>256-bit encrypted payments</small>
        </span>
      </div>
    </aside>
  );
}

function ItineraryCard({ search, booking }) {
  const f = booking.flight;
  return (
    <section className="sb-review-card">
      <div className="sb-review-title">
        <div>
          <span>
            {search.from} <i className="bi bi-arrow-right" /> {search.to}
          </span>
          <small>
            {dateLabel(search.departure, {
              weekday: "short",
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}{" "}
            · {stopLabel(f.stops)} · {f.duration}
          </small>
        </div>
        <em>{booking.fare.name} fare</em>
      </div>
      <div className="sb-itinerary">
        <FlightLogo flight={f} />
        <div>
          <b>{f.depart}</b>
          <small>
            {cities.find((c) => c.code === search.from)?.city} · {f.depTerminal}
          </small>
        </div>
        <div className="sb-duration">
          <small>{f.duration}</small>
          <span>
            <i className="bi bi-airplane-fill" />
          </span>
          <small>{stopLabel(f.stops)}</small>
        </div>
        <div>
          <b>{f.arrive}</b>
          <small>
            {cities.find((c) => c.code === search.to)?.city} · {f.arrTerminal}
          </small>
        </div>
      </div>
      <div className="sb-inclusions">
        <span>
          <i className="bi bi-backpack2" /> Cabin 7 kg
        </span>
        <span>
          <i className="bi bi-suitcase2" /> Check-in{" "}
          {booking.fare.id === "value"
            ? 15
            : booking.fare.id === "flex"
              ? 20
              : 25}{" "}
          kg
        </span>
        <span>
          <i className="bi bi-cup-hot" />{" "}
          {booking.fare.id === "comfort" ? "Meal included" : "Meal chargeable"}
        </span>
      </div>
    </section>
  );
}

function Review({
  search,
  booking,
  travellers,
  setTravellers,
  contact,
  setContact,
  insurance,
  setInsurance,
  promo,
  setPromo,
}) {
  const navigate = useNavigate();
  if (!booking.flight) return <Navigate to="/flights" replace />;
  const updateTraveller = (i, key, value) =>
    setTravellers(
      travellers.map((t, idx) => (idx === i ? { ...t, [key]: value } : t)),
    );
  const valid =
    travellers.length === search.adults &&
    travellers.every(
      (t) =>
        t.first.trim() &&
        t.last.trim() &&
        t.gender &&
        t.dateOfBirth &&
        t.nationality,
    ) &&
    /\S+@\S+\.\S+/.test(contact.email) &&
    contact.phone.length >= 10;
  return (
    <div className="sb-app-bg">
      <Header />
      <Stepper active={1} />
      <main className="sb-checkout">
        <div className="sb-checkout-main">
          <h1>Review your trip</h1>
          <p>Almost there—confirm the details below.</p>
          <ItineraryCard search={search} booking={booking} />
          <section className="sb-form-card">
            <div className="sb-form-heading">
              <span>
                <i className="bi bi-people" />
              </span>
              <div>
                <h2>Enter passenger details</h2>
                <p>
                  Enter details exactly as shown on the passenger's government
                  ID.
                </p>
              </div>
            </div>
            {travellers.map((t, i) => (
              <div className="sb-traveller" key={i}>
                <h3>Adult {i + 1}</h3>
                <div className="sb-form-grid sb-passenger-grid">
                  <label>
                    Title
                    <select
                      value={t.gender}
                      onChange={(e) =>
                        updateTraveller(i, "gender", e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      <option>Mr</option>
                      <option>Ms</option>
                      <option>Mrs</option>
                    </select>
                  </label>
                  <label>
                    First name
                    <input
                      value={t.first}
                      onChange={(e) =>
                        updateTraveller(i, "first", e.target.value)
                      }
                      placeholder="As on ID"
                    />
                  </label>
                  <label>
                    Last name
                    <input
                      value={t.last}
                      onChange={(e) =>
                        updateTraveller(i, "last", e.target.value)
                      }
                      placeholder="As on ID"
                    />
                  </label>
                  <label>
                    Date of birth
                    <input
                      type="date"
                      max={offsetDate(0)}
                      value={t.dateOfBirth || ""}
                      onChange={(e) =>
                        updateTraveller(i, "dateOfBirth", e.target.value)
                      }
                    />
                  </label>
                  <label>
                    Nationality
                    <select
                      value={t.nationality || ""}
                      onChange={(e) =>
                        updateTraveller(i, "nationality", e.target.value)
                      }
                    >
                      <option value="">Select nationality</option>
                      <option value="Indian">Indian</option>
                      <option value="Nepalese">Nepalese</option>
                      <option value="Bhutanese">Bhutanese</option>
                      <option value="Other">Other</option>
                    </select>
                  </label>
                </div>
              </div>
            ))}
            <div className="sb-contact">
              <h3>Booking updates will be sent to</h3>
              <div className="sb-form-grid sb-contact-grid">
                <label>
                  Mobile number
                  <div className="sb-phone">
                    <span>+91</span>
                    <input
                      type="tel"
                      maxLength="10"
                      value={contact.phone}
                      onChange={(e) =>
                        setContact({
                          ...contact,
                          phone: e.target.value.replace(/\D/g, ""),
                        })
                      }
                      placeholder="10-digit number"
                    />
                  </div>
                </label>
                <label>
                  Email address
                  <input
                    type="email"
                    value={contact.email}
                    onChange={(e) =>
                      setContact({ ...contact, email: e.target.value })
                    }
                    placeholder="you@example.com"
                  />
                </label>
              </div>
            </div>
          </section>
          <label className={`sb-insurance ${insurance ? "selected" : ""}`}>
            <input
              type="checkbox"
              checked={insurance}
              onChange={(e) => setInsurance(e.target.checked)}
            />
            <i className="bi bi-shield-check" />
            <span>
              <b>Travel worry-free for {money(249 * search.adults)}</b>
              <small>
                Coverage for medical emergencies, trip delays and baggage loss.
              </small>
            </span>
            <em>{insurance ? "Added" : "Add"}</em>
          </label>
        </div>
        <div className="sb-checkout-side">
          <PriceSummary
            search={search}
            booking={booking}
            insurance={insurance}
            promo={promo}
          />
          <div className="sb-promo">
            <b>Have a promo code?</b>
            <div>
              <input placeholder="Try YatraB2B500" />
              <button onClick={() => setPromo(true)}>
                {promo ? "Applied" : "Apply"}
              </button>
            </div>
            {promo && (
              <small>
                <i className="bi bi-check-circle-fill" /> YatraB2B500 applied
              </small>
            )}
          </div>
          <button
            className="sb-primary sb-pay-continue"
            disabled={!valid}
            onClick={() => navigate("/seats")}
          >
            Continue to seat selection <i className="bi bi-arrow-right" />
          </button>
          {!valid && (
            <small className="sb-form-note">
              Complete all traveller and contact details to continue.
            </small>
          )}
        </div>
      </main>
    </div>
  );
}

function Payment({
  search,
  booking,
  insurance,
  promo,
  selectedSeats,
  onConfirm,
}) {
  const navigate = useNavigate();
  const [method, setMethod] = useState("upi");
  const [busy, setBusy] = useState(false);
  const [upi, setUpi] = useState("");
  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });
  if (!booking.flight) return <Navigate to="/flights" replace />;
  const base = (booking.flight.price + booking.fare.extra) * search.adults,
    total =
      base +
      899 * search.adults +
      349 +
      (insurance ? 249 * search.adults : 0) -
      (promo ? 500 : 0) +
      selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  const canPay =
    method === "upi"
      ? upi.includes("@")
      : method === "card"
        ? card.number.replace(/\s/g, "").length === 16 &&
          card.name &&
          card.expiry.length >= 5 &&
          card.cvv.length === 3
        : true;
  const pay = () => {
    setBusy(true);
    setTimeout(() => {
      const confirmed = {
        pnr: `FH${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
        bookingId: `FH-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
        total,
        paidAt: new Date().toISOString(),
      };
      onConfirm(confirmed);
      navigate("/ticket");
    }, 1400);
  };
  return (
    <div className="sb-app-bg">
      <Header />
      <Stepper active={3} />
      <main className="sb-checkout">
        <div className="sb-checkout-main">
          <button className="sb-back-link" onClick={() => navigate("/seats")}>
            <i className="bi bi-arrow-left" /> Back to seat selection
          </button>
          <h1>Choose payment method</h1>
          <p>All transactions are secure and encrypted.</p>
          <section className="sb-payment-card">
            <div className="sb-payment-tabs">
              {[
                ["upi", "bi-phone", "UPI"],
                ["card", "bi-credit-card", "Credit / Debit Card"],
                ["netbanking", "bi-bank", "Net banking"],
              ].map((m) => (
                <button
                  key={m[0]}
                  className={method === m[0] ? "active" : ""}
                  onClick={() => setMethod(m[0])}
                >
                  <i className={`bi ${m[1]}`} />
                  <span>{m[2]}</span>
                </button>
              ))}
            </div>
            <div className="sb-payment-form">
              {method === "upi" && (
                <>
                  <h2>Pay using UPI</h2>
                  <p>Enter your UPI ID to receive a payment request.</p>
                  <label>
                    UPI ID
                    <div className="sb-upi">
                      <input
                        value={upi}
                        onChange={(e) => setUpi(e.target.value)}
                        placeholder="name@bank"
                      />
                      <i className="bi bi-patch-check-fill" />
                    </div>
                  </label>
                  <div className="sb-upi-apps">
                    <span>Or pay with</span>
                    <button>G Pay</button>
                    <button>PhonePe</button>
                    <button>Paytm</button>
                  </div>
                </>
              )}
              {method === "card" && (
                <>
                  <h2>Card details</h2>
                  <div className="sb-card-fields">
                    <label>
                      Card number
                      <input
                        maxLength="19"
                        value={card.number}
                        onChange={(e) =>
                          setCard({
                            ...card,
                            number: e.target.value
                              .replace(/\D/g, "")
                              .replace(/(.{4})/g, "$1 ")
                              .trim(),
                          })
                        }
                        placeholder="1234 5678 9012 3456"
                      />
                    </label>
                    <label>
                      Name on card
                      <input
                        value={card.name}
                        onChange={(e) =>
                          setCard({ ...card, name: e.target.value })
                        }
                        placeholder="Full name"
                      />
                    </label>
                    <div>
                      <label>
                        Expiry
                        <input
                          maxLength="5"
                          value={card.expiry}
                          onChange={(e) =>
                            setCard({ ...card, expiry: e.target.value })
                          }
                          placeholder="MM/YY"
                        />
                      </label>
                      <label>
                        CVV
                        <input
                          type="password"
                          maxLength="3"
                          value={card.cvv}
                          onChange={(e) =>
                            setCard({
                              ...card,
                              cvv: e.target.value.replace(/\D/g, ""),
                            })
                          }
                          placeholder="•••"
                        />
                      </label>
                    </div>
                  </div>
                </>
              )}
              {method === "netbanking" && (
                <>
                  <h2>Select your bank</h2>
                  <div className="sb-banks">
                    {[
                      "HDFC Bank",
                      "ICICI Bank",
                      "State Bank of India",
                      "Axis Bank",
                    ].map((b) => (
                      <label key={b}>
                        <input
                          type="radio"
                          name="bank"
                          defaultChecked={b === "HDFC Bank"}
                        />
                        <span>{b}</span>
                      </label>
                    ))}
                  </div>
                </>
              )}
              <div className="sb-payment-security">
                <i className="bi bi-lock-fill" /> Your payment information is
                never stored on our servers.
              </div>
            </div>
          </section>
        </div>
        <div className="sb-checkout-side">
          <PriceSummary
            search={search}
            booking={booking}
            insurance={insurance}
            promo={promo}
            seatCost={selectedSeats.reduce((sum, seat) => sum + seat.price, 0)}
          />
          <button
            className="sb-primary sb-pay-continue"
            disabled={!canPay || busy}
            onClick={pay}
          >
            {busy ? (
              <>
                <span className="sb-spinner" /> Processing payment...
              </>
            ) : (
              <>
                Pay {money(total)} securely <i className="bi bi-lock-fill" />
              </>
            )}
          </button>
          <div className="sb-accepted">
            <span>We accept</span>
            <b>VISA</b>
            <b>RuPay</b>
            <b>UPI</b>
          </div>
        </div>
      </main>
    </div>
  );
}

function Ticket({
  search,
  booking,
  travellers,
  contact,
  confirmation,
  selectedSeats,
}) {
  const navigate = useNavigate();
  if (!booking.flight || !confirmation) return <Navigate to="/" replace />;

  const f = booking.flight;
  const pnrNumber = confirmation.pnr || "MCPIMQ";

  // Date format utility function for cleaner rendering
  const formatDateStr = (dateVal) => {
    if (!dateVal) return "29 Jun 2026";
    return new Date(dateVal).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="sb-ticket-page">
      {/* Screen Controls: Web view buttons (Printing ke time auto-hide honge) */}
      <div
        className="sb-no-print"
        style={{
          textAlign: "center",
          padding: "20px 0",
          background: "#f4f7fa",
          borderBottom: "1px solid #dfe7ef",
        }}
      >
        <h2 style={{ margin: "0 0 10px 0", color: "#102a43" }}>
          🎉 Booking Successfully Completed!
        </h2>
        <button
          className="sb-primary"
          onClick={() => window.print()}
          style={{ padding: "12px 24px", fontSize: "14px", fontWeight: "600" }}
        >
          <i className="bi bi-printer" /> Print Ticket / Save PDF
        </button>
        <button
          className="sb-outline"
          onClick={() => navigate("/")}
          style={{ marginLeft: "10px", padding: "12px 24px", fontSize: "14px" }}
        >
          <i className="bi bi-house" /> Back to Home
        </button>
      </div>

      {/* Main Print Area: Matches Itinerary PDF structure exactly */}
      <main className="printable-ticket">
        {/* Top Header Block */}
        <div className="ticket-header-strip">
          <div className="airline-title">{f.airline || "IndiGo"}</div>
          <div className="pnr-box">
            <div>
              PNR/Booking Ref: <b>{pnrNumber}</b>
            </div>
            <div className="status-badge">On-Hold</div>
          </div>
        </div>

        <hr className="ticket-divider" />

        {/* Passenger Info Row */}
        <div className="ticket-section">
          <h3>Passenger Information</h3>
          <div className="passenger-row">
            <div>
              <strong>
                {travellers && travellers.length > 0
                  ? `${travellers[0].title || "MR"} ${travellers[0].first || "Som"} ${travellers[0].last || "shekhar"}`
                  : "MR Som shekhar"}
              </strong>
              <span
                style={{
                  marginLeft: "10px",
                  color: "#65778a",
                  fontSize: "13px",
                }}
              >
                (Adult)
              </span>
            </div>
            <div style={{ fontSize: "13px", color: "#152536" }}>
              <span>{contact.phone || "9870451929"}</span> |{" "}
              <span>{contact.email || "Flight@yatrab2b.com"}</span>
            </div>
          </div>
        </div>

        <hr className="ticket-divider" />

        {/* Matrix Block: Sector, Seat & Add-ons */}
        <div className="journey-matrix">
          <div className="matrix-col">
            <small>Sector</small>
            <b>
              {search.from || f.from || "DEL"}-{search.to || f.to || "CCU"}
            </b>
          </div>
          <div className="matrix-col">
            <small>Seat</small>
            <b>
              {selectedSeats && selectedSeats.length > 0
                ? selectedSeats.join(", ")
                : "9A (Window)"}
            </b>
          </div>
          <div className="matrix-col">
            <small>6E Add-ons</small>
            <b>CPTR, CPML</b>
          </div>
        </div>

        <hr className="ticket-divider" />

        {/* Flight Time & Route Details Container */}
        <div className="flight-schedule-box">
          <div className="schedule-row">
            <div>
              <span className="flight-badge">
                {f.code || "6E 5096"} • {f.model || "A320"}
              </span>
              <small className="close-time">
                ⚠️ Check-in/Bag drop closes: 16:00 hrs
              </small>
            </div>
            <div style={{ fontSize: "12px", color: "#65778a" }}>
              *Date of booking: {formatDateStr(new Date())}
            </div>
          </div>

          <div className="route-details-grid">
            <div className="route-point">
              <h4>Departing</h4>
              <b>{search.fromCity || f.fromCity || "Ghaziabad"}</b>
              <p>{f.fromAirport || "HDO-Ghaziabad Airport"}</p>
              <span className="time-stamp">
                {f.depart || "17:00"}, {formatDateStr(search.departure)}
              </span>
            </div>

            <div className="duration-center">
              <span>Travel time {f.duration || "2 Hour 5 min"}</span>
            </div>

            <div className="route-point" style={{ textAlign: "right" }}>
              <h4>Arriving</h4>
              <b>{search.toCity || f.toCity || "Navi Mumbai"}</b>
              <p>{f.toAirport || "NMI-Navi Mumbai Airport"}</p>
              <span className="time-stamp">
                {f.arrive || "19:05"}, {formatDateStr(search.departure)}
              </span>
            </div>
          </div>
        </div>

        <hr className="ticket-divider" />

        {/* Payment & Meta footer status */}
        <div
          className="meta-footer-info"
          style={{
            display: "flex",
            justifyContent: "between",
            alignItems: "center",
          }}
        >
          <div style={{ flex: "1" }}>
            <div>
              Payment status: <b className="pending-text">Pending</b>
            </div>
            <p className="utc-note">
              *Booking date reflects in UTC (Coordinated Universal Time), all
              other timings mentioned are as per local TIME
            </p>
          </div>

          {/* Dynamic Render CSS Barcode matching PNR */}
          <Barcode
            value={pnrNumber}
            format="CODE128"
            width={1.5}
            height={45}
            displayValue={true}
            fontSize={12}
            margin={0}
          />
        </div>

        <hr className="ticket-divider" />

        {/* Baggage Information Table Section */}
        <div className="ticket-section">
          <h3>Baggage Information</h3>
          <table className="baggage-table">
            <thead>
              <tr>
                <th style={{ width: "8%" }}>S.No</th>
                <th style={{ width: "25%" }}>Sector</th>
                <th>Passenger Baggage Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ textAlign: "center" }}>1</td>
                <td>
                  {search.from || f.from || "DEL"} -{" "}
                  {search.to || f.to || "CCU"}
                </td>
                <td>
                  Check-in: 15KG (1 piece only) | Cabin: Up to 7KG (1 piece
                  allowed)
                </td>
              </tr>
            </tbody>
          </table>
          <p className="baggage-note">
            <strong>Hand Baggage Note:</strong> One hand bag up to 7 KG and 115
            CM (L+W+H) max dimensions shall be allowed per customer. For a
            contactless safe travel experience, we recommend to safely place it
            under the seat in front of you on board.
          </p>
        </div>

        <hr className="ticket-divider" />

        {/* Terms, Conditions and Legal Notes */}
        <div className="ticket-section legal-notes">
          <h3>Note & Terms</h3>
          <ol>
            <li>
              Goods and Services Tax (GST) shall be levied at applicable rates
              on all air transportation services provided by IndiGo, except in
              cases specifically exempted under law.
            </li>
            <li>
              This is not a GST invoice. For GST details, please refer to the
              final GST invoice which shall be sent to your registered email
              address automatically.
            </li>
            <li>
              Additionally, passengers may download the dynamic GST invoice copy
              using their valid PNR reference number on the official website
              www.goindigo.in.
            </li>
            <li>
              Airfare Charges include Base Fare, Fuel Surcharge, Aviation
              Security Fee, and User Development Fees wherever applicable.
            </li>
          </ol>
        </div>
      </main>
    </div>
  );
}

function SeatPage({ search, booking, travellers, contact, promo, onSeats }) {
  const navigate = useNavigate();
  if (!booking.flight) return <Navigate to="/flights" replace />;
  return (
    <div className="sb-app-bg">
      <Header />
      <Stepper active={2} />
      <SeatSelection
        search={search}
        booking={booking}
        contact={contact}
        promo={promo}
        travellerData={travellers}
        onBack={() => navigate("/review")}
        onContinue={(seats) => {
          onSeats(seats);
          navigate("/payment");
        }}
      />
    </div>
  );
}

export default function BookingApp() {
  const [search, setSearch] = useState(defaultSearch);
  const [booking, setBooking] = useState({ flight: null, fare: null });
  const [travellers, setTravellers] = useState([
    { gender: "", first: "", last: "", dateOfBirth: "", nationality: "" },
  ]);
  const [contact, setContact] = useState({ phone: "", email: "" });
  const [insurance, setInsurance] = useState(true);
  const [promo, setPromo] = useState(false);
  const [confirmation, setConfirmation] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const location = useLocation();
  const updateSearch = (next) => {
    setSearch(next);
    setTravellers((current) =>
      Array.from(
        { length: next.adults },
        (_, i) =>
          current[i] || {
            gender: "",
            first: "",
            last: "",
            dateOfBirth: "",
            nationality: "",
          },
      ),
    );
  };
  const confirm = (data) => {
    setConfirmation(data);
    localStorage.setItem(
      "YatraB2B-last-booking",
      JSON.stringify({
        ...data,
        search,
        booking,
        travellers,
        contact,
        selectedSeats,
      }),
    );
  };
  return (
    <Routes location={location}>
      <Route
        path="/"
        element={<Home search={search} setSearch={updateSearch} />}
      />
      <Route
        path="/flights"
        element={
          <Results
            search={search}
            setSearch={updateSearch}
            booking={booking}
            setBooking={setBooking}
          />
        }
      />
      <Route
        path="/review"
        element={
          <Review
            search={search}
            booking={booking}
            travellers={travellers}
            setTravellers={setTravellers}
            contact={contact}
            setContact={setContact}
            insurance={insurance}
            setInsurance={setInsurance}
            promo={promo}
            setPromo={setPromo}
          />
        }
      />
      <Route
        path="/seats"
        element={
          <SeatPage
            search={search}
            booking={booking}
            travellers={travellers}
            contact={contact}
            promo={promo}
            onSeats={setSelectedSeats}
          />
        }
      />
      <Route
        path="/payment"
        element={
          <Payment
            search={search}
            booking={booking}
            insurance={insurance}
            promo={promo}
            selectedSeats={selectedSeats}
            onConfirm={confirm}
          />
        }
      />
      <Route
        path="/ticket"
        element={
          <Ticket
            search={search}
            booking={booking}
            travellers={travellers}
            contact={contact}
            confirmation={confirmation}
            selectedSeats={selectedSeats}
          />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
