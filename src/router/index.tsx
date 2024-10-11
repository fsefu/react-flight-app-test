import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import FlightDetails from "../pages/FlightDetails";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/flight/:id" element={<FlightDetails />} />
    </Routes>
  </Router>
);

export default AppRouter;
