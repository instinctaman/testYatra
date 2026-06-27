import "./SeatSelection.css";

import { useMemo, useState } from "react";
import useSeatSelection from "../../hooks/useSeatSelection";

import AircraftHeader from "../../components/SeatSelection/AircraftHeader";
import PassengerList from "../../components/SeatSelection/PassengerList";
import Legend from "../../components/SeatSelection/Legend";
import SeatMap from "../../components/SeatSelection/SeatMap";
import FareSummary from "../../components/SeatSelection/FareSummary";

const mealOptions = [
  { id: "none", title: "No meal", desc: "Skip meal", price: 0, icon: "bi-slash-circle" },
  { id: "veg", title: "Veg meal", desc: "Hot meal + beverage", price: 349, icon: "bi-cup-hot" },
  { id: "nonveg", title: "Non-veg meal", desc: "Protein meal + beverage", price: 399, icon: "bi-egg-fried" },
];

const baggageOptions = [
  { id: "base", title: "Included", desc: "15 kg check-in", price: 0, icon: "bi-suitcase2" },
  { id: "plus5", title: "+5 kg", desc: "20 kg total", price: 1499, icon: "bi-plus-circle" },
  { id: "plus10", title: "+10 kg", desc: "25 kg total", price: 2499, icon: "bi-bag-plus" },
];

const SeatSelection = ({ travellerData = [], onContinue, onBack }) => {
  const [selectedMeal, setSelectedMeal] = useState(mealOptions[1]);
  const [selectedBaggage, setSelectedBaggage] = useState(baggageOptions[0]);
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
    removeSeat,
    resetSelection,
  } = useSeatSelection(travellerData);
  const addonsTotal = useMemo(
    () => (selectedMeal.price + selectedBaggage.price) * passengers.length,
    [selectedMeal, selectedBaggage, passengers.length],
  );
  const finalTotal = grandTotal + addonsTotal;

  return (
    <div className="seat-selection-page">
      <div className="seat-page-heading">
        <button type="button" onClick={onBack}>← Back</button>
        <div><span>STEP 2 OF 4</span><h1>Choose your seats</h1><p>Select a seat for each passenger before continuing.</p></div>
      </div>
      <div className="seat-selection-container">

        {/* Left Side */}
        <section className="seat-left">

          <AircraftHeader />

          <PassengerList
            passengers={passengers}
            activePassengerId={activePassengerId}
            onPassengerSelect={selectPassenger}
            onRemoveSeat={removeSeat}
          />

          <Legend />

          <SeatMap
            seatRows={seatRows}
            onSeatClick={selectSeat}
          />

        </section>

        {/* Right Side */}
        <aside className="seat-right">

          <FareSummary
            passengers={passengers}
            selectedSeats={selectedSeats}
            totalAmount={totalAmount}
            gst={gst}
            grandTotal={grandTotal}
            addons={[
              { label: selectedMeal.title, price: selectedMeal.price * passengers.length },
              { label: selectedBaggage.title, price: selectedBaggage.price * passengers.length },
            ]}
            finalTotal={finalTotal}
          />

          <section className="seat-addons card">
            <div className="seat-addons-head">
              <span>Travel extras</span>
              <h2>Add meal and baggage</h2>
            </div>
            <div className="seat-addon-group">
              <h3>Meal</h3>
              {mealOptions.map((option) => (
                <button
                  type="button"
                  key={option.id}
                  className={`seat-addon-option ${selectedMeal.id === option.id ? "selected" : ""}`}
                  onClick={() => setSelectedMeal(option)}
                >
                  <i className={`bi ${option.icon}`} />
                  <span>
                    <b>{option.title}</b>
                    <small>{option.desc}</small>
                  </span>
                  <strong>{option.price ? `INR ${option.price}` : "Free"}</strong>
                </button>
              ))}
            </div>
            <div className="seat-addon-group">
              <h3>Baggage</h3>
              {baggageOptions.map((option) => (
                <button
                  type="button"
                  key={option.id}
                  className={`seat-addon-option ${selectedBaggage.id === option.id ? "selected" : ""}`}
                  onClick={() => setSelectedBaggage(option)}
                >
                  <i className={`bi ${option.icon}`} />
                  <span>
                    <b>{option.title}</b>
                    <small>{option.desc}</small>
                  </span>
                  <strong>{option.price ? `INR ${option.price}` : "Free"}</strong>
                </button>
              ))}
            </div>
          </section>

          <button
            className="continue-btn"
            disabled={selectedSeats.length !== passengers.length}
            onClick={() => onContinue?.(selectedSeats)}
          >
            Continue to payment
          </button>

          <button
            className="reset-btn"
            onClick={resetSelection}
          >
            Reset Selection
          </button>

        </aside>

      </div>
    </div>
  );
};

export default SeatSelection;
