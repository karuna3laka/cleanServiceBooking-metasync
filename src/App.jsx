import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./Pages/signLogin/Login";
import Signup from "./Pages/signLogin/Signup";
import Dashboard from "./Pages/mainPage/Dashboard";
import MGround from "./Pages/mainPage/mGround";
import Booking from "./Pages/mainPage/Booking";
import './App.css'; // Assuming you have some global styles

import AdminDashboard from "./Pages/admin/AdminDashboard";



export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <header className="header">
        <div className="header-content">
          <h1>MSync-Cleaning</h1>
          <nav>
            <a href="/ground">Home</a>
            <a href="/booking">Booking</a>
            <a href="/dashboard">Dashboard</a>
          </nav>
        </div>
      </header>
      <main>
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
          <Route
            path="/admin"
            element={isAuthenticated ? <AdminDashboard /> : <Navigate to="/login" />}
          />

          
          
        </Routes>
      </main>
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 My Project. Mail - Kavindu.20230716@iit.ac.lk.</p>
          <div className="footer-links">
            <a href="/terms">Terms</a>
            <a href="/privacy">Privacy</a>
            <a href="/contact">Contact</a>
          </div>
        </div>
      </footer>
    </BrowserRouter>
  );
}