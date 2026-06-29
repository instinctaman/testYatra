import React from "react";
import { useNavigate } from "react-router-dom";
import "./Ticket.css";

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
          <div
            className="sb-barcode"
            style={{
              position: "relative",
              paddingBottom: "15px",
              marginLeft: "20px",
            }}
          >
            <div
              className="barcode-lines"
              style={{
                display: "flex",
                height: "45px",
                width: "140px",
                alignItems: "stretch",
              }}
            >
              <span
                style={{ background: "#000", width: "3px", marginRight: "1px" }}
              ></span>
              <span
                style={{ background: "#000", width: "1px", marginRight: "2px" }}
              ></span>
              <span
                style={{ background: "#000", width: "4px", marginRight: "1px" }}
              ></span>
              <span
                style={{ background: "#000", width: "2px", marginRight: "1px" }}
              ></span>
              <span
                style={{ background: "#000", width: "1px", marginRight: "3px" }}
              ></span>
              <span
                style={{ background: "#000", width: "3px", marginRight: "1px" }}
              ></span>
              <span
                style={{ background: "#000", width: "2px", marginRight: "2px" }}
              ></span>
              <span
                style={{ background: "#000", width: "4px", marginRight: "1px" }}
              ></span>
              <span
                style={{ background: "#000", width: "1px", marginRight: "1px" }}
              ></span>
              <span
                style={{ background: "#000", width: "3px", marginRight: "2px" }}
              ></span>
              <span
                style={{ background: "#000", width: "2px", marginRight: "1px" }}
              ></span>
              <span
                style={{ background: "#000", width: "4px", marginRight: "1px" }}
              ></span>
              <span
                style={{ background: "#000", width: "1px", marginRight: "2px" }}
              ></span>
              <span
                style={{ background: "#000", width: "3px", marginRight: "1px" }}
              ></span>
            </div>
            <small
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "100%",
                textAlign: "center",
                fontFamily: "monospace",
                fontSize: "10px",
                fontWeight: "bold",
                letterSpacing: "2px",
              }}
            >
              {pnrNumber}
            </small>
          </div>
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

export default Ticket;
