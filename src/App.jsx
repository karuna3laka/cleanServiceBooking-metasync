import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/signLogin/Login";
import Signup from "./Pages/signLogin/Signup";
import Dashboard from "./Pages/mainPage/Dashboard";

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
      </Routes>
    </BrowserRouter>
  );
}
