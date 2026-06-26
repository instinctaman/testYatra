import { useState } from "react";

const fareData = [
  {
    id: "saver",
    label: "SAVER",
    badge: null,
    price: 8254,
    originalPrice: null,
    highlight: false,
    baggage: { cabin: "7 Kgs", checkin: "15 Kgs" },
    flexibility: [
      { type: "warn", text: "Cancellation fee ₹4999(upto 3 hrs before)" },
      { type: "warn", text: "Date Change fee ₹2,999 (upto 3 hrs before)" },
    ],
    seats: [
      { type: "charge", text: "Chargeable Seats" },
      { type: "charge", text: "Chargeable Meals" },
    ],
    benefits: [],
    priceDropProtection: true,
  },
  {
    id: "mmt",
    // label: "FARE BY MAKEMYTRIP",
    // badge: "MMT SPECIAL",
    price: 8382,
    originalPrice: 8682,
    highlight: true,
    baggage: { cabin: "7 Kgs", checkin: "15 Kgs" },
    flexibility: [
      { type: "warn", text: "Cancellation fee ₹4,999 (upto 3 hrs before)" },
      { type: "free", text: "Free Date Change" },
    ],
    seats: [
      { type: "charge", text: "Chargeable Seats" },
      { type: "charge", text: "Chargeable Meals" },
    ],
    benefits: [
      { text: "Free Date Change worth ₹99" },
      { text: "Trip Secure worth ₹329" },
    ],
    priceDropProtection: true,
  },
  {
    id: "flexi",
    label: "FLEXI",
    badge: null,
    price: 8824,
    originalPrice: null,
    highlight: false,
    baggage: { cabin: "7 Kgs", checkin: "15 Kgs" },
    flexibility: [
      { type: "warn", text: "Lower Cancellation fee ₹3,499 (upto 3 hrs)" },
      { type: "warn", text: "Lower Date Change fee ₹999 (upto 3 hrs)" },
    ],
    seats: [
      { type: "free", text: "Free Seats" },
      { type: "free", text: "Complimentary Meals" },
    ],
    benefits: [],
    priceDropProtection: true,
  },
];

const CheckIcon = ({ color = "#22c55e" }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="8" fill={color} fillOpacity="0.15" />
    <path d="M4.5 8L7 10.5L11.5 5.5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const WarnIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="8" fill="#f97316" fillOpacity="0.15" />
    <path d="M8 5v4" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="8" cy="11.5" r="0.8" fill="#f97316" />
  </svg>
);

const GiftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M20 12v10H4V12" stroke="#3aed9f" strokeWidth="2" strokeLinecap="round" />
    <path d="M22 7H2v5h20V7z" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L3 6v6c0 5.25 3.75 10.15 9 11.25C17.25 22.15 21 17.25 21 12V6L12 2z" stroke="#0ea5e9" strokeWidth="2" strokeLinejoin="round" />
  </svg>
);

export default function FlightFareModal() {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("mmt");
  const [priceDrop, setPriceDrop] = useState({ saver: false, mmt: false, flexi: false });
  const [booked, setBooked] = useState(null);

  const handleBook = (fareId) => {
    setBooked(fareId);
    setTimeout(() => setBooked(null), 2000);
  };

  if (!open) {
    return (
      <div style={{ minHeight: "100vh", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <button
          onClick={() => setOpen(true)}
          style={{
            padding: "14px 32px",
            background: "linear-gradient(135deg, #3b82f6, #6366f1)",
            color: "#fff",
            border: "none",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(99,102,241,0.35)",
          }}
        >
          ✈️ View Flight Fare Options
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0e7ff 0%, #f0f9ff 50%, #ede9fe 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
      }}
    >
      {/* Modal */}
      <div
        style={{
          background: "#fff",
          borderRadius: "20px",
          boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
          width: "100%",
          maxWidth: "920px",
          overflow: "hidden",
          animation: "fadeSlideUp 0.35s ease",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
            padding: "20px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ color: "#bfdbfe", fontSize: "12px", fontWeight: "500", letterSpacing: "1.5px", marginBottom: "4px" }}>
              FLIGHT DETAILS
            </div>
            <div style={{ color: "#fff", fontSize: "20px", fontWeight: "700" }}>
              Choose Your Fare Plan
            </div>
          </div>
          {/* Route pill */}
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              borderRadius: "50px",
              padding: "8px 18px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              backdropFilter: "blur(8px)",
            }}
          >
            <span style={{ color: "#fff", fontSize: "15px", fontWeight: "700" }}>DEL</span>
            <span style={{ color: "#bfdbfe", fontSize: "18px" }}>✈</span>
            <span style={{ color: "#fff", fontSize: "15px", fontWeight: "700" }}>BOM</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            style={{
              background: "rgba(255,255,255,0.2)",
              border: "none",
              borderRadius: "50%",
              width: "36px",
              height: "36px",
              color: "#fff",
              fontSize: "18px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.background = "rgba(255,255,255,0.35)")}
            onMouseLeave={(e) => (e.target.style.background = "rgba(255,255,255,0.2)")}
          >
            ×
          </button>
        </div>

        {/* Flight Info Bar */}
        <div
          style={{
            background: "#f8fafc",
            borderBottom: "1px solid #e2e8f0",
            padding: "12px 28px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              background: "#ff6b00",
              borderRadius: "6px",
              padding: "4px 10px",
              color: "#fff",
              fontSize: "12px",
              fontWeight: "700",
            }}
          >
            Q
          </div>
          <span style={{ fontWeight: "600", color: "#1e293b" }}>Akasa Air</span>
          <span style={{ color: "#94a3b8" }}>•</span>
          <span style={{ color: "#64748b", fontSize: "14px" }}>Fri, 26 Jun 2026</span>
          <span style={{ color: "#94a3b8" }}>•</span>
          <span style={{ color: "#64748b", fontSize: "14px" }}>
            <strong style={{ color: "#1e293b" }}>06:50</strong> → <strong style={{ color: "#1e293b" }}>09:00</strong>
          </span>
          <span style={{ color: "#94a3b8" }}>•</span>
          <span
            style={{
              background: "#dcfce7",
              color: "#16a34a",
              borderRadius: "20px",
              padding: "2px 10px",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            2h 10m
          </span>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0",
            padding: "24px",
            gap: "16px",
          }}
        >
          {fareData.map((fare) => (
            <div
              key={fare.id}
              onClick={() => setSelected(fare.id)}
              style={{
                border: selected === fare.id
                  ? "2px solid #3b82f6"
                  : fare.highlight
                    ? "2px solid #e0e7ff"
                    : "2px solid #e2e8f0",
                borderRadius: "16px",
                overflow: "hidden",
                cursor: "pointer",
                background: fare.highlight ? "linear-gradient(160deg, #faf5ff 0%, #eff6ff 100%)" : "#fff",
                transform: selected === fare.id ? "translateY(-2px)" : "translateY(0)",
                boxShadow: selected === fare.id
                  ? "0 8px 30px rgba(59,130,246,0.2)"
                  : fare.highlight
                    ? "0 4px 20px rgba(99,102,241,0.1)"
                    : "0 2px 8px rgba(0,0,0,0.05)",
                transition: "all 0.25s ease",
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Selected ring pulse */}
              {selected === fare.id && (
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    background: "#3b82f6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ width: "8px", height: "8px", background: "#fff", borderRadius: "50%" }} />
                </div>
              )}

              {/* Badge */}
              {fare.badge && (
                <div
                  style={{
                    background: "linear-gradient(90deg, #7c3aed, #3b82f6)",
                    color: "#fff",
                    fontSize: "11px",
                    fontWeight: "700",
                    letterSpacing: "1px",
                    textAlign: "center",
                    padding: "5px 0",
                  }}
                >
                  ⭐ {fare.badge}
                </div>
              )}

              {/* Price Header */}
              <div style={{ padding: "16px 18px 12px" }}>
                <div style={{ fontSize: "11px", fontWeight: "600", color: "#94a3b8", letterSpacing: "1.2px", marginBottom: "4px" }}>
                  {fare.label}
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                  <span style={{ fontSize: "26px", fontWeight: "800", color: "#0f172a" }}>
                    ₹{fare.price.toLocaleString()}
                  </span>
                  <span style={{ fontSize: "12px", color: "#94a3b8" }}>/ adult</span>
                </div>
                {fare.originalPrice && (
                  <div style={{ fontSize: "12px", color: "#94a3b8", textDecoration: "line-through" }}>
                    ₹{fare.originalPrice.toLocaleString()}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: fare.highlight ? "#e0e7ff" : "#f1f5f9", margin: "0 18px" }} />

              {/* Content */}
              <div style={{ padding: "14px 18px", flex: 1 }}>
                {/* Baggage */}
                <Section title="Baggage">
                  <InfoRow icon={<CheckIcon />} text={`${fare.baggage.cabin} Cabin Baggage`} />
                  <InfoRow icon={<CheckIcon />} text={`${fare.baggage.checkin} Check-in Baggage`} />
                </Section>

                {/* Flexibility */}
                <Section title="Flexibility">
                  {fare.flexibility.map((f, i) => (
                    <InfoRow
                      key={i}
                      icon={f.type === "free" ? <CheckIcon /> : <WarnIcon />}
                      text={f.text}
                      color={f.type === "free" ? "#16a34a" : "#78350f"}
                    />
                  ))}
                </Section>

                {/* Seats & Meals */}
                <Section title="Seats & Meals">
                  {fare.seats.map((s, i) => (
                    <InfoRow
                      key={i}
                      icon={
                        s.type === "free"
                          ? <CheckIcon color="#7c3aed" />
                          : <WarnIcon />
                      }
                      text={s.text}
                      color={s.type === "free" ? "#7c3aed" : "#78350f"}
                    />
                  ))}
                </Section>

                {/* Benefits */}
                {fare.benefits.length > 0 && (
                  <div
                    style={{
                      background: "linear-gradient(135deg, #faf5ff, #eff6ff)",
                      border: "1px solid #ddd6fe",
                      borderRadius: "10px",
                      padding: "10px 12px",
                      marginTop: "10px",
                    }}
                  >
                    <div style={{ fontSize: "10px", fontWeight: "700", color: "#7c3aed", letterSpacing: "1px", marginBottom: "8px" }}>
                      🎁 BENEFITS INCLUDED
                    </div>
                    {fare.benefits.map((b, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#7c3aed", flexShrink: 0 }} />
                        <span style={{ fontSize: "12px", color: "#5b21b6", fontWeight: "500" }}>{b.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Drop */}
              <div style={{ padding: "12px 18px", borderTop: "1px solid #f1f5f9" }}>
                <label
                  style={{ display: "flex", alignItems: "flex-start", gap: "8px", cursor: "pointer" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    checked={priceDrop[fare.id]}
                    onChange={(e) =>
                      setPriceDrop((prev) => ({ ...prev, [fare.id]: e.target.checked }))
                    }
                    style={{ marginTop: "2px", accentColor: "#3b82f6", width: "14px", height: "14px" }}
                  />
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: "600", color: "#1e293b" }}>
                      🛡 Price Drop Protection <span style={{ color: "#3b82f6" }}>+₹199</span>
                    </div>
                    <div style={{ fontSize: "11px", color: "#64748b" }}>Get refund if fare drops</div>
                  </div>
                </label>
              </div>

              {/* Book Button */}
              <div style={{ padding: "0 18px 18px" }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBook(fare.id);
                  }}
                  style={{
                    width: "100%",
                    padding: "13px",
                    background:
                      booked === fare.id
                        ? "linear-gradient(135deg, #16a34a, #15803d)"
                        : fare.highlight
                          ? "linear-gradient(135deg, #3b82f6, #6366f1)"
                          : "linear-gradient(135deg, #1e3a8a, #3b82f6)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontWeight: "700",
                    cursor: "pointer",
                    letterSpacing: "0.5px",
                    transition: "all 0.25s",
                    boxShadow: fare.highlight
                      ? "0 4px 15px rgba(99,102,241,0.4)"
                      : "0 4px 12px rgba(30,58,138,0.3)",
                    transform: booked === fare.id ? "scale(0.98)" : "scale(1)",
                  }}
                >
                  {booked === fare.id ? "✓ Booking Confirmed!" : "BOOK NOW"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            background: "#f8fafc",
            borderTop: "1px solid #e2e8f0",
            padding: "14px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: "12px", color: "#94a3b8" }}>
            * Prices inclusive of taxes. Baggage policy subject to airline terms.
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <ShieldIcon />
            <span style={{ fontSize: "12px", color: "#0ea5e9", fontWeight: "600" }}>Secure Booking</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ── tiny helper components ──────────────────────────────────────────────────

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <div
        style={{
          fontSize: "10px",
          fontWeight: "700",
          color: "#94a3b8",
          letterSpacing: "1px",
          textTransform: "uppercase",
          marginBottom: "6px",
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {children}
      </div>
    </div>
  );
}

function InfoRow({ icon, text, color = "#374151" }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
      <div style={{ marginTop: "1px", flexShrink: 0 }}>{icon}</div>
      <span style={{ fontSize: "12px", color, lineHeight: "1.4" }}>{text}</span>
    </div>
  );
}