import { useMemo, useState } from "react";

import "../assets/ui/assets/css/animate.css"; 
import "../assets/ui/assets/css/iconsax.css";
import "../assets/ui/assets/plugins/fontawesome/css/all.min.css";
import "../assets/ui/assets/plugins/tabler-icons/tabler-icons.css";
import "../assets/ui/assets/css/meanmenu.css";
import "../assets/ui/assets/css/style.css";

import heroBg from "../assets/ui/assets/img/bg/breadcrumb-04.jpg";
// import brandLogo from "../assets/ui/assets/img/logo-dark.svg";
import flightImage from "../assets/ui/assets/img/menu/flight.jpg";
import hotelImage from "../assets/ui/assets/img/menu/hotel.jpg";
import tourImage from "../assets/ui/assets/img/menu/tour.jpg";
import cruiseImage from "../assets/ui/assets/img/menu/cruise.jpg";
// import homeOneImage from "../assets/ui/assets/img/menu/home-01.jpg";
// import homeSevenImage from "../assets/ui/assets/img/menu/home-07.jpg";
// import homeTwelveImage from "../assets/ui/assets/img/menu/home-12.jpg";
import homeOneImage from "../assets/images/plane.jpg";
import homeSevenImage from "../assets/images/plane.jpg";
import homeTwelveImage from "../assets/images/plane.jpg";
import userFourteen from "../assets/ui/assets/img/users/user-14.jpg";
import userFifteen from "../assets/ui/assets/img/users/user-15.jpg";
import userSixteen from "../assets/ui/assets/img/users/user-16.jpg";

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

const flights = [
  {
    id: "vistara-214",
    airline: "Vistara",
    code: "UK 214",
    mark: "UK",
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
    image: homeOneImage,
    avatar: userFourteen,
  },
  {
    id: "indigo-821",
    airline: "IndiGo",
    code: "6E 821",
    mark: "6E",
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
    image: homeSevenImage,
    avatar: userFifteen,
  },
  {
    id: "airindia-907",
    airline: "Air India",
    code: "AI 907",
    mark: "AI",
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
    image: homeTwelveImage,
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
      <div className="airkit-flight-media">
        <img src={flight.image} alt={`${flight.airline} route visual`} />
        <span className={`badge ${flight.accent}`}>{flight.badge}</span>
      </div>

      <div className="airkit-flight-body">
        <div className="airkit-flight-top">
          <div className="d-flex align-items-center gap-3">
            <span className="airkit-airline-mark">{flight.mark}</span>
            <div>
              <h5>{flight.airline}</h5>
              <p className="mb-0">{flight.code}</p>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <span className="avatar avatar-md flex-shrink-0 me-2">
              <img src={flight.avatar} className="rounded-circle" alt="" />
            </span>
            <span className="badge badge-warning badge-xs text-gray-9 fs-13 fw-medium">
              4.8
            </span>
          </div>
        </div>

        <div className="airkit-route-line">
          <div>
            <strong>{flight.depart}</strong>
            <span>{flight.from}</span>
          </div>
          <div className="flight-loc d-flex align-items-center justify-content-center">
            <span className="loc-name">{flight.duration}</span>
            <span className="arrow-icon">
              <i className="isax isax-arrow-right-1" aria-hidden="true"></i>
            </span>
            <span className="loc-name">{flight.stops}</span>
          </div>
          <div>
            <strong>{flight.arrive}</strong>
            <span>{flight.to}</span>
          </div>
        </div>

        <div className="airkit-flight-footer">
          <div className="d-flex align-items-center flex-wrap gap-3">
            <span>
              <i className="isax isax-bag-tick-2 me-1" aria-hidden="true"></i>
              {flight.baggage}
            </span>
            <span>
              <i className="isax isax-shield-tick me-1" aria-hidden="true"></i>
              {flight.refund}
            </span>
          </div>
          <div className="airkit-price">
            <strong>{flight.price}</strong>
            <small>per traveller</small>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => onSelect(flight.id)}
          >
            {selected ? "Selected" : "Book Now"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function AirSearchUI() {
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
  const [selectedFlight, setSelectedFlight] = useState(flights[0].id);

  const totalTravelers = travelers.adults + travelers.children + travelers.infants;
  const selectedFlightData = useMemo(
    () => flights.find((flight) => flight.id === selectedFlight) ?? flights[0],
    [selectedFlight]
  );

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

  return (
    <main className="airkit-page">
      <section
        className="airkit-hero"
        style={{
          backgroundImage: `linear-gradient(115deg, rgba(7, 21, 45, 0.86), rgba(8, 79, 111, 0.54)), url(${heroBg})`,
        }}
      >
        <div className="container">

          <div className="row align-items-end g-4">
            <div className="col-lg-7">
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
              <span className="badge bg-warning text-gray-9 mb-3">
                B2B flight booking
              </span>
              <h1>Search smarter fares across every route.</h1>
              <p>
                Compare live-style flight options, cabin choices, baggage, and
                trip rules in a polished workspace built from the current UI kit.
              </p>
            </div>
            <div className="col-lg-5">
              <div className="airkit-hero-card">
                <img src={flightImage} alt="Flight booking preview" />
                <div>
                  <span>Today's top route</span>
                  <strong>
                    {fromAirport.city} to {toAirport.city}
                  </strong>
                  <small>{selectedFlightData.price} onwards</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="airkit-search-wrap">
        <div className="container">
          <div className="card airkit-search-card">
            <div className="card-body">
              <div className="banner-form">
                <ul className="nav mb-3" aria-label="Travel services">
                  {services.map((item) => (
                    <li key={item.title}>
                      <button
                        type="button"
                        className={`nav-link ${item.active ? "active" : ""}`}
                      >
                        <i className={`isax ${item.icon} me-2`} aria-hidden="true"></i>
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
                      <label key={type} className={tripType === type ? "active" : ""}>
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
                          <i className="isax isax-arrow-swap-horizontal" aria-hidden="true"></i>
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
                          onChange={(event) => setDepartureDate(event.target.value)}
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
                            onChange={(event) => setReturnDate(event.target.value)}
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

                    <button type="submit" className="btn btn-primary search-btn rounded">
                      <i className="isax isax-search-normal me-2" aria-hidden="true"></i>
                      Search
                    </button>
                  </div>
                </form>

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
          </div>
        </div>
      </section>

      <section className="airkit-service-strip">
        <div className="container">
          <div className="row g-3">
            {services.map((item) => (
              <div className="col-xl-3 col-md-6" key={item.title}>
                <div className={`hotel-type-item d-flex align-items-center ${item.active ? "active" : ""}`}>
                  <span className="avatar avatar-lg">
                    <img src={item.image} className="rounded-circle" alt="" />
                  </span>
                  <div className="ms-2">
                    <h6 className="fs-16 fw-medium">{item.title}</h6>
                    <p className="fs-14">{item.count}</p>
                  </div>
                  <i className={`isax ${item.icon} ms-auto`} aria-hidden="true"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content airkit-results-section">
        <div className="container">
          <div className="row">
            <aside className="col-xl-3 col-lg-4">
              <div className="card filter-sidebar airkit-filter-card">
                <div className="card-header d-flex align-items-center justify-content-between">
                  <h5>Filters</h5>
                  <button type="button" className="fs-14 link-primary">
                    Reset
                  </button>
                </div>
                <div className="card-body p-0">
                  <div className="p-3 border-bottom">
                    <label className="form-label fs-16">Price range</label>
                    <input
                      type="range"
                      className="form-range"
                      min="4000"
                      max="12000"
                      defaultValue="7600"
                    />
                    <div className="d-flex justify-content-between fs-14">
                      <span>INR 4k</span>
                      <span>INR 12k</span>
                    </div>
                  </div>

                  <div className="accordion accordion-list" id="airkitFilters">
                    {filterGroups.map((group) => (
                      <div className="accordion-item border-bottom p-3" key={group.id}>
                        <div className="accordion-header">
                          <button
                            type="button"
                            className="accordion-button p-0"
                            data-bs-toggle="collapse"
                            data-bs-target={`#airkit-${group.id}`}
                            aria-expanded="true"
                            aria-controls={`airkit-${group.id}`}
                          >
                            <i className={`isax ${group.icon} me-2 text-primary`} aria-hidden="true"></i>
                            {group.title}
                          </button>
                        </div>
                        <div
                          id={`airkit-${group.id}`}
                          className="accordion-collapse collapse show"
                          data-bs-parent="#airkitFilters"
                        >
                          <div className="accordion-body pt-2">
                            {group.items.map((item, index) => (
                              <div
                                className="form-checkbox form-check d-flex align-items-center mt-2"
                                key={item}
                              >
                                <input
                                  className="form-check-input ms-0 mt-0"
                                  type="checkbox"
                                  id={`filter-${group.id}-${index}`}
                                  defaultChecked={index === 0}
                                />
                                <label
                                  className="form-check-label ms-2"
                                  htmlFor={`filter-${group.id}-${index}`}
                                >
                                  {item}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            <div className="col-xl-9 col-lg-8">
              <div className="airkit-results-heading">
                <div>
                  <span className="badge bg-primary mb-2">Recommended flights</span>
                  <h2>
                    {fromAirport.code} to {toAirport.code}, {totalTravelers} traveller
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
                    <i className="isax isax-arrow-down-1 ms-2" aria-hidden="true"></i>
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

              <div className="airkit-flight-list">
                {flights.map((flight) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    selected={selectedFlight === flight.id}
                    onSelect={setSelectedFlight}
                  />
                ))}
              </div>

              <div className="row g-4 mt-2">
                <div className="col-md-4">
                  <article className="place-item airkit-promo-card">
                    <div className="place-img">
                      <img src={homeOneImage} className="img-fluid" alt="Airport lounge" />
                      <div className="fav-item">
                        <span className="badge bg-info">Add-on</span>
                      </div>
                    </div>
                    <div className="place-content">
                      <h5 className="mb-1">Lounge access</h5>
                      <p>Bundle premium lounge access before checkout.</p>
                    </div>
                  </article>
                </div>
                <div className="col-md-4">
                  <article className="place-item airkit-promo-card">
                    <div className="place-img">
                      <img src={homeSevenImage} className="img-fluid" alt="Hotel room" />
                      <div className="fav-item">
                        <span className="badge bg-success">Deal</span>
                      </div>
                    </div>
                    <div className="place-content">
                      <h5 className="mb-1">Stay combo</h5>
                      <p>Pair flights with trusted city hotels.</p>
                    </div>
                  </article>
                </div>
                <div className="col-md-4">
                  <article className="place-item airkit-promo-card">
                    <div className="place-img">
                      <img src={homeTwelveImage} className="img-fluid" alt="Travel assistance" />
                      <div className="fav-item">
                        <span className="badge bg-primary">Support</span>
                      </div>
                    </div>
                    <div className="place-content">
                      <h5 className="mb-1">Priority desk</h5>
                      <p>Get guided changes for business trips.</p>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Pagination --> */}
      <nav className="pagination-nav">
        <ul className="pagination justify-content-center">
          <li className="page-item disabled">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">
                <i className="fa-solid fa-chevron-left"></i>
              </span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item active">
            <a className="page-link" href="#">
              4
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              5
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">
                <i className="fa-solid fa-chevron-right"></i>
              </span>
            </a>
          </li>
        </ul>
      </nav>
      {/* <!-- /Pagination --> */}
    </main>



  );

}
