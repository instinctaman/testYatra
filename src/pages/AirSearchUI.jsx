import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../services/api";

import { useLocation } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import FilterPanel from "../components/FilterPanel";

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
// import FilterPanel from "../NewFiles/FilterPanel";
import CategoryCards from "../cards/CategoryCards";

import vistara from "../assets/images/vistara.jfif";
import indigo from "../assets/images/indigo.jfif";
import airIndia from "../assets/images/airIndia.jfif";

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
              <div className="airkit-airline-logo">
                <i className="bi bi-airplane-fill"></i>
              </div>
              <small>Flight: {flight.flight_number}</small>

              <h5>{flight.airline}</h5>

              <p className="mb-0">
                {flight.origin} → {flight.destination}
              </p>
            </div>

            <div className="airkit-route-line">
              <div>
                <strong>
                  {new Date(flight.departure).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </strong>

                <span>{flight.origin}</span>
              </div>

              <div className="flight-loc d-flex align-items-center justify-content-center">
                <span className="loc-name">{flight.duration} min</span>

                <span className="arrow-icon">
                  <i className="isax isax-arrow-right-1" aria-hidden="true"></i>
                </span>

                <span className="loc-name">
                  {flight.stops === 0 ? "Non Stop" : `${flight.stops} Stop`}
                </span>
              </div>

              <div>
                <strong>
                  {new Date(flight.arrival).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </strong>

                <span>{flight.destination}</span>
              </div>
            </div>

            <div className="airkit-flight-footer">
              <div className="airkit-price">
                <strong>₹ {flight.price}</strong>

                <small>{flight.seats} seats left</small>
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

          <hr />

          <div className="d-flex gap-4">
            <small>
              🧳 Baggage:
              {flight.baggage}
            </small>

            <small>
              🎒 Cabin:
              {flight.cabin_baggage}
            </small>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function AirSearchUI() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    airline: "",
    stops: "all",
    sort: "",
    maxPrice: 30000,
    maxDuration: 1000,
    departure: "",
  });
  const tripType = searchParams.get("tripType") || "One Way";
  const cabin = searchParams.get("cabin") || "Economy";

  const origin = searchParams.get("origin") || "";
  const destination = searchParams.get("destination") || "";

  const departureDate = searchParams.get("departure") || "";
  const returnDate = searchParams.get("return") || "";

  const adults = Number(searchParams.get("adults") || 1);
  const children = Number(searchParams.get("children") || 0);
  const infants = Number(searchParams.get("infants") || 0);
  const totalTravelers = adults + children + infants;
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const filteredFlights = flights
    .filter((flight) => {
      if (filters.airline && flight.airline !== filters.airline) {
        return false;
      }

      if (filters.stops !== "all" && flight.stops !== Number(filters.stops)) {
        return false;
      }

      if (flight.price > filters.maxPrice) {
        return false;
      }

      if (flight.duration > filters.maxDuration) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (filters.sort === "priceLow") return a.price - b.price;

      if (filters.sort === "priceHigh") return b.price - a.price;

      if (filters.sort === "duration") return a.duration - b.duration;

      return 0;
    });

  const airlines = [...new Set(flights.map((flight) => flight.airline))];

  const fetchFlights = useCallback(async () => {
  useEffect(() => {
    if (!origin || !destination || !departureDate) {
      return;
    }

    fetchFlights();
  }, [origin, destination, departureDate]);
    try {
      const response = await api.post("/flight/search", {
        origin,
        destination,
        departure_date: departureDate,
        adults,
        children,
        infants,
      });

      setFlights(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [
    searchData.adults,
    searchData.children,
    searchData.departureDate,
    searchData.destination,
    searchData.infants,
    searchData.origin,
  ]);

  useEffect(() => {
    if (!searchData.origin) {
      return;
    }

    fetchFlights();
  }, [fetchFlights, searchData.origin]);
  return (
    <main className="airkit-page">
      <section
        className="airkit-hero1"
        style={{
          backgroundImage: `linear-gradient(115deg, rgba(7, 21, 45, 0.86), rgba(8, 79, 111, 0.54)), url(${heroBg})`,
        }}
      >
        <div className="container">
          <div className="row align-items-end top-search">
            <div className="col-lg-7 m-auto">
              <nav aria-label="breadcrumb" className="mb-3">
                <ol className="breadcrumb airkit-breadcrumb mb-0">
                  <li className="breadcrumb-item">
                    <a href="/">
                      <i className="isax isax-home5" aria-hidden="true"></i>
                    </a>
                  </li>
                  <li className="breadcrumb-item">Flights</li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Air Search
                  </li>
                </ol>
              </nav>
            </div>
            <div className="col-lg-5">
              <div className="airkit-hero-card">
                <img src={flightImage} alt="Flight booking preview" />
                <div>
                  <span>Today's top route</span>
                  <strong>
                    {origin} to {destination}
                  </strong>
                  <small>Live flight search results</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="content airkit-results-section">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3">
              <FilterPanel
                flights={flights}
                filters={filters}
                setFilters={setFilters}
              />
            </div>
            <div className="col-xl-9 col-lg-9">
              <div className="airkit-results-heading">
                <div>
                  <span className="badge bg-primary mb-2">
                    Recommended flights
                  </span>
                  <h2>
                    {origin} to {destination}, {adults + children + infants}{" "}
                    traveller
                    {totalTravelers > 1 ? "s" : ""}
                  </h2>
                  <p>
                    Showing curated options for {departureDate}
                    {tripType === "Round Trip" ? ` to ${returnDate}` : ""}.
                  </p>
                </div>
                <div className="airkit-sort dropdown">
                  <button
                    type="button"
                    className="btn btn-light"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Sort by: Best Value
                    <i
                      className="isax isax-arrow-down-1 ms-2"
                      aria-hidden="true"
                    ></i>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button type="button" className="dropdown-item">
                        Best Value
                      </button>
                    </li>
                    <li>
                      <button type="button" className="dropdown-item">
                        Lowest Price
                      </button>
                    </li>
                    <li>
                      <button type="button" className="dropdown-item">
                        Earliest Departure
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              <h5 className="mb-3">{filteredFlights.length} Flights Found</h5>
              <div className="airkit-flight-list">
                {loading ? (
                  <>
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="card p-4 mb-3 shadow-sm">
                        <div className="placeholder-glow">
                          <span className="placeholder col-4"></span>

                          <span className="placeholder col-12 mt-3"></span>

                          <span className="placeholder col-8 mt-2"></span>

                          <span className="placeholder col-3 mt-3"></span>
                        </div>
                      </div>
                    ))}
                  </>
                ) : flights.length > 0 ? (
                  filteredFlights.map((flight, index) => (
                    <FlightCard
                      key={flight.result_index || index}
                      flight={flight}
                      selected={selectedFlight === flight.result_index}
                      onSelect={setSelectedFlight}
                    />
                  ))
                ) : (
                  <div className="alert alert-info">
                    Search flights to view results.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
