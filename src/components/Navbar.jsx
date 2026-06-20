import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "../assets/css/style.css";
import TravelLogo from "./TravelLogo";

export default function Navbar({ onLoginClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScrollTop.current && currentScroll > 100) {
        setHideNavbar(true);
      } else {
        setHideNavbar(false);
      }
      setIsScrolled(currentScroll > 50);
      lastScrollTop.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg sticky-top ${
          hideNavbar ? "navbar-hide" : ""
        } ${isScrolled ? "scrolled" : ""}`}
      >
        <div className="container-fluid">
          {/* <!-- Logo --> */}

          <a className="navbar-brand" href="#">
            <div className="logo">
              <TravelLogo
                bgColor={isScrolled ? "#FF0000" : "#FFFFFF"}
                iconColor={isScrolled ? "#FFFFFF" : "#FF0000"}
                textColor={isScrolled ? "#0F1B5F" : "#FFFFFF"}
              />
            </div>
          </a>
          {/* <!-- Right Side Controls --> */}
          <div className="d-flex align-items-center ms-auto order-lg-3">
            <div className="mob-btn d-flex align-items-center">
              <button
                className="btn my-btn me-2"
                onClick={onLoginClick}
                aria-label="Open login or register form"
              >
                <i className="bi bi-person-circle" aria-hidden="true"></i>
                <span className="d-none d-md-inline ms-2">Login/Register</span>
              </button>
            </div>
            {/* <!-- Mobile Toggle --> */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          {/* <!-- Navigation Links --> */}
          <div
            className="collapse navbar-collapse order-lg-2"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Flights
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Travel
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      <span className="slide-left">Hotels</span>
                    </a>
                  </li>
                  <li>{/* <hr className="dropdown-divider"> */}</li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <span className="slide-left">Trains</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard">
                  Dashboard
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
