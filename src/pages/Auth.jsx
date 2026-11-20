
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

function Auth() {

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all required fields!");
      return;
    }

    if (!isLogin && !name.trim()) {
      alert("Please enter your name!");
      return;
    }

    if (password.length < 6) {
      alert("Password must contain at least 6 characters!");
      return;
    }

    const users = JSON.parse(
      localStorage.getItem("users") || "[]"
    );

    if (isLogin) {

      const user = users.find(
        item =>
          item.email === email &&
          item.password === password
      );

      if (!user) {
        alert("Invalid email or password!");
        return;
      }

      localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
      );

      alert("Login successful!");

    } else {

      const existingUser = users.find(
        item => item.email === email
      );

      if (existingUser) {
        alert("This email is already registered!");
        return;
      }

      const newUser = {
        name,
        email,
        password
      };

      users.push(newUser);

      localStorage.setItem(
        "users",
        JSON.stringify(users)
      );

      localStorage.setItem(
        "currentUser",
        JSON.stringify(newUser)
      );

      alert("Account created successfully!");

    }

    navigate("/");
  };

  return (

    <div className="auth-page">

      <div className="auth-card">

        <Link to="/" className="auth-logo">
          Shop<span>Ease</span>
        </Link>

        <h2>
          {isLogin ? "Welcome Back!" : "Create Your Account"}
        </h2>

        <p className="auth-subtitle">
          {isLogin
            ? "Login to continue shopping"
            : "Join ShopEase and start shopping"}
        </p>

        <form onSubmit={handleSubmit}>

          {!isLogin && (
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            {isLogin ? "Login" : "Sign Up"}
          </button>

        </form>

        <p className="auth-switch">

          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setName("");
              setEmail("");
              setPassword("");
            }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>

        </p>

        <Link to="/" className="auth-home">
          ← Back to Home
        </Link>

      </div>

    </div>
  );
}

export default Auth;
