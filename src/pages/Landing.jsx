import { useMemo, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

import "../assets/ui/assets/css/iconsax.css";
import "../assets/ui/assets/plugins/fontawesome/css/all.min.css";

import "../assets/css/test.css";
import "../assets/ui/assets/css/style.css";

import heroBg from "../assets/ui/assets/img/bg/breadcrumb-04.jpg";
// import brandLogo from "../assets/ui/assets/img/logo-dark.svg";
import flightImage from "../assets/ui/assets/img/menu/flight.jpg";
import hotelImage from "../assets/ui/assets/img/menu/hotel.jpg";
import tourImage from "../assets/ui/assets/img/menu/tour.jpg";
import cruiseImage from "../assets/ui/assets/img/menu/cruise.jpg";
// import homeOneImage from "../assets/ui/assets/img/menu/aeroplane.jfif";
import homeSevenImage from "../assets/ui/assets/img/menu/home-07.jpg";
import homeTwelveImage from "../assets/ui/assets/img/menu/home-12.jpg";
import userFourteen from "../assets/ui/assets/img/users/user-14.jpg";
import userFifteen from "../assets/ui/assets/img/users/user-15.jpg";
import userSixteen from "../assets/ui/assets/img/users/user-16.jpg";
import FilterPanel from "../NewFiles/FilterPanel";
import CategoryCards from "../cards/CategoryCards";

import vistara from "../assets/images/vistara.jfif";
import indigo from "../assets/images/indigo.jfif";
import airIndia from "../assets/images/airIndia.jfif";
import FlightSearchBar from "../NewFiles/FlightSearchBar";

const airports = [
  {
    code: "DEL",
    city: "New Delhi",
    airport: "Indira Gandhi International",
    country: "India",
  },
  {
    code: "BOM",
    city: "Mumbai",
    airport: "Chhatrapati Shivaji Maharaj",
    country: "India",
  },
  {
    code: "BLR",
    city: "Bengaluru",
    airport: "Kempegowda International",
    country: "India",
  },
  {
    code: "DXB",
    city: "Dubai",
    airport: "Dubai International",
    country: "United Arab Emirates",
  },
  {
    code: "SIN",
    city: "Singapore",
    airport: "Changi Airport",
    country: "Singapore",
  },
];

const services = [
  {
    title: "Flights",
    count: "420 routes",
    icon: "isax-airplane",
    image: flightImage,
    active: true,
  },
  {
    title: "Hotels",
    count: "18k stays",
    icon: "isax-building-3",
    image: hotelImage,
  },
  {
    title: "Packages",
    count: "95 tours",
    icon: "isax-map",
    image: tourImage,
  },
  {
    title: "Cruises",
    count: "36 sailings",
    icon: "isax-ship",
    image: cruiseImage,
  },
];

const routeChips = [
  ["DEL", "BOM"],
  ["BLR", "DXB"],
  ["BOM", "SIN"],
  ["DEL", "GOI"],
];

const fareTypes = ["Regular", "Student", "Senior Citizen", "Corporate"];

const sampleFlights = [
  {
    id: "vistara-214",
    airline: "Vistara",
    code: "UK 214",
    mark: vistara,
    from: "DEL",
    to: "BOM",
    depart: "06:30",
    arrive: "08:45",
    duration: "2h 15m",
    stops: "Non-stop",
    price: "INR 5,680",
    baggage: "15 kg",
    refund: "Free meal",
    badge: "Best value",
    accent: "bg-success",
    // image: homeOneImage,
    avatar: userFourteen,
  },
  {
    id: "indigo-821",
    airline: "IndiGo",
    code: "6E 821",
    mark: indigo,
    from: "DEL",
    to: "BOM",
    depart: "09:10",
    arrive: "11:30",
    duration: "2h 20m",
    stops: "Non-stop",
    price: "INR 6,240",
    baggage: "15 kg",
    refund: "Flex fare",
    badge: "Fastest",
    accent: "bg-info",
    // image: homeOneImage,
    avatar: userFifteen,
  },
  {
    id: "airindia-907",
    airline: "Air India",
    code: "AI 907",
    mark: airIndia,
    from: "DEL",
    to: "BOM",
    depart: "13:40",
    arrive: "16:05",
    duration: "2h 25m",
    stops: "Non-stop",
    price: "INR 7,050",
    baggage: "25 kg",
    refund: "Priority bag",
    badge: "Premium",
    accent: "bg-primary",
    // image: homeOneImage,
    avatar: userSixteen,
  },
];

const filterGroups = [
  {
    id: "stops",
    title: "Stops",
    icon: "isax-routing-2",
    items: ["Non-stop", "1 Stop", "2+ Stops"],
  },
  {
    id: "airlines",
    title: "Airlines",
    icon: "isax-airplane-square",
    items: ["Vistara", "IndiGo", "Air India", "Akasa Air"],
  },
  {
    id: "time",
    title: "Departure Time",
    icon: "isax-clock",
    items: ["Before 8 AM", "8 AM - 12 PM", "12 PM - 6 PM", "After 6 PM"],
  },
];

function AirportDropdown({ id, label, airport, onSelect }) {
  return (
    <div className="form-item dropdown airkit-location-field">
      <button
        type="button"
        className="airkit-field-trigger"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
        aria-label={`Choose ${label}`}
      >
        <span className="form-label fs-14 text-default mb-1">{label}</span>
        <strong>{airport.city}</strong>
        <small>
          {airport.code}, {airport.country}
        </small>
      </button>
      <div className="dropdown-menu dropdown-md p-0">
        <div className="input-search p-3 border-bottom">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder={`Search ${label.toLowerCase()} city`}
              aria-label={`Search ${label.toLowerCase()} city`}
            />
            <span className="input-group-text px-2 border-start-0">
              <i className="isax isax-search-normal" aria-hidden="true"></i>
            </span>
          </div>
        </div>
        <ul className="airkit-airport-list">
          {airports.map((item) => (
            <li className="border-bottom" key={`${id}-${item.code}`}>
              <button
                type="button"
                className="dropdown-item"
                onClick={() => onSelect(item)}
              >
                <span className="airkit-airport-code">{item.code}</span>
                <span>
                  <strong>{item.city}</strong>
                  <small>{item.airport}</small>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TravelersDropdown({ travelers, onChange, cabin, onCabinChange }) {
  const total = travelers.adults + travelers.children + travelers.infants;

  const update = (key, delta) => {
    onChange((current) => ({
      ...current,
      [key]: Math.max(key === "adults" ? 1 : 0, current[key] + delta),
    }));
  };

  return (
    <div className="form-item dropdown">
      <button
        type="button"
        className="airkit-field-trigger"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-expanded="false"
        aria-label="Choose travelers and cabin"
      >
        <span className="form-label fs-14 text-default mb-1">Travellers</span>
        <strong>
          {total} <span>Person{total > 1 ? "s" : ""}</span>
        </strong>
        <small>{cabin}</small>
      </button>
      <div className="dropdown-menu dropdown-menu-end dropdown-xl">
        <h5 className="mb-3">Travelers and cabin</h5>
        <div className="mb-3 border br-10 info-item pb-1">
          {[
            ["adults", "Adults", "12+ years"],
            ["children", "Children", "2-12 years"],
            ["infants", "Infants", "Under 2 years"],
          ].map(([key, title, note]) => (
            <div
              className="mb-3 d-flex align-items-center justify-content-between"
              key={key}
            >
              <label className="form-label text-gray-9 mb-0">
                {title}
                <span className="text-default fw-normal d-block">{note}</span>
              </label>
              <div className="custom-increment">
                <div className="input-group">
                  <span className="input-group-btn float-start">
                    <button
                      type="button"
                      className="quantity-left-minus btn btn-light btn-number"
                      onClick={() => update(key, -1)}
                      aria-label={`Decrease ${title}`}
                    >
                      <i className="isax isax-minus" aria-hidden="true"></i>
                    </button>
                  </span>
                  <input
                    type="text"
                    className="input-number"
                    value={travelers[key]}
                    readOnly
                    aria-label={title}
                  />
                  <span className="input-group-btn float-end">
                    <button
                      type="button"
                      className="quantity-right-plus btn btn-light btn-number"
                      onClick={() => update(key, 1)}
                      aria-label={`Increase ${title}`}
                    >
                      <i className="isax isax-add" aria-hidden="true"></i>
                    </button>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mb-3 border br-10 info-item pb-1">
          <h6 className="fs-16 fw-medium mb-2">Cabin class</h6>
          <div className="d-flex align-items-center flex-wrap">
            {["Economy", "Premium Economy", "Business", "First"].map((item) => (
              <div className="form-check me-3 mb-3" key={item}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="airkitCabin"
                  id={`airkit-${item.replace(/\s+/g, "-").toLowerCase()}`}
                  checked={cabin === item}
                  onChange={() => onCabinChange(item)}
                />
                <label
                  className="form-check-label"
                  htmlFor={`airkit-${item.replace(/\s+/g, "-").toLowerCase()}`}
                >
                  {item}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-primary btn-sm">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

function FlightCard({ flight, selected, onSelect }) {
  return (
    <article className={`airkit-flight-card ${selected ? "selected" : ""}`}>
      <div className="airkit-flight-body">
        <div className="airkit-flight-top">
          <div className="d-flex align-items-center justify-content-between gap-3">
            <div>
              <img src={flight.mark} alt="" className="airkit-airline-mark" />
              <h5>{flight.airline}</h5>
              <p className="mb-0">
                {flight.origin} → {flight.destination}
              </p>
            </div>

            <div className="airkit-route-line">
              <div>
                <strong> {flight.departure}</strong>
                <span>{flight.from}</span>
              </div>
              <div className=" flight-loc d-flex align-items-center justify-content-center">
                <span className="loc-name">{flight.duration}</span>
                <span className="arrow-icon">
                  <i className="isax isax-arrow-right-1" aria-hidden="true"></i>
                </span>
                <span className="loc-name">Stops: {flight.stops}</span>
              </div>
              <div>
                <strong>{flight.arrival}</strong>
                <span>{flight.to}</span>
              </div>
            </div>
            <div className="airkit-flight-footer">
              <div className="airkit-price">
                <strong>₹ {flight.price}</strong>
                <small>per traveller</small>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onSelect(flight.result_index)}
              >
                {selected ? "Selected" : "Book Now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fromAirport, setFromAirport] = useState(airports[0]);
  const [toAirport, setToAirport] = useState(airports[1]);
  const [tripType, setTripType] = useState("Round Trip");
  const [departureDate, setDepartureDate] = useState("2026-07-12");
  const [returnDate, setReturnDate] = useState("2026-07-18");
  const [travelers, setTravelers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [cabin, setCabin] = useState("Economy");
  const [activeFare, setActiveFare] = useState("Regular");
  const [selectedFlight, setSelectedFlight] = useState(null);

  const totalTravelers =
    travelers.adults + travelers.children + travelers.infants;
  const selectedFlightData = useMemo(() => {
    if (!flights.length) return null;

    return (
      flights.find((flight) => flight.result_index === selectedFlight) ||
      flights[0]
    );
  }, [flights, selectedFlight]);

  const swapAirports = () => {
    setFromAirport(toAirport);
    setToAirport(fromAirport);
  };

  const setRoute = (fromCode, toCode) => {
    const nextFrom = airports.find((airport) => airport.code === fromCode);
    const nextTo =
      airports.find((airport) => airport.code === toCode) ??
      airports.find((airport) => airport.code === "BOM");

    if (nextFrom) {
      setFromAirport(nextFrom);
    }

    if (nextTo) {
      setToAirport(nextTo);
    }
  };
  const searchFlights = () => {
    navigate("/air-search-ui", {
      state: {
        origin: fromAirport.code,
        destination: toAirport.code,
        departureDate,
        returnDate,
        adults: travelers.adults,
        children: travelers.children,
        infants: travelers.infants,
        cabin,
        tripType,
      },
    });
  };

  return (
    <main className="airkit-page">
      <section
        className="airkit-hero1"
        style={{
          backgroundImage: `linear-gradient(115deg, rgba(7, 21, 45, 0.86), rgba(8, 79, 111, 0.54)), url(${heroBg})`,
        }}
      >
        <section className="airkit-search-wrap">
          <div className="container">
            <div className="d-flex justify-content-between">
              <nav aria-label="breadcrumb" className="mb-3">
                <ol className="breadcrumb airkit-breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <a href="/">
                      <i className="isax isax-home5" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li className="breadcrumb-item">Home</li>
                </ol>
              </nav>
              <span className="badge bg-warning text-gray-9 mb-3">
                B2B Home
              </span>
            </div>
            {/* <div className="card airkit-search-card">
              <div className="card-body">
                <div className="banner-form">
                  <ul
                    className="nav mb-3 justify-content-center"
                    aria-label="Travel services"
                  >
                    {services.map((item) => (
                      <li key={item.title}>
                        <button
                          type="button"
                          className={`nav-link ${item.active ? "active" : ""}`}
                        >
                          <i
                            className={`isax ${item.icon} me-2`}
                            aria-hidden="true"
                          ></i>
                          {item.title}
                        </button>
                      </li>
                    ))}
                  </ul>

                  <form
                    className="airkit-form"
                    onSubmit={(event) => event.preventDefault()}
                  >
                    <div className="airkit-trip-tabs">
                      {["One Way", "Round Trip", "Multi City"].map((type) => (
                        <label
                          key={type}
                          className={tripType === type ? "active" : ""}
                        >
                          <input
                            type="radio"
                            name="tripType"
                            checked={tripType === type}
                            onChange={() => setTripType(type)}
                          />
                          {type}
                        </label>
                      ))}

                      <div className="ms-auto">
                        <button
                          type="button"
                          className="btn btn-primary s-btn rounded m-3"
                          onClick={searchFlights}
                          disabled={loading}
                        >
                          <i
                            className="isax isax-search-normal me-2"
                            aria-hidden="true"
                          ></i>
                          {loading ? "Searching..." : "Search"}
                        </button>
                      </div>
                    </div>

                    <div className="d-lg-flex align-items-stretch">
                      <div className="d-flex form-info">
                        <AirportDropdown
                          id="from"
                          label="From"
                          airport={fromAirport}
                          onSelect={setFromAirport}
                        />

                        <div className="airkit-swap-holder">
                          <button
                            type="button"
                            className="airkit-swap-btn"
                            onClick={swapAirports}
                            aria-label="Swap departure and destination"
                          >
                            <i
                              className="isax isax-arrow-swap-horizontal"
                              aria-hidden="true"
                            ></i>
                          </button>
                        </div>

                        <AirportDropdown
                          id="to"
                          label="To"
                          airport={toAirport}
                          onSelect={setToAirport}
                        />

                        <div className="form-item">
                          <label className="form-label fs-14 text-default mb-1">
                            Departure
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            value={departureDate}
                            onChange={(event) =>
                              setDepartureDate(event.target.value)
                            }
                          />
                          <p className="fs-12 mb-0">Flexible fares enabled</p>
                        </div>

                        {tripType === "Round Trip" && (
                          <div className="form-item">
                            <label className="form-label fs-14 text-default mb-1">
                              Return
                            </label>
                            <input
                              type="date"
                              className="form-control"
                              value={returnDate}
                              onChange={(event) =>
                                setReturnDate(event.target.value)
                              }
                            />
                            <p className="fs-12 mb-0">Best return matrix</p>
                          </div>
                        )}

                        <TravelersDropdown
                          travelers={travelers}
                          onChange={setTravelers}
                          cabin={cabin}
                          onCabinChange={setCabin}
                        />
                      </div>
                    </div>

                    <div className="airkit-fare-row">
                      <span>Fare type</span>
                      {fareTypes.map((fare) => (
                        <button
                          type="button"
                          key={fare}
                          className={activeFare === fare ? "active" : ""}
                          onClick={() => setActiveFare(fare)}
                        >
                          {fare}
                        </button>
                      ))}
                    </div>
                  </form>

                  <div className="airkit-route-chips">
                    <span>Popular</span>
                    {routeChips.map(([from, to]) => (
                      <button
                        type="button"
                        key={`${from}-${to}`}
                        onClick={() => setRoute(from, to)}
                      >
                        {from} to {to}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div> */}
            <FlightSearchBar />
          </div>
        </section>
        <div className="airkit-hero">
          <div className="container">
            <div className="row align-items-end g-4">
              <div className="col-lg-7">
                <h1>Book smarter trips for every route, team, and budget.</h1>
                <p>
                  Search flights, hotels, trains, cabs, and packages from one
                  clean workspace built for faster travel planning.Search
                  flights, hotels, trains, cabs, and packages from one clean
                  workspace built for faster travel planning.
                </p>
              </div>
              <div className="col-lg-5">
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
            </div>
          </div>
        </div>
      </section>

      <CategoryCards />
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
            <p>
              Work with reliable travel inventory and clear booking details.
            </p>
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
