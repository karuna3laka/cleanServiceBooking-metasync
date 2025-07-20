import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import './login-signup.css';

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) return alert("Please fill in all fields");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("username", email);
      navigate("/ground");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="page-container">
      <div className="form-wrapper">
        <h2 className="form-title">Welcome Back</h2>
        <form onSubmit={handleLogin} className="form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" name="email" id="email" className="form-input" placeholder="Enter your email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" name="password" id="password" className="form-input" placeholder="Enter your password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
          </div>
          <button type="submit" className="submit-button">Sign In</button>
        </form>
        <p className="signup-text">
          Don't have an account? <Link to="/signup" className="signup-link">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
