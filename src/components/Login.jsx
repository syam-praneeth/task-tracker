import { useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.trim() === "") {
      setError("Please enter a username");
      return;
    }

    // Store username in localStorage
    localStorage.setItem("username", username.trim());

    // Clear any errors
    setError("");

    // Call the onLogin callback to redirect to dashboard
    onLogin(username.trim());
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Welcome to TaskTracker</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              autoComplete="username"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
