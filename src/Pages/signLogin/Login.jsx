import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import './styles_login.css';

export default function Login() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!formData.username.trim() || !formData.email.trim()) {
      return alert("Please fill in all fields");
    }

    localStorage.setItem("username", formData.username);
    localStorage.setItem("email", formData.email);

    navigate("/dashboard");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="login-container">
      <div className="form-wrapper">
        <h2 className="form-title">Welcome Back</h2>
        <form onSubmit={handleLogin} className="form">
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
            Sign In
          </button>
        </form>

        <p className="signup-text">
          Don't have an account?{" "}
          <Link to="/signup" className="signup-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
