import React from 'react';
import homeOneImage from "../assets/ui/assets/img/menu/aeroplane.jfif";
import FilterCards from "./FilteredCards";


const flights = [
    {
        id: "vistara-214",
        airline: "Vistara",
        code: "UK 214",
        mark: "UK",
        from: "DEL",
        to: "BOM",
        depart: "06:30",
        arrive: "08:45",
        duration: "2h 15m",
        stops: "Non-stop",
        price: "INR 5,680",
        baggage: "15 kg",
        refund: "Free meal",
        badge: "Best value",
        accent: "bg-success",
        image: homeOneImage,
    },
    {
        id: "indigo-821",
        airline: "IndiGo",
        code: "6E 821",
        mark: "6E",
        from: "DEL",
        to: "BOM",
        depart: "09:10",
        arrive: "11:30",
        duration: "2h 20m",
        stops: "Non-stop",
        price: "INR 6,240",
        baggage: "15 kg",
        refund: "Flex fare",
        badge: "Fastest",
        accent: "bg-info",
        image: homeOneImage,
    },
    {
        id: "airindia-907",
        airline: "Air India",
        code: "AI 907",
        mark: "AI",
        from: "DEL",
        to: "BOM",
        depart: "13:40",
        arrive: "16:05",
        duration: "2h 25m",
        stops: "Non-stop",
        price: "INR 7,050",
        baggage: "25 kg",
        refund: "Priority bag",
        badge: "Premium",
        accent: "bg-primary",
        image: homeOneImage,
    },
];

const FilteredCards = () => {
    return (
        <div className="airkit-flight-list">
            {flights.map((flight) => (
                <FlightCard
                    key={flight.id}
                    flight={flight}
                    selected={selectedFlight === flight.id}
                    onSelect={setSelectedFlight}
                />
            ))}
        </div>
    )
}

export default FilteredCards;