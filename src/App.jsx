import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/signLogin/Login";
import Signup from "./Pages/signLogin/Signup";
import Dashboard from "./Pages/mainPage/Dashboard";
import MGround from "./Pages/mainPage/mGround";
import Booking from "./Pages/mainPage/Booking"; 



export default function App() {
  const isAuthenticated = !!localStorage.getItem("username");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/ground"
          element={isAuthenticated ? <MGround /> : <Navigate to="/login" />}
        />
        <Route
          path="/booking"
          element={isAuthenticated ? <Booking /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
