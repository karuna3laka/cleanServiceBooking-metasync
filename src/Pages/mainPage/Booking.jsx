import { useState } from "react";
import "./Booking.css";

export default function Booking() {
  const [form, setForm] = useState({
    customer_name: localStorage.getItem("username") || "",
    address: "",
    date_time: "",
    service_type: "Deep Cleaning",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!form.customer_name.trim()) newErrors.customer_name = "Name is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.date_time) newErrors.date_time = "Date and time are required";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        alert("Booking created successfully!");
        setForm({
          customer_name: localStorage.getItem("username") || "",
          address: "",
          date_time: "",
          service_type: "Deep Cleaning",
        });
      } else {
        throw new Error("Failed to book");
      }
    } catch (error) {
      alert(error.message || "An error occurred while booking.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-container">
      <div className="form-wrapper">
        <h2 className="form-title">Book a Cleaning Service</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="customer_name" className="form-label">Name</label>
            <input
              id="customer_name"
              name="customer_name"
              value={form.customer_name}
              readOnly
              className="form-input form-input-readonly"
            />
            {errors.customer_name && <p className="form-error">{errors.customer_name}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="address" className="form-label">Address</label>
            <input
              id="address"
              name="address"
              placeholder="Enter your address"
              value={form.address}
              onChange={handleChange}
              className={`form-input ${errors.address ? 'border-red-500' : ''}`}
            />
            {errors.address && <p className="form-error">{errors.address}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="date_time" className="form-label">Date & Time</label>
            <input
              id="date_time"
              type="datetime-local"
              name="date_time"
              value={form.date_time}
              onChange={handleChange}
              className={`form-input ${errors.date_time ? 'border-red-500' : ''}`}
            />
            {errors.date_time && <p className="form-error">{errors.date_time}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="service_type" className="form-label">Service Type</label>
            <select
              id="service_type"
              name="service_type"
              value={form.service_type}
              onChange={handleChange}
              className="form-input"
            >
              <option value="Deep Cleaning">Deep Cleaning</option>
              <option value="Carpet Cleaning">Carpet Cleaning</option>
              <option value="Window Cleaning">Window Cleaning</option>
            </select>
          </div>
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Booking..." : "Book Now"}
          </button>
        </form>
      </div>
    </div>
  );
}