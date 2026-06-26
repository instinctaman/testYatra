// mockApi.js
let mockDataVersion = 0; // Yeh change hone par force update karega

export const fetchTripData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      mockDataVersion++; // Har call par version badhega

      const tripData = {
        origin: "New Delhi",
        destination: "kolkata",
        totalDuration: "5h 35m",
        baseFare: 5628,
        fees: 1849,
        discounts: 1375,
        initialTotalAmount: 7102,
        segments: [
          {
            flightNumber: `AI-2715`,
            aircraft: "Airbus A220-212",
            departure: { 
              time: "11:40", 
              date: "Sat, 27 Jun 26", 
              airport: "DEL", 
              terminal: "T-3" 
            },
            arrival: { 
              time: "13:20", 
              date: "Sat, 27 Jun 26", 
              airport: "AMD", 
              terminal: "T-2" 
            },
            duration: "1h 40m",
            fareType: "Economy | Value"
          },
          {
            flightNumber: `AI-9557`,
            aircraft: "Airbus A220-100",
            departure: { 
              time: "15:40", 
              date: "Sat, 27 Jun 26", 
              airport: "AMD", 
              terminal: "T-2" 
            },
            arrival: { 
              time: "17:15", 
              date: "Sat, 27 Jun 26", 
              airport: "BOM", 
              terminal: "T-2" 
            },
            duration: "1h 25m",
            fareType: "Economy | Value"
          }
        ]
      };

      console.log(`✅ API Data Loaded - Version ${mockDataVersion}`);
      resolve(tripData);
    }, 800);
  });
};

// Extra Helper Function (Test ke liye)
export const updateMockData = (newData) => {
  // Agar future mein aap dynamic banana chahte ho
  console.log("Mock data updated:", newData);
};