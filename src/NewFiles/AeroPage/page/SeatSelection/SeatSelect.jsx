import "./SeatSelect.css";
import { useMemo, useState } from "react";
import useSeatSelection from "../../hooks/useSeatSelection";

import PassengerList from "../../components/SeatSelection/PassengerList";
import Legend from "../../components/SeatSelection/Legend";
import SeatMap from "../../components/SeatSelection/SeatMap";
import FareSummary from "../../components/SeatSelection/FareSummary";
import Mealimage from "./mealimage/image2.png";
import Mealimage1 from "./mealimage/image3.png";
import Mealimage2 from "./mealimage/image4.png";
import Mealimage3 from "./mealimage/image2.png";
import Mealimage4 from "./mealimage/image6.png";
import Mealimage5 from "./mealimage/image7.png";
import Mealimage6 from "./mealimage/image8.png";
import Mealimage7 from "./mealimage/image8.png";

const mealImages = [
  Mealimage,
  Mealimage1,
  Mealimage2,
  Mealimage3,
  Mealimage4,
  Mealimage5,
  Mealimage6,
  Mealimage7
];

const mealOptions = [
  { id: "veg1", type: "Veg", title: "Paneer Butter Masala", desc: "Paneer, Naan, Rice & Dessert", price: 349, image: mealImages[0], rating: 4.8, recommended: true },
  { id: "veg2", type: "Veg", title: "Veg Biryani", desc: "Hyderabadi Veg Biryani with Raita", price: 299, image: mealImages[1], rating: 4.6, recommended: false },
  { id: "nonveg1", type: "Non Veg", title: "Chicken Biryani", desc: "Chicken Dum Biryani + Raita", price: 399, image: mealImages[2], rating: 4.9, recommended: true },
  { id: "nonveg2", type: "Non Veg", title: "Chicken Curry Meal", desc: "Chicken Curry, Rice & Bread", price: 449, image: mealImages[3], rating: 4.7, recommended: false },
  { id: "veg3", type: "Veg", title: "Healthy Salad Mix", desc: "Fresh garden salad mix", price: 199, image: mealImages[4], rating: 4.5, recommended: false },
  { id: "veg4", type: "Veg", title: "Tomato Basil Pasta", desc: "Italian pasta in rich tomato sauce", price: 279, image: mealImages[5], rating: 4.4, recommended: false },
  { id: "nonveg3", type: "Non Veg", title: "Roasted Chicken", desc: "Served with grilled tomatoes", price: 429, image: mealImages[6], rating: 4.8, recommended: true },
  { id: "nonveg4", type: "Non Veg", title: "Mutton Biryani", desc: "Premium long grain aromatic rice", price: 499, image: mealImages[7], rating: 4.9, recommended: false }
];

const baggageOptions = [
  { id: "base", title: "Included Baggage", desc: "15 kg check-in allowance", price: 0 },
  { id: "plus5", title: "Additional +5 kg", desc: "20 kg total check-in weight", price: 1499 },
  { id: "plus10", title: "Additional +10 kg", desc: "25 kg total check-in weight", price: 2499 }
];

const formatDate = (date) => {
  if (!date) return "Date not selected";
  return new Date(date).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getStopLabel = (stops) => {
  if (stops === 0) return "Non-stop";
  if (stops === 1) return "1 Stop";
  return `${stops || 0} Stops`;
};

const SeatSelection = ({
  search = {},
  booking = {},
  contact = {},
  promo = false,
  travellerData = [],
  onContinue,
  onBack,
}) => {
  const [selectedMeals, setSelectedMeals] = useState({});
  const [selectedBaggage, setSelectedBaggage] = useState(baggageOptions[0]);
  const [activeComfortTab, setActiveComfortTab] = useState("seat");

  // Hook elements
  const {
    seatRows,
    passengers,
    activePassengerId,
    selectedSeats,
    totalAmount,
    gst,
    grandTotal,
    selectPassenger,
    selectSeat,
    resetSelection,
  } = useSeatSelection(travellerData);

  const selectedCount = selectedSeats?.length || 0;
  const isSeatSelectionComplete = selectedCount === passengers.length;

  const mealsSummaryList = useMemo(() => {
    return Object.entries(selectedMeals)
      .filter(([_, qty]) => qty > 0)
      .map(([id, qty]) => {
        const meal = mealOptions.find((m) => m.id === id);
        return { ...meal, qty };
      });
  }, [selectedMeals]);

  const totalMealsPrice = useMemo(() => {
    return mealsSummaryList.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [mealsSummaryList]);

  const addonsTotal = useMemo(
    () => totalMealsPrice + (selectedBaggage.price * passengers.length),
    [totalMealsPrice, selectedBaggage, passengers.length]
  );

  const finalTotal = grandTotal + addonsTotal;
  const flight = booking.flight || {};
  const fare = booking.fare || {};
  const airlineCode = flight.code?.split(" ")?.[0] || flight.airline?.slice(0, 2) || "--";
  const checkInKg = fare.id === "value" ? 15 : fare.id === "flex" ? 20 : 25;
  const routeFrom = search.from || flight.from || "--";
  const routeTo = search.to || flight.to || "--";

  const handleIncreaseMeal = (mealId) => {
    setSelectedMeals((prev) => ({ ...prev, [mealId]: (prev[mealId] || 0) + 1 }));
  };

  const handleDecreaseMeal = (mealId) => {
    setSelectedMeals((prev) => {
      const currentQty = prev[mealId] || 0;
      if (currentQty <= 1) {
        const updated = { ...prev };
        delete updated[mealId];
        return updated;
      }
      return { ...prev, [mealId]: currentQty - 1 };
    });
  };

  const handleProceedCheck = (actionFn) => {
    if (!isSeatSelectionComplete) {
      alert(`⚠️ Please select seats for all passengers (${selectedCount}/${passengers.length} Selected) before proceeding!`);
      setActiveComfortTab("seat"); 
      return;
    }
    actionFn?.();
  };

  return (
    <div className="seat-selection-page">
      <div className="seat-selection-container">
        <section className="seat-left">
          
          {/* Flight Trip Card */}
          <div className="trip-card">
            <span className="trip-status"><i className="bi bi-check-lg" /></span>
            <div className="trip-main">
              <div className="trip-title-row">
                <h2>Your Trip Details</h2>
                <button type="button" className="fare-pill">{search.cabin || "Economy"} | {fare.name || "Selected Fare"}</button>
              </div>
              <div className="trip-flight-row">
                <div className="airline-mark">{airlineCode}</div>
                <div className="airline-copy">
                  <b>{flight.airline || "Selected Airline"}</b>
                  <span>{flight.code || "Flight code not available"}</span>
                </div>
                <div className="trip-route">
                  <b>{routeFrom} — {routeTo}</b>
                  <span>{formatDate(search.departure)}</span>
                </div>
                <div className="trip-time">
                  <b>{flight.depart || "--:--"} - {flight.arrive || "--:--"}</b>
                  <span>{flight.duration || "--"} | {getStopLabel(flight.stops)}</span>
                </div>
              </div>
              <div className="baggage-line">
                <b>Baggage Included:</b>
                <span>Cabin: 7 kg</span>
                <span>Check-in: {checkInKg} kg</span>
              </div>
            </div>
          </div>

          {/* Comfort Add-ons Structure */}
          <section className="comfort-card">
            <div className="comfort-heading">
              <h2>Comfort on your Trip</h2>
              <button
                type="button"
                className="skip-btn"
                onClick={() => handleProceedCheck(() => onContinue?.(selectedSeats))}
              >
                Skip add-ons
              </button>
            </div>

            <div className="comfort-tabs">
              <button type="button" className={activeComfortTab === "seat" ? "active" : ""} onClick={() => setActiveComfortTab("seat")}>
                <i className="bi bi-person-square" /> Select Seats ({selectedCount}/{passengers.length}) <span className="compulsory-dot">*</span>
              </button>
              <button type="button" className={activeComfortTab === "baggage" ? "active" : ""} onClick={() => setActiveComfortTab("baggage")}>
                <i className="bi bi-suitcase2" /> Add Baggage
              </button>
              <button type="button" className={activeComfortTab === "meal" ? "active" : ""} onClick={() => setActiveComfortTab("meal")}>
                <i className="bi bi-cup-hot" /> Meals
              </button>
            </div>

            <div className="route-tabs">
              <button type="button" className="active">{routeFrom}-{routeTo}</button>
            </div>

            <div className="comfort-content">
              {/* SEAT SELECT SUB VIEW */}
              {activeComfortTab === "seat" && (
                <div className="seat-workspace">
                  <div className="seat-sidebar">
                    <PassengerList 
                      passengers={passengers} 
                      activePassengerId={activePassengerId}
                      onPassengerSelect={selectPassenger}
                    />
                    <Legend />
                  </div>
                  <div className="seat-stage">
                    <SeatMap 
                      seatRows={seatRows}
                      activePassengerId={activePassengerId}
                      selectedSeats={selectedSeats}
                      onSeatClick={selectSeat}
                    />
                  </div>
                </div>
              )}

              {/* BAGGAGE SUB VIEW */}
              {activeComfortTab === "baggage" && (
                <div className="comfort-option-grid">
                  {baggageOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      className={`baggage-card ${selectedBaggage.id === option.id ? "selected" : ""}`}
                      onClick={() => setSelectedBaggage(option)}
                    >
                      <div className="baggage-card-copy">
                        <b>{option.title}</b>
                        <small>{option.desc}</small>
                      </div>
                      <strong>{option.price ? `₹${option.price}` : "Included"}</strong>
                    </button>
                  ))}
                </div>
              )}

              {/* MEAL MULTI QUANTITY SUB VIEW */}
              {activeComfortTab === "meal" && (
                <div className="meal-grid">
                  {mealOptions.map((meal) => {
                    const quantity = selectedMeals[meal.id] || 0;
                    return (
                      <div key={meal.id} className={`meal-card ${quantity > 0 ? "selected" : ""}`}>
                        <div className="meal-image-wrapper">
                          <img src={meal.image} alt={meal.title} className="meal-image" />
                          {meal.recommended && <span className="meal-tag">Recommended</span>}
                          <span className={meal.type === "Veg" ? "veg-badge" : "nonveg-badge"}>{meal.type}</span>
                        </div>

                        <div className="meal-body">
                          <div className="meal-title-price">
                            <h3>{meal.title}</h3>
                            <strong className="meal-price-tag">₹{meal.price}</strong>
                          </div>
                          <p>{meal.desc}</p>
                          
                          <div className="meal-footer-action">
                            <div className="meal-rating-star">⭐ {meal.rating}</div>
                            
                            {quantity > 0 ? (
                              <div className="quantity-controller">
                                <button type="button" className="qty-btn" onClick={() => handleDecreaseMeal(meal.id)}>−</button>
                                <span className="qty-count">{quantity}</span>
                                <button type="button" className="qty-btn" onClick={() => handleIncreaseMeal(meal.id)}>+</button>
                              </div>
                            ) : (
                              <button type="button" className="meal-add-btn" onClick={() => handleIncreaseMeal(meal.id)}>
                                Add
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          <div className="bottom-actions">
            <button
              className="continue-btn"
              onClick={() => handleProceedCheck(() => onContinue?.(selectedSeats))}
              disabled={!isSeatSelectionComplete}
            >
              Continue to next Flight
            </button>
            <button type="button" className="back-link" onClick={onBack}>Back</button>
          </div>
        </section>

        {/* Right Panel Summary Information */}
        <aside className="seat-right">
          <FareSummary
            passengers={passengers}
            selectedSeats={selectedSeats}
            totalAmount={totalAmount}
            gst={gst}
            grandTotal={grandTotal}
            addons={[
              { label: `Meals (${mealsSummaryList.reduce((a, b) => a + b.qty, 0)})`, price: totalMealsPrice },
              { label: selectedBaggage.title, price: selectedBaggage.price * passengers.length }
            ]}
            finalTotal={finalTotal}
          />
          
          <section className="card addon-summary">
            <h3>Selected Extras</h3>
            
            {/* Real-time Selected Seats Display */}
            <div className="addon-summary-item" style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #eee' }}>
              <span>Selected Seats:</span>
              <strong>
                {selectedSeats && selectedSeats.length > 0 
                  ? selectedSeats.join(", ") 
                  : "None Selected"}
              </strong>
            </div>

            <div className="addon-summary-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '5px' }}>
              <span>Meals Added:</span>
              {mealsSummaryList.length > 0 ? (
                <div className="summary-meals-list">
                  {mealsSummaryList.map(m => (
                    <div key={m.id} className="summary-meal-row">
                      <span>• {m.title} <b>x{m.qty}</b></span>
                      <span>₹{m.price * m.qty}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <strong style={{ fontSize: '12px', color: '#999' }}>No meals added (Optional)</strong>
              )}
            </div>
            <div className="addon-summary-item" style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #eee' }}>
              <span>Baggage</span>
              <span><strong>{selectedBaggage.title} {selectedBaggage.price > 0 ? `(₹${selectedBaggage.price})` : "(Included)"}</strong></span>
            </div>
          </section>

          <button className="reset-btn" onClick={() => { resetSelection(); setSelectedMeals({}); }}>
            Reset Selection
          </button>
        </aside>
      </div>
    </div>
  );
};

export default SeatSelection;