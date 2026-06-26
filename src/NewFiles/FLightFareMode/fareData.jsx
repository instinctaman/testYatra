const fareData = [
  {
    id: "saver",
    label: "SAVER",
    badge: null,
    price: 8254,
    originalPrice: null,
    highlight: false,
    baggage: {
      cabin: "7 Kgs",
      checkin: "15 Kgs",
    },
    flexibility: [
      {
        type: "warn",
        text: "Cancellation fee ₹4999(upto 3 hrs before)",
      },
      {
        type: "warn",
        text: "Date Change fee ₹2,999 (upto 3 hrs before)",
      },
    ],
    seats: [
      {
        type: "charge",
        text: "Chargeable Seats",
      },
      {
        type: "charge",
        text: "Chargeable Meals",
      },
    ],
    benefits: [],
    priceDropProtection: true,
  },

  {
    id: "yatrab2b",
    label: "YATRAB2B",
    badge: null,
    price: 8254,
    originalPrice: 8682,
    highlight: true,
    baggage: {
      cabin: "7 Kgs",
      checkin: "15 Kgs",
    },
    flexibility: [
      {
        type: "warn",
        text: "Cancellation fee ₹4,999 (upto 3 hrs before)",
      },
      {
        type: "free",
        text: "Free Date Change",
      },
    ],
    seats: [
      {
        type: "charge",
        text: "Chargeable Seats",
      },
      {
        type: "charge",
        text: "Chargeable Meals",
      },
    ],
    benefits: [
      {
        text: "Free Date Change worth ₹99",
      },
      {
        text: "Trip Secure worth ₹329",
      },
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
    baggage: {
      cabin: "7 Kgs",
      checkin: "15 Kgs",
    },
    flexibility: [
      {
        type: "warn",
        text: "Lower Cancellation fee ₹3,499 (upto 3 hrs)",
      },
      {
        type: "warn",
        text: "Lower Date Change fee ₹999 (upto 3 hrs)",
      },
    ],
    seats: [
      {
        type: "free",
        text: "Free Seats",
      },
      {
        type: "free",
        text: "Complimentary Meals",
      },
    ],
    benefits: [],
    priceDropProtection: true,
  },
];

export default fareData;