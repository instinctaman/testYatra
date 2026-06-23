import { useState } from "react";
import "../index.css";
import "../assets/css/test.css";
import heroImage2 from "../assets/images/img2.jpg";
import { NavLink } from "react-router-dom";
// import AirSearchUI from "./AirSearchUI";

function Landing({ onLoginClick }) {
  const [active, setActive] = useState("Flights");
  const [tripType, setTripType] = useState("One Way");
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    departure: "",
    returnDate: "",
    travellers: 1,
  });

  const popularRoutes = [
    ["Delhi", "Mumbai"],
    ["Delhi", "Goa"],
    ["Bengaluru", "Dubai"],
  ];

  const services = [
    { name: "Flights", icon: "bi-airplane-fill" },
    { name: "Hotels", icon: "bi-building" },
    { name: "Trains", icon: "bi-train-front" },
    { name: "Buses", icon: "bi-bus-front" },
    { name: "Packages", icon: "bi-suitcase-lg" },
    { name: "Cabs", icon: "bi-taxi-front" },
  ];

  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  const swapLocations = () => {
    setSearchData({
      ...searchData,
      from: searchData.to,
      to: searchData.from,
    });
  };

  const handleSearch = () => {
    if (!searchData.from.trim()) {
      alert("Please enter departure city");
      return;
    }

    if (!searchData.to.trim()) {
      alert("Please enter destination city");
      return;
    }

    if (!searchData.departure) {
      alert("Please select departure date");
      return;
    }

    console.log({
      service: active,
      tripType,
      ...searchData,
    });
  };

  return (
    <main className="mmt-home landing-upgrade">
      <section
        className="landing-hero"
        style={{
          backgroundImage: `linear-gradient(115deg, rgba(8, 20, 45, 0.82), rgba(9, 56, 95, 0.46)), url(${heroImage2})`,
        }}
      >
        <div className="landing-hero-inner">
          <div className="landing-hero-copy">
            <span className="landing-kicker">Yatra B2B travel desk</span>
            <h1 className="text-white">Book smarter trips for every route, team, and budget.</h1>
            <p>
              Search flights, hotels, trains, cabs, and packages from one clean
              workspace built for faster travel planning.
            </p>
            <div className="landing-hero-actions">
              <button className="btn landing-primary-btn" onClick={handleSearch}>
                <i className="bi bi-search"></i>
                Start search
              </button>
              <button className="btn landing-ghost-btn" onClick={onLoginClick}>
                <i className="bi bi-person-circle"></i>
                Login to dashboard
              </button>
            </div>
          </div>

          <div className="landing-stats" aria-label="Travel highlights">
            <article>
              <strong>24/7</strong>
              <span>Booking support</span>
            </article>
            <article>
              <strong>450+</strong>
              <span>Partner routes</span>
            </article>
            <article>
              <strong>12%</strong>
              <span>Flight savings</span>
            </article>
          </div>
        </div>
      </section>

      <section className="landing-search-panel" aria-label="Search travel">
        <div className="landing-service-tabs">
          {services.map((item) => (
            <button
              key={item.name}
              className={active === item.name ? "active" : ""}
              onClick={() => setActive(item.name)}
              type="button"
            >
              <i className={`bi ${item.icon}`}></i>
              <span>{item.name}</span>
            </button>
          ))}
        </div>

        <div className="landing-trip-types">
          {["One Way", "Round Trip", "Multi City"].map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="tripType"
                checked={tripType === type}
                onChange={() => setTripType(type)}
              />
              {type}
            </label>
          ))}
        </div>

        <div className="landing-search-grid">
          <label>
            <span>From</span>
            <input
              type="text"
              name="from"
              value={searchData.from}
              onChange={handleChange}
              placeholder="Delhi"
            />
          </label>

          <button
            type="button"
            className="landing-swap-btn"
            onClick={swapLocations}
            aria-label="Swap locations"
          >
            <i className="bi bi-arrow-left-right"></i>
          </button>

          <label>
            <span>To</span>
            <input
              type="text"
              name="to"
              value={searchData.to}
              onChange={handleChange}
              placeholder="Mumbai"
            />
          </label>

          <label>
            <span>Departure</span>
            <input
              type="date"
              name="departure"
              value={searchData.departure}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
            />
          </label>

          {tripType === "Round Trip" && (
            <label>
              <span>Return</span>
              <input
                type="date"
                name="returnDate"
                value={searchData.returnDate}
                onChange={handleChange}
                min={searchData.departure}
              />
            </label>
          )}

          <label>
            <span>Travellers</span>
            <select
              name="travellers"
              value={searchData.travellers}
              onChange={handleChange}
            >
              <option value="1">1 Traveller</option>
              <option value="2">2 Travellers</option>
              <option value="3">3 Travellers</option>
              <option value="4">4 Travellers</option>
            </select>
          </label>

          {/* <button
            type="button"
            className="landing-search-btn"
            onClick={handleSearch}
          >
            Search
          </button> */}
          <span className="landing-search-btn">
          <NavLink className="btn landing-primary-btn" to="/air-search-ui">
            Search
          </NavLink></span>
        </div>

        <div className="landing-popular-routes">
          <span>Popular routes</span>
          {popularRoutes.map(([from, to]) => (
            <button
              key={`${from}-${to}`}
              type="button"
              onClick={() => setSearchData({ ...searchData, from, to })}
            >
              {from} to {to}
            </button>
          ))}
        </div>
      </section>

      <section className="landing-offers">
        <div className="landing-section-heading">
          <span>Fresh deals</span>
          <h2>Offers for your next booking</h2>
        </div>

        <div className="landing-offer-grid">
          <article>
            <span>Flights</span>
            <h3>Flat 12% off on domestic routes</h3>
            <p>Save more on Delhi, Mumbai, Bengaluru, Goa and more.</p>
            <button type="button">Book Now</button>
          </article>

          <article>
            <span>Hotels</span>
            <h3>Weekend stays from INR 1499</h3>
            <p>Book verified stays with breakfast and flexible check-in.</p>
            <button type="button">Book Now</button>
          </article>

          <article>
            <span>Holiday</span>
            <h3>Curated beach escapes</h3>
            <p>Bundle flights and hotels for Goa, Kerala and Andaman.</p>
            <button type="button">Book Now</button>
          </article>
        </div>
      </section>

      <section className="landing-benefits">
        <article>
          <i className="bi bi-shield-check"></i>
          <div>
            <h3>Verified partners</h3>
            <p>Work with reliable travel inventory and clear booking details.</p>
          </div>
        </article>
        <article>
          <i className="bi bi-clock-history"></i>
          <div>
            <h3>Fast rebooking</h3>
            <p>Keep frequent routes ready for repeat business travel.</p>
          </div>
        </article>
        <article>
          <i className="bi bi-wallet2"></i>
          <div>
            <h3>Budget friendly</h3>
            <p>Compare trip options before locking in your itinerary.</p>
          </div>
        </article>
      </section>
    </main>
  );
}

export default Landing;
