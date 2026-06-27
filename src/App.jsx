import { BrowserRouter } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import BookingApp from "./booking/BookingApp";

export default function App() {
  return (
    <BrowserRouter>
      <BookingApp />
    </BrowserRouter>
  );
}
