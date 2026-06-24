import React from 'react'
import flightImage from "../assets/ui/assets/img/menu/flight.jpg";
import hotelImage from "../assets/ui/assets/img/menu/hotel.jpg";
import tourImage from "../assets/ui/assets/img/menu/tour.jpg";
import cruiseImage from "../assets/ui/assets/img/menu/cruise.jpg";

const services = [
    {
        title: "Flights",
        count: "420 routes",
        icon: "isax-airplane",
        image: flightImage,
        active: true,
    },
    {
        title: "Hotels",
        count: "18k stays",
        icon: "isax-building-3",
        image: hotelImage,
    },
    {
        title: "Packages",
        count: "95 tours",
        icon: "isax-map",
        image: tourImage,
    },
    {
        title: "Cruises",
        count: "36 sailings",
        icon: "isax-ship",
        image: cruiseImage,
    },
];


const CategoryCards = () => {
    return (
        <section className="airkit-service-strip">
            <div className="container">
                <div className="row g-3">
                    {services.map((item) => (
                        <div className="col-xl-3 col-md-6" key={item.title}>
                            <div className={`hotel-type-item d-flex align-items-center ${item.active ? "active" : ""}`}>
                                <span className="avatar avatar-lg">
                                    <img src={item.image} className="rounded-circle" alt="" />
                                </span>
                                <div className="ms-2">
                                    <h6 className="fs-16 fw-medium">{item.title}</h6>
                                    <p className="fs-14">{item.count}</p>
                                </div>
                                <i className={`isax ${item.icon} ms-auto`} aria-hidden="true"></i>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CategoryCards;