import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css"; // Create this for admin-specific styling

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllBookings();
  }, []);

  const fetchAllBookings = async () => {
    try {
      const idToken = await auth.currentUser.getIdToken();
      const res = await fetch("http://localhost:5000/admin/bookings", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      if (!res.ok) throw new Error("Not authorized or failed to fetch");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (booking) => {
    setEditingId(booking.id);
    setEditForm({
      ...booking,
      date_time: booking.date_time?.slice(0, 16),
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (id) => {
    try {
      const idToken = await auth.currentUser.getIdToken();
      const res = await fetch(`http://localhost:5000/bookings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) throw new Error("Update failed");
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, ...editForm } : b))
      );
      setEditingId(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCancel = () => setEditingId(null);

  return (
    <div className="admin-dashboard-container">
      <h2>Admin Dashboard - All Bookings</h2>
      {loading ? (
        <p>Loading bookings...</p>
      ) : (
        <table className="admin-bookings-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Service</th>
              <th>Date & Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id}>
                <td>{b.customer_name}</td>
                <td>{b.customer_email}</td>
                <td>{b.address}</td>
                <td>
                  {editingId === b.id ? (
                    <select
                      name="service_type"
                      value={editForm.service_type}
                      onChange={handleEditChange}
                    >
                      <option value="Deep Cleaning">Deep Cleaning</option>
                      <option value="Carpet Cleaning">Carpet Cleaning</option>
                      <option value="Window Cleaning">Window Cleaning</option>
                    </select>
                  ) : (
                    b.service_type
                  )}
                </td>
                <td>
                  {editingId === b.id ? (
                    <input
                      type="datetime-local"
                      name="date_time"
                      value={editForm.date_time}
                      onChange={handleEditChange}
                    />
                  ) : (
                    b.date_time
                  )}
                </td>
                <td>
                  {editingId === b.id ? (
                    <select
                      name="status"
                      value={editForm.status}
                      onChange={handleEditChange}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  ) : (
                    b.status
                  )}
                </td>
                <td>
                  {editingId === b.id ? (
                    <>
                      <button onClick={() => handleSave(b.id)}>Save</button>
                      <button onClick={handleCancel}>Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => handleEditClick(b)}>Edit</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="admin-home-btn" onClick={() => navigate("/ground")}>
        Back to Home
      </button>
    </div>
  );
}
