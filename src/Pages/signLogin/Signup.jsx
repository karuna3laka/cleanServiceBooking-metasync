import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import './login-signup.css';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", age: "", occupation: "", address: ""
  });
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password, age, occupation, address } = formData;
    if (!name || !email || !password || !age || !occupation || !address) {
      return alert("Please fill in all fields");
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      await setDoc(doc(db, "users", userCredential.user.uid), {
        full_name: name,
        email,
        age: parseInt(age),
        occupation,
        permanent_address: address,
      });
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("username", email);
      navigate("/ground");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="page-container">
      <div className="form-wrapper">
        <h2 className="form-title">Sign Up</h2>
        <form onSubmit={handleSignup} className="form">
          {["name", "email", "password", "age", "occupation", "address"].map((field) => (
            <div className="form-group" key={field}>
              <label htmlFor={field} className="form-label">
                {field === "name" ? "Full Name" : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "password" ? "password" : field === "age" ? "number" : "text"}
                name={field}
                id={field}
                className="form-input"
                placeholder={`Enter your ${field}`}
                value={formData[field]}
                onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                required
              />
            </div>
          ))}
          <button type="submit" className="submit-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
