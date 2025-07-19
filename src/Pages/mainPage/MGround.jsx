import { useNavigate } from "react-router-dom";
import "./style.MGround.css";

export default function MGround() {
  const name = localStorage.getItem("username");
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <h1 className="welcome-title">Welcome, {name || "Guest"} 👋</h1>
        <p className="welcome-subtitle">Your journey to a sparkling clean space starts here!</p>
        <div className="button-group">
          <button
            onClick={() => navigate("/booking")}
            className="action-button primary-button"
          >
            Book a Cleaning
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="action-button secondary-button"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}