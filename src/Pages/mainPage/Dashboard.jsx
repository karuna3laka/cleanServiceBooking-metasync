import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function Dashboard() {
  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    window.location.href = "/login";
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}