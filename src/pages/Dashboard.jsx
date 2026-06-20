import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const navigate = useNavigate();
  const savedProfile = JSON.parse(localStorage.getItem("profile") || "{}");
  const username = localStorage.getItem("username") || savedProfile.name || "Traveller";
  const savedEmail = savedProfile.email || localStorage.getItem("email") || "";
  const [profile, setProfile] = useState({
    name: savedProfile.name || username,
    email: savedEmail,
    phone: savedProfile.phone || "",
    company: savedProfile.company || "",
    city: savedProfile.city || "",
    emailVerified: Boolean(savedProfile.emailVerified),
  });
  const [saveStatus, setSaveStatus] = useState("");
  const [emailOtp, setEmailOtp] = useState("");
  const [emailOtpStatus, setEmailOtpStatus] = useState("idle");
  const [emailLoading, setEmailLoading] = useState(false);

  const handleProfileChange = (e) => {
    const nextProfile = {
      ...profile,
      [e.target.name]: e.target.value,
    };

    if (e.target.name === "email") {
      nextProfile.emailVerified = false;
      setEmailOtp("");
      setEmailOtpStatus("idle");
    }

    setProfile({
      ...nextProfile,
    });
    setSaveStatus("");
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("profile", JSON.stringify(profile));
    localStorage.setItem("username", profile.name || "Traveller");
    setSaveStatus("Profile updated successfully");
  };

  const handleSendEmailOtp = async () => {
    if (!profile.email.trim()) {
      alert("Please enter your email first");
      return;
    }

    try {
      setEmailLoading(true);
      await api.post("/send-email-otp", {
        email: profile.email,
        allow_existing: true,
      });
      setEmailOtpStatus("sent");
      setEmailOtp("");
      setSaveStatus("OTP sent to your email");
    } catch (error) {
      alert(error.response?.data?.detail || "Failed to send OTP");
    } finally {
      setEmailLoading(false);
    }
  };

  const handleVerifyEmailOtp = async () => {
    if (!emailOtp.trim()) {
      alert("Please enter OTP");
      return;
    }

    try {
      setEmailLoading(true);
      await api.post("/verify-otp", {
        otp: emailOtp,
        type: "email",
        email: profile.email,
      });

      const verifiedProfile = {
        ...profile,
        emailVerified: true,
      };
      setProfile(verifiedProfile);
      localStorage.setItem("profile", JSON.stringify(verifiedProfile));
      setEmailOtp("");
      setEmailOtpStatus("verified");
      setSaveStatus("Email verified successfully");
    } catch (error) {
      alert(error.response?.data?.detail || "Invalid OTP");
    } finally {
      setEmailLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("profile");
    navigate("/");
  };

  return (
    <main className="dashboard-page dashboard-upgrade">
      <section className="dashboard-hero">
        <div className="dashboard-hero-copy">
          <p className="dashboard-eyebrow">Welcome back</p>
          <h1>Hi, {profile.name || username}</h1>
          <p className="dashboard-intro">
            Manage your traveller profile, review booking highlights, and keep
            your account ready for the next journey.
          </p>
          <div className="dashboard-actions">
            <button className="btn dashboard-primary-btn" type="button">
              <i className="bi bi-airplane"></i>
              New booking
            </button>
            <button
              className="btn dashboard-logout-btn"
              type="button"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right"></i>
              Logout
            </button>
          </div>
        </div>

        <div className="dashboard-summary">
          <article>
            <span>Trips planned</span>
            <strong>4</strong>
          </article>
          <article>
            <span>Upcoming bookings</span>
            <strong>2</strong>
          </article>
          <article>
            <span>Rewards earned</span>
            <strong>1,280</strong>
          </article>
        </div>
      </section>

      <section className="dashboard-content-grid">
        <article className="dashboard-card dashboard-profile-card">
          <div className="dashboard-card-heading">
            <div>
              <p className="dashboard-eyebrow">Account</p>
              <h2>Update profile</h2>
            </div>
            <div className="profile-avatar" aria-hidden="true">
              {(profile.name || username).charAt(0).toUpperCase()}
            </div>
          </div>

          <form className="profile-form" onSubmit={handleProfileSubmit}>
            <label>
              <span>Full name</span>
              <input
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                placeholder="Enter full name"
              />
            </label>
            <label className="profile-email-field">
              <span>Email</span>
              <div className="profile-email-row">
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  placeholder="name@example.com"
                />
                {profile.emailVerified ? (
                  <span className="email-verified-badge">
                    <i className="bi bi-check-circle-fill"></i>
                    Verified
                  </span>
                ) : (
                  <button
                    className="btn email-verify-btn"
                    type="button"
                    onClick={handleSendEmailOtp}
                    disabled={emailLoading}
                  >
                    {emailLoading ? "Sending..." : "Verify"}
                  </button>
                )}
              </div>
            </label>
            {!profile.emailVerified && emailOtpStatus === "sent" && (
              <div className="profile-otp-row">
                <input
                  type="text"
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value)}
                  placeholder="Enter email OTP"
                  inputMode="numeric"
                />
                <button
                  className="btn dashboard-primary-btn"
                  type="button"
                  onClick={handleVerifyEmailOtp}
                  disabled={emailLoading}
                >
                  {emailLoading ? "Checking..." : "Submit OTP"}
                </button>
              </div>
            )}
            <label>
              <span>Phone</span>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleProfileChange}
                placeholder="+91 98765 43210"
              />
            </label>
            <label>
              <span>Company</span>
              <input
                name="company"
                value={profile.company}
                onChange={handleProfileChange}
                placeholder="Company name"
              />
            </label>
            <label>
              <span>City</span>
              <input
                name="city"
                value={profile.city}
                onChange={handleProfileChange}
                placeholder="Delhi"
              />
            </label>

            <button className="btn dashboard-primary-btn" type="submit">
              Save profile
            </button>
            {saveStatus && <p className="profile-save-status">{saveStatus}</p>}
          </form>
        </article>

        <div className="dashboard-side-stack">
          <article className="dashboard-card">
            <h2>Recommended deals</h2>
            <p>Popular flight offers selected for your next trip.</p>
            <div className="deal-list">
              <div className="deal-item">
                <div>
                  <strong>Delhi to Mumbai</strong>
                  <p>From INR 3,499</p>
                </div>
                <button className="btn btn-primary">Book now</button>
              </div>
              <div className="deal-item">
                <div>
                  <strong>Bengaluru to Goa</strong>
                  <p>From INR 2,799</p>
                </div>
                <button className="btn btn-primary">Book now</button>
              </div>
            </div>
          </article>

          <article className="dashboard-card">
            <h2>Upcoming trip</h2>
            <p>Review your next itinerary and add travel extras.</p>
            <div className="trip-card">
              <div>
                <span>Route</span>
                <strong>Delhi to Bengaluru</strong>
              </div>
              <div>
                <span>Departure</span>
                <strong>17 Jun 2026</strong>
              </div>
              <div>
                <span>Passengers</span>
                <strong>1 Adult</strong>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
