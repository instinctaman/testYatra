import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    // <FilterPanel />
    <BrowserRouter>
      <Navbar onLoginClick={() => setIsLoginOpen(true)} />

      <Routes>
        <Route
          path="/"
          element={<Landing onLoginClick={() => setIsLoginOpen(true)} />}
        />
        <Route path="/flight" element={<Flight />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/air-search-ui" element={<AirSearchUI />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/air-search-ui1" element={<FlightSearch />} />
        <Route path="/flight-results" element={<FlightResults />} />
      </Routes>

      <Auth
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        showHero={false}
      />
    </BrowserRouter>
  );
}

export default App;
