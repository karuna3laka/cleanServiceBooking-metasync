import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import "./Dashboard.css";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user data from localStorage
    const username = localStorage.getItem("username");
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    
    if (username && isAuthenticated) {
      setUserData({ username });
      // In a real app, you would fetch user-specific data here
      fetchUserBookings();
    } else {
      window.location.href = "/login";
    }
  }, []);

  const fetchUserBookings = () => {
    // Simulate API call to fetch bookings
    setTimeout(() => {
      setBookings([
        {
          id: 1,
          service: "Deep Cleaning",
          date: "2026-11-15",
          time: "10:59 AM",
          status: "Pending"
        },
        {
          id: 2,
          service: "Window Cleaning",
          date: "2023-11-20",
          time: "02:00 PM",
          status: "Pending"
        },
        {
          id: 3,
          service: "Window Cleaning",
          date: "2023-11-20",
          time: "02:00 PM",
          status: "Pending"
        }
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("username");
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleCancelBooking = (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      setBookings(bookings.filter(booking => booking.id !== id));
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="user-info">
          <h1>Welcome, {userData?.username}</h1>
          <p>Here are your upcoming bookings</p>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>

      <main className="dashboard-main">
        {bookings.length === 0 ? (
          <div className="no-bookings">
            <p>You don't have any bookings yet.</p>
            <button className="book-now-btn">Book a Service</button>
          </div>
        ) : (
          <div className="bookings-grid">
            {bookings.map((booking) => (
              <div key={booking.id} className="booking-card">
                <div className="booking-info">
                  <h3>{booking.service}</h3>
                  <p><strong>Date:</strong> {booking.date}</p>
                  <p><strong>Time:</strong> {booking.time}</p>
                  <p className={`status ${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </p>
                </div>
                <div className="booking-actions">
                  <button 
                    onClick={() => handleCancelBooking(booking.id)}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}