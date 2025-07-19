import { useNavigate } from "react-router-dom";
import "./style.MGround.css";

export default function MGround() {
  const name = localStorage.getItem("username");
  const navigate = useNavigate();

  return (
    <div className="luxury-landing">
      <div className="luxury-container">
        <div className="luxury-content">
          <h1 className="luxury-title">
            Welcome
            {name ? (
              <span className="luxury-username">, {name}</span>
            ) : ""}
            <span role="img" aria-label="wave" className="luxury-wave">👋</span>
          </h1>
          <p className="luxury-description">
            Experience a new level of cleanliness with our premium services.
          </p>
        </div>
        <div className="luxury-actions">
          <button
            onClick={() => navigate("/booking")}
            className="luxury-btn luxury-primary"
          >
            Book a Cleaning
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="luxury-btn luxury-secondary"
          >
            Go to Dashboard
          </button>
        </div>
        <div className="luxury-bubbles">
          {/* Elegant bubble positions */}
          <div className="luxury-bubble large" style={{ left: "8%", top: "18%", animationDelay: "0.5s" }}></div>
          <div className="luxury-bubble medium" style={{ left: "25%", top: "55%", animationDelay: "1.2s" }}></div>
          <div className="luxury-bubble small" style={{ left: "32%", top: "75%", animationDelay: "2.1s" }}></div>
          <div className="luxury-bubble large" style={{ left: "52%", top: "12%", animationDelay: "0.8s" }}></div>
          <div className="luxury-bubble medium" style={{ left: "65%", top: "62%", animationDelay: "1.5s" }}></div>
          <div className="luxury-bubble small" style={{ left: "78%", top: "32%", animationDelay: "2.4s" }}></div>
          <div className="luxury-bubble large" style={{ left: "88%", top: "68%", animationDelay: "1.8s" }}></div>
          <div className="luxury-bubble medium" style={{ left: "92%", top: "35%", animationDelay: "2.9s" }}></div>
        </div>
      </div>
    </div>
  );
}