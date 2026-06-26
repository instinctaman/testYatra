// TripDetails.js
import React, { useState, useEffect } from 'react';
import './TripDetails.css';
import { fetchTripData } from './mockApi';

const TripDetails = () => {
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appliedPromos, setAppliedPromos] = useState(['FREELY']);
  const [promoCode, setPromoCode] = useState('');
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [totalAmount, setTotalAmount] = useState(7102);
  const [isContinuing, setIsContinuing] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Load Data from Mock API
  const loadTripData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);

    try {
      const data = await fetchTripData();
      setTripData(data);
      setTotalAmount(data.initialTotalAmount);
    } catch (error) {
      console.error("Error fetching trip data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Initial Load
  useEffect(() => {
    loadTripData();
  }, []);

  const handleRefresh = () => {
    setTripData(null);
    loadTripData(true);
  };

  const handleApplyPromo = () => {
    if (promoCode.trim()) {
      const newCode = promoCode.trim().toUpperCase();
      if (!appliedPromos.includes(newCode)) {
        setAppliedPromos([...appliedPromos, newCode]);
        setTotalAmount(Math.max(6500, totalAmount - 300));
      }
      setPromoCode('');
      setShowPromoInput(false);
    }
  };

  const handleRemovePromo = (codeToRemove) => {
    setAppliedPromos(appliedPromos.filter(code => code !== codeToRemove));
    if (codeToRemove === 'FREELY') {
      setTotalAmount(totalAmount + 230);
    } else {
      setTotalAmount(totalAmount + 300);
    }
  };

  const handleContinue = () => {
    setIsContinuing(true);
    setTimeout(() => {
      alert("🎉 Booking flow initiated! (Demo Version)");
      setIsContinuing(false);
    }, 1200);
  };

  // Loading State
  if (loading && !tripData) {
    return (
      <div className="main-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <h2>Loading Trip Details...</h2>
      </div>
    );
  }

  return (
    <div className="main-container">
      {/* Header */}
      {/* <div className="header">
        <div className="logo">
          <div className="logo-icon">Y</div>
          <h1>Yatra</h1>
        </div>
        
        <div className="header-right">
          <button className="refresh-btn" onClick={handleRefresh} disabled={refreshing}>
            {refreshing ? "Refreshing..." : "🔄 Refresh Data"}
          </button>
          <div className="user-info">
            <i className="fas fa-user"></i>
            <span>Hi, Traveler</span>
          </div>
        </div>
      </div> */}

      <div className="content-grid">
        {/* Left Panel - Trip Details */}
        <div className="left-panel">
          <div className="card">
            <div className="trip-header">
              <h2>{tripData.origin} - {tripData.destination} | {tripData.segments.length - 1} Stop</h2>
              <p>Total Time: <strong>{tripData.totalDuration}</strong></p>
            </div>

            {tripData.segments.map((flight, index) => (
              <React.Fragment key={index}>
                <div className="flight-card">
                  <div className="flight-row">
                    <div className="airline-info">
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Air_India_Logo.svg/2560px-Air_India_Logo.svg.png" 
                        alt="AI" 
                        className="airline-logo" 
                      />
                      <div>
                        <p className="flight-name">Air India {flight.flightNumber}</p>
                        <p className="aircraft">{flight.aircraft}</p>
                      </div>
                    </div>

                    <div className="departure">
                      <p className="time">{flight.departure.time}</p>
                      <p className="date">{flight.departure.date}</p>
                      <p className="airport">{flight.departure.airport} • {flight.departure.terminal}</p>
                    </div>

                    <div className="duration">
                      <p>{flight.duration}</p>
                    </div>

                    <div className="arrival">
                      <p className="time">{flight.arrival.time}</p>
                      <p className="date">{flight.arrival.date}</p>
                      <p className="airport">{flight.arrival.airport} • {flight.arrival.terminal}</p>
                    </div>
                  </div>
                  <div className="fare-type">{flight.fareType}</div>
                </div>

                {index < tripData.segments.length - 1 && (
                  <div className="layover">
                    Change of planes • 2h 20m Layover in {flight.arrival.airport}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Value Inclusions */}
          <div className="card">
            <h3 className="section-title">Value Inclusions</h3>
            <div className="inclusions-grid">
              {[
                { icon: "❌", title: "Cancellation", desc: "0h-2h: Non Refundable<br>2h-365d: ₹3,250" },
                { icon: "📅", title: "Date Change", desc: "0h-2h: Non Chargeable<br>2h-365d: ₹3,150" },
                { icon: "🪑", title: "Seats", desc: "Standard Limited Free<br>Preferred: Chargeable" },
                { icon: "🍽️", title: "Meal", desc: "Complimentary" },
                { icon: "🧳", title: "Baggage", desc: "Hand: 7 Kg<br>Check-in: 15 Kgs" }
              ].map((item, i) => (
                <div key={i} className="inclusion-item">
                  <div className="inclusion-icon">{item.icon}</div>
                  <p className="inclusion-title">{item.title}</p>
                  <p className="inclusion-desc" dangerouslySetInnerHTML={{ __html: item.desc }}></p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - Fare Summary */}
        <div className="right-panel">
          <div className="card sticky">
            <h3 className="section-title">Fare Summary</h3>

            <div className="fare-breakdown">
              <div className="fare-row"><span>Base Fare (1 Traveller)</span><span>₹{tripData.baseFare}</span></div>
              <div className="fare-row"><span>Fee & Surcharges</span><span>₹{tripData.fees}</span></div>
              <div className="fare-row discount"><span>Discounts</span><span>-₹{tripData.discounts}</span></div>
              <hr />
              <div className="fare-row total"><span>Total Amount</span><span>₹{totalAmount}</span></div>
            </div>

            <div className="promo-section">
              <div className="promo-header">
                <h4>Promo Codes</h4>
                <button className="add-promo-btn" onClick={() => setShowPromoInput(!showPromoInput)}>
                  + Add Code
                </button>
              </div>

              {showPromoInput && (
                <div className="promo-input">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter promo code"
                  />
                  <button onClick={handleApplyPromo}>Apply</button>
                </div>
              )}

              {appliedPromos.map((code, i) => (
                <div key={i} className="promo-applied">
                  <div>
                    <strong>{code}</strong>
                    <p>Applied</p>
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => handleRemovePromo(code)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <button className="continue-btn" onClick={handleContinue} disabled={isContinuing}>
              {isContinuing ? "Processing..." : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;