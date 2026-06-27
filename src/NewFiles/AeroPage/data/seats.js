const columns = ["A", "B", "C", "D", "E", "F"];

const occupiedSeats = [
  "2B",
  "3E",
  "4A",
  "5C",
  "6F",
  "8D",
  "9B",
  "11A",
  "13E",
  "16C",
  "18D",
  "20A",
  "22F",
  "24B",
  "27E",
  "29A"
];

const premiumRows = [1, 2, 3, 4];

const exitRows = [12, 13];

const extraLegroomRows = [14];

export const generateSeats = () => {
  const seats = [];

  for (let row = 1; row <= 30; row++) {
    columns.forEach((column) => {
      let category = "standard";
      let price = 0;

      if (premiumRows.includes(row)) {
        category = "premium";
        price = 1200;
      }

      if (exitRows.includes(row)) {
        category = "exit";
        price = 999;
      }

      if (extraLegroomRows.includes(row)) {
        category = "extraLegroom";
        price = 899;
      }

      if (category === "standard") {
        price = 399;
      }

      seats.push({
        id: `${row}${column}`,
        row,
        column,

        position:
          column === "A" || column === "F"
            ? "window"
            : column === "C" || column === "D"
            ? "aisle"
            : "middle",

        category,

        available: !occupiedSeats.includes(`${row}${column}`),

        occupied: occupiedSeats.includes(`${row}${column}`),

        selected: false,

        passengerId: null,

        price
      });
    });
  }

  return seats;
};

export const passengers = [
  {
    id: 1,
    name: "Adult 1",
    type: "Adult",
    seat: null,
  },
  {
    id: 2,
    name: "Adult 2",
    type: "Adult",
    seat: null,
  },
  {
    id: 3,
    name: "Child 1",
    type: "Child",
    seat: null,
  },
];