// src/Pages/mainPage/Dashboard.js
import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import "./Dashboard.css";

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    service_type: "",
    date_time: "",
    status: "",
  });

  useEffect(() => {
    const username = localStorage.getItem("username");
    const isAuthenticated = localStorage.getItem("isAuthenticated");

    if (username && isAuthenticated && auth.currentUser) {
      setUserData({ username });
      fetchUserBookings(auth.currentUser.uid);
    } else {
      window.location.href = "/login";
    }
  }, []);

  const fetchUserBookings = async (userId) => {
    try {
      const idToken = await auth.currentUser.getIdToken();
      const response = await fetch(`http://localhost:5000/bookings/${userId}`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      } else {
        throw new Error("Failed to fetch bookings");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setLoading(false);
    }
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

  const handleCancelBooking = async (id) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        const idToken = await auth.currentUser.getIdToken();
        const response = await fetch(`http://localhost:5000/bookings/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
        if (response.ok) {
          setBookings(bookings.filter((booking) => booking.id !== id));
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to cancel booking");
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const handleEditClick = (booking) => {
    setEditingId(booking.id);
    setEditForm({
      service_type: booking.service_type,
      date_time: booking.date_time.slice(0, 16), // Adjust for datetime-local
      status: booking.status,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = async (id) => {
    try {
      const idToken = await auth.currentUser.getIdToken();
      const response = await fetch(`http://localhost:5000/bookings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(editForm),
      });
      if (response.ok) {
        setBookings(
          bookings.map((booking) =>
            booking.id === id ? { ...booking, ...editForm } : booking
          )
        );
        setEditingId(null);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update booking");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
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
          <div className="bookings-list">
            <table>
              <thead>
                <tr>
                  <th>Service</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                  <th>Edit</th>
                  <th>Cancel</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>
                      {editingId === booking.id ? (
                        <select
                          name="service_type"
                          value={editForm.service_type}
                          onChange={handleEditChange}
                          className="edit-select"
                        >
                          <option value="Deep Cleaning">Deep Cleaning</option>
                          <option value="Window Cleaning">Window Cleaning</option>
                          <option value="Carpet Cleaning">Carpet Cleaning</option>
                        </select>
                      ) : (
                        booking.service_type
                      )}
                    </td>
                    <td>
                      {editingId === booking.id ? (
                        <input
                          type="datetime-local"
                          name="date_time"
                          value={editForm.date_time}
                          onChange={handleEditChange}
                          className="edit-input"
                        />
                      ) : (
                        booking.date_time
                      )}
                    </td>
                    <td>
                      {editingId === booking.id ? (
                        <select
                          name="status"
                          value={editForm.status}
                          onChange={handleEditChange}
                          className="edit-select"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span className={`status ${booking.status.toLowerCase()}`}>
                          {booking.status}
                        </span>
                      )}
                    </td>
                    <td>
                      {editingId === booking.id ? (
                        <button
                          onClick={() => handleSaveEdit(booking.id)}
                          className="save-btn"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEditClick(booking)}
                          className="edit-btn"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                    <td>
                      {editingId === booking.id ? (
                        <button
                          onClick={handleCancelEdit}
                          className="cancel-edit-btn"
                        >
                          Cancel
                        </button>
                      ) : (
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="cancel-btn"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}