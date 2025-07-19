import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles_login.css';

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    name: "",
  });
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (!formData.username.trim() || !formData.email.trim() || !formData.name.trim()) {
      return alert("Please fill in all fields");
    }
    localStorage.setItem("username", formData.username);
    localStorage.setItem("email", formData.email);
    localStorage.setItem("name", formData.name);
    navigate("/ground");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="login-container">
      <div className="form-wrapper">
        <h2 className="form-title">Sign Up</h2>
        <form onSubmit={handleSignup} className="form">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input"
            />
          </div>
          <button type="submit" className="submit-button">
            Sign Up
          </button>
        </form>
        <p className="signup-text">
          Already have an account?{" "}
          <a href="/login" className="signup-link">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}