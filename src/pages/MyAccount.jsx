
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./MyAccount.css";

function MyAccount() {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("currentUser") || "null"
      );
    } catch {
      return null;
    }
  });

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || ""
  });

  if (!user) {
    return (
      <div className="account-container">
        <h2>Please Login First</h2>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const updatedUser = {
      ...user,
      name: formData.name.trim(),
      email: formData.email.trim()
    };

    // Update current logged-in user
    localStorage.setItem(
      "currentUser",
      JSON.stringify(updatedUser)
    );

    // Update user in registered users list
    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    const updatedUsers = users.map((item) =>
      item.email === user.email
        ? updatedUser
        : item
    );

    localStorage.setItem(
      "users",
      JSON.stringify(updatedUsers)
    );

    setUser(updatedUser);
    setIsEditing(false);

    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="account-container">
      <div className="account-card">
        <h1>My Account</h1>

        <div className="profile-icon">👤</div>

        {isEditing ? (
          <>
            <h2>Edit Your Profile</h2>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

            <button
              className="account-btn"
              onClick={handleSave}
            >
              Save Changes
            </button>

            <button
              className="cancel-btn"
              onClick={() => {
                setFormData({
                  name: user.name,
                  email: user.email
                });
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <h2>Welcome, {user.name}!</h2>

            <div className="account-details">
              <p>
                <strong>Name:</strong> {user.name}
              </p>

              <p>
                <strong>Email:</strong> {user.email}
              </p>
            </div>

            <button
              className="account-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>

            <Link to="/orders" className="account-btn">
              My Orders
            </Link>

            <Link to="/" className="account-btn">
              Continue Shopping
            </Link>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default MyAccount;
