import { useMemo, useState } from "react";
import { generateSeats, passengers as initialPassengers } from "../data/seats";

const useSeatSelection = (travellerData = initialPassengers) => {
  const createPassengers = () => travellerData.map((traveller, index) => ({
    id: index + 1,
    name: traveller.first ? `${traveller.first} ${traveller.last}` : `Adult ${index + 1}`,
    type: "Adult",
    seat: null,
  }));
  const [seats, setSeats] = useState(generateSeats());

  const [passengers, setPassengers] = useState(createPassengers);

  const [activePassengerId, setActivePassengerId] = useState(
    1
  );
 
  // Active Passenger
  const activePassenger = useMemo(() => {
    return passengers.find(
      (passenger) => passenger.id === activePassengerId
    );
  }, [passengers, activePassengerId]);

  // Change Active Passenger
  const selectPassenger = (id) => {
    setActivePassengerId(id);
  };

  // Seat Selection
  const selectSeat = (seatId) => {
    const clickedSeat = seats.find((seat) => seat.id === seatId);

    if (!clickedSeat) return;

    if (clickedSeat.occupied) return;

    // Seat already belongs to another passenger
    if (
      clickedSeat.passengerId &&
      clickedSeat.passengerId !== activePassengerId
    ) {
      return;
    }

    // Remove previous seat of active passenger
    const previousSeat = seats.find(
      (seat) => seat.passengerId === activePassengerId
    );

    let updatedSeats = [...seats];

    if (previousSeat) {
      updatedSeats = updatedSeats.map((seat) =>
        seat.id === previousSeat.id
          ? {
              ...seat,
              selected: false,
              passengerId: null,
            }
          : seat
      );
    }

    // Clicking same seat again removes it
    if (
      previousSeat &&
      previousSeat.id === clickedSeat.id
    ) {
      setSeats(updatedSeats);

      setPassengers((prev) =>
        prev.map((passenger) =>
          passenger.id === activePassengerId
            ? {
                ...passenger,
                seat: null,
              }
            : passenger
        )
      );

      return;
    }

    // Assign new seat
    updatedSeats = updatedSeats.map((seat) =>
      seat.id === clickedSeat.id
        ? {
            ...seat,
            selected: true,
            passengerId: activePassengerId,
          }
        : seat
    );

    setSeats(updatedSeats);

    setPassengers((prev) =>
      prev.map((passenger) =>
        passenger.id === activePassengerId
          ? {
              ...passenger,
              seat: clickedSeat.id,
            }
          : passenger
      )
    );
  };

  // Remove seat manually
  const removeSeat = (passengerId) => {
    const passenger = passengers.find(
      (item) => item.id === passengerId
    );

    if (!passenger?.seat) return;

    setSeats((prev) =>
      prev.map((seat) =>
        seat.id === passenger.seat
          ? {
              ...seat,
              selected: false,
              passengerId: null,
            }
          : seat
      )
    );

    setPassengers((prev) =>
      prev.map((item) =>
        item.id === passengerId
          ? {
              ...item,
              seat: null,
            }
          : item
      )
    );
  };

  // Reset Entire Seat Map
  const resetSelection = () => {
    setSeats(generateSeats());

    setPassengers(createPassengers());

    setActivePassengerId(1);
  };

  // Selected Seats
  const selectedSeats = useMemo(() => {
    return seats.filter((seat) => seat.selected);
  }, [seats]);

  // Total Price
  const totalAmount = useMemo(() => {
    return selectedSeats.reduce(
      (sum, seat) => sum + seat.price,
      0
    );
  }, [selectedSeats]);

  // GST
  const gst = useMemo(() => {
    return Math.round(totalAmount * 0.18);
  }, [totalAmount]);

  // Grand Total
  const grandTotal = useMemo(() => {
    return totalAmount + gst;
  }, [totalAmount, gst]);

  // Seats grouped by row
  const seatRows = useMemo(() => {
    const rows = {};

    seats.forEach((seat) => {
      if (!rows[seat.row]) rows[seat.row] = [];
      rows[seat.row].push(seat);
    });

    return rows;
  }, [seats]);

  return {
    seats,
    passengers,
    activePassenger,
    activePassengerId,
    seatRows,
    selectedSeats,
    totalAmount,
    gst,
    grandTotal,
    selectPassenger,
    selectSeat,
    removeSeat,
    resetSelection,
  };
};

export default useSeatSelection;
