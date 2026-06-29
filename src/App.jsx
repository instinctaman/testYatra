import { BrowserRouter } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import BookingApp from "./booking/BookingApp";
import SeatSelection from "./NewFiles/AeroPage/page/SeatSelection/SeatSelect";
// import <SeatSelect></Seat/Select> from "./NewFiles/AeroPage/page/SeatSelection/SeatSelect";
export default function App() {
  return (
    <BrowserRouter>
      <BookingApp />
      {/* <SeatSelection /> */}
    </BrowserRouter>
  );
}
