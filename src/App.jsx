import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";
import Landing from "./pages/Landing";
import Flight from "./pages/Flight";
import Navbar from "./components/Navbar";
import AirSearchUI from "./pages/AirSearchUI";
import FlightSearch from "./pages/FlightSearch";
import FlightResults from "./pages/FlightResults";
import FlightSearchBar from "./NewFiles/FlightSearchBar";
import NewFlightResults from "./NewFiles/NewFlightResults";
import FlightFareModal from "./NewFiles/FLightFareMode/FlightFareModel";
import TripDetails from "./NewFiles/TripDetails";

// Layout Component with Conditional Navbar
function AppContent() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const location = useLocation();

  const hideNavbarRoutes = [
    "/search-results",
    "/search-page",
    "/flight-results",
    "/air-search-ui1"
  ];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar onLoginClick={() => setIsLoginOpen(true)} />}

      <Routes>
        <Route path="/" element={<Landing />} />

        {/* Fixed this route */}
        <Route path="/login" element={<Navbar />} />

        <Route path="/flight" element={<Flight />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/air-search-ui" element={<AirSearchUI />} />
        <Route path="/air-search-ui1" element={<FlightSearch />} />
        <Route path="/flight-results" element={<FlightResults />} />

        <Route path="/search-page" element={<NewFlightResults />} />
        <Route path="/search-results" element={<NewFlightResults />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Fixed Auth Modal */}
      <Auth
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}     // ← Corrected
        showHero={false}
      />
    </>
  );
}

function App() {

  return (
    <BrowserRouter>
      {/* <AppContent /> */}
      {/* <FlightFareModal /> */}
      <TripDetails />
    </BrowserRouter>
  );
}

export default App;