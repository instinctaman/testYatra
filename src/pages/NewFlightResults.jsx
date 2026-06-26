import React, { useState } from "react";
import SearchHeader from "../components/Header/SearchHeader";
import Filters from "../components/Filters/Filters";
import FlightList from "../components/Flights/FlightList";

function NewFlightResults() {
  const [filters, setFilters] = useState({
    stops: [],
    airlines: [],
    priceRange: 20000,
    departureTimes: []
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearchClick = () => {
    alert("🔍 Opening advanced search modal... (You can replace this with a real modal)");
  };

  const handleModifyClick = () => {
    alert("✏️ Going back to search page or opening full search bar");
    // You can implement scroll to top + expand full bar here
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <SearchHeader 
        onSearchClick={handleSearchClick} 
        onModifyClick={handleModifyClick} 
      />

      <div className="page-body">
        <Filters onFilterChange={handleFilterChange} />
        <div className="main-content">
          <FlightList filters={filters} />
        </div>
      </div>
    </>
  );
}

export default NewFlightResults;