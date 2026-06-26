import { useState } from "react";
import "./FlightFareModel.css";

import fareData from "./fareData";

import Section from "./Section";
import InfoRow from "./InfoRow";

import {
    CheckIcon,
    WarnIcon,
    ShieldIcon,
} from "./Icons";

const FlightFareModal = () => {
    const [open, setOpen] = useState(false);

    const [selected, setSelected] = useState("yatrab2b");

    const [priceDrop, setPriceDrop] = useState({
        saver: false,
        yatrab2b: false,
        flexi: false,
    });

    const [booked, setBooked] = useState(null);

    const handleBook = (fareId) => {
        setBooked(fareId);
    };

    if (!open) {
        return (
            <div className="ffm-open-wrapper">
                <button
                    className="ffm-open-btn"
                    onClick={() => setOpen(true)}
                >
                    ✈️ View Flight Fare Options
                </button>
            </div>
        );
    }

    return (
        <div className="ffm-container">
            <div className="ffm-modal">

                {/* Header */}

                <div className="ffm-header">

                    <div>

                        <div className="ffm-header-small">
                            FLIGHT DETAILS
                        </div>

                        <h2 className="ffm-title">
                            Choose Your Fare Plan
                        </h2>

                    </div>

                    <div className="ffm-route">

                        <span>DEL</span>

                        <span className="plane">
                            ✈
                        </span>

                        <span>BOM</span>

                    </div>

                    <button
                        className="ffm-close-btn"
                        onClick={() => setOpen(false)}
                    >
                        ×
                    </button>

                </div>

                {/* Flight Info */}

                <div className="flight-info">

                    <div className="airline-logo">
                        Q
                    </div>

                    <span className="airline-name">
                        Akasa Air
                    </span>

                    <span>•</span>

                    <span>
                        Fri, 26 Jun 2026
                    </span>

                    <span>•</span>

                    <span>

                        <strong>06:50</strong>

                        {" → "}

                        <strong>09:00</strong>

                    </span>

                    <span>•</span>

                    <span className="duration">
                        2h 10m
                    </span>

                </div>

                {/* Fare Cards */}

                <div className="fare-grid">

                    {fareData.map((fare) => (
                        <div
                            key={fare.id}
                            className={`fare-card ${selected === fare.id ? "selected" : ""
                                } ${fare.highlight ? "highlight" : ""}`}
                            onClick={() => setSelected(fare.id)}
                        >
                            {selected === fare.id && (
                                <div className="selected-circle">
                                    <div className="selected-dot"></div>
                                </div>
                            )}

                            {fare.badge && (
                                <div className="fare-badge">
                                    ⭐ {fare.badge}
                                </div>
                            )}

                            {/* Price */}

                            <div className="fare-price">

                                <div className="fare-label">
                                    {fare.label}
                                </div>

                                <div className="price-row">
                                    <span className="price">
                                        ₹{fare.price}
                                    </span>

                                    <span className="per-adult">
                                        / adult
                                    </span>
                                </div>

                                {fare.originalPrice && (
                                    <div className="original-price">
                                        ₹{fare.originalPrice.toLocaleString()}
                                    </div>
                                )}

                            </div>

                            <div className="divider"></div>

                            <div className="fare-content">

                                <Section title="Baggage">

                                    <InfoRow
                                        icon={<CheckIcon />}
                                        text={`${fare.baggage.cabin} Cabin Baggage`}
                                    />

                                    <InfoRow
                                        icon={<CheckIcon />}
                                        text={`${fare.baggage.checkin} Check-in Baggage`}
                                    />

                                </Section>

                                <Section title="Flexibility">

                                    {fare.flexibility.map((item, index) => (

                                        <InfoRow
                                            key={index}
                                            icon={
                                                item.type === "free"
                                                    ? <CheckIcon />
                                                    : <WarnIcon />
                                            }
                                            text={item.text}
                                            color={
                                                item.type === "free"
                                                    ? "#16a34a"
                                                    : "#78350f"
                                            }
                                        />

                                    ))}

                                </Section>

                                <Section title="Seats & Meals">

                                    {fare.seats.map((seat, index) => (

                                        <InfoRow
                                            key={index}
                                            icon={
                                                seat.type === "free"
                                                    ? (
                                                        <CheckIcon color="#7c3aed" />
                                                    )
                                                    : (
                                                        <WarnIcon />
                                                    )
                                            }
                                            text={seat.text}
                                            color={
                                                seat.type === "free"
                                                    ? "#7c3aed"
                                                    : "#78350f"
                                            }
                                        />

                                    ))}

                                </Section>

                                {fare.benefits.length > 0 && (

                                    <div className="benefit-box">

                                        <div className="benefit-title">
                                            🎁 BENEFITS INCLUDED
                                        </div>

                                        {fare.benefits.map((benefit, index) => (

                                            <div
                                                key={index}
                                                className="benefit-item"
                                            >
                                                <span className="benefit-dot"></span>

                                                <span>
                                                    {benefit.text}
                                                </span>
                                            </div>

                                        ))}

                                    </div>

                                )}

                            </div>
                            {/* Price Drop Protection */}

                            <div className="price-drop">

                                <label
                                    className="price-drop-label"
                                    onClick={(e) => e.stopPropagation()}
                                >

                                    <input
                                        type="checkbox"
                                        checked={priceDrop[fare.id]}
                                        onChange={(e) =>
                                            setPriceDrop((prev) => ({
                                                ...prev,
                                                [fare.id]: e.target.checked,
                                            }))
                                        }
                                    />

                                    <div>

                                        <div className="price-drop-title">
                                            🛡 Price Drop Protection
                                            <span> +₹199</span>
                                        </div>

                                        <div className="price-drop-desc">
                                            Get refund if fare drops
                                        </div>

                                    </div>

                                </label>

                            </div>

                            {/* Book Button */}

                            <div className="book-btn-wrapper">

                                <button
                                    className={`book-btn ${booked === fare.id ? "success" : ""
                                        } ${fare.highlight ? "highlight-btn" : ""
                                        }`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleBook(fare.id);
                                    }}
                                >
                                    {booked === fare.id
                                        ? "✓ Booking Confirmed!"
                                        : "BOOK NOW"}
                                </button>

                            </div>

                        </div>
                    ))}

                </div>

                {/* Footer */}

                <div className="ffm-footer">

                    <span>
                        * Prices inclusive of taxes. Baggage policy
                        subject to airline terms.
                    </span>

                    <div className="secure-booking">

                        <ShieldIcon />

                        <span>
                            Secure Booking
                        </span>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default FlightFareModal;