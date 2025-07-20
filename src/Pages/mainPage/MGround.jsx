// src/Pages/mainPage/MGround.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import "./style.MGround.css";
import backgroundImage from "../../assets/pexels-karolina-grabowska-4239031.jpg";

export default function MGround() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setName(data.full_name || "");
            setIsAdmin(data.isAdmin === true);
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
      setAuthChecked(true);
    });

    return () => unsubscribe();
  }, []);

  const handleAdminRedirect = () => {
    window.location.href = "http://localhost:3071/admin";
  };

  return (
    <div className="posh-landing" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="posh-overlay"></div>

      {isAdmin && (
        <div className="admin-banner">
          <span className="admin-banner-text">Admin Access Granted</span>
          <div className="admin-banner-glow"></div>
        </div>
      )}

      {/* Button that redirects to /admin */}
      <button
        onClick={handleAdminRedirect}
        className="admin-corner-btn"
        title="Go to Admin Dashboard"
      >
        <span className="admin-icon">🔐</span>
        <span className="admin-tooltip">Admin Dashboard</span>
      </button>

      <div className="posh-glass-container">
        <div className="posh-content">
          <div className="posh-header">
            <h1 className="posh-title">
              Welcome{name && <span className="posh-username">, {name}</span>}
              <span className="posh-wave">👋</span>
            </h1>
            <p className="posh-description">
              Experience unparalleled digital excellence with our premium services.
            </p>
          </div>

          <div className="posh-stats">
            <div className="posh-stat-card">
              <div className="stat-number">240+</div>
              <div className="stat-label">Elite Projects</div>
              <div className="stat-divider"></div>
            </div>
            <div className="posh-stat-card satisfaction-card">
              <div className="satisfaction-ring">
                <svg className="progress-ring" width="80" height="80">
                  <circle
                    className="progress-ring-circle"
                    stroke="#34C759"
                    strokeWidth="4"
                    strokeDasharray="226"
                    strokeDashoffset="18"
                    fill="transparent"
                    r="36"
                    cx="40"
                    cy="40"
                  />
                </svg>
                <div className="stat-number">92%</div>
              </div>
              <div className="stat-label">Client Satisfaction</div>
              <div className="stat-divider"></div>
            </div>
          </div>
        </div>

        <div className="posh-actions">
          <button onClick={() => navigate("/booking")} className="posh-btn posh-primary">
            <span className="btn-icon">✨</span>
            Get Started
          </button>
          <button onClick={() => navigate("/dashboard")} className="posh-btn posh-secondary">
            <span className="btn-icon">📊</span>
            Dashboard
          </button>
        </div>
      </div>

      <div className="posh-bubbles">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="posh-bubble"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 60 + 20}px`,
              height: `${Math.random() * 60 + 20}px`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
