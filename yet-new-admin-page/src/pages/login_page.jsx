import React, { useState } from "react";
import { useLoginMutation } from "../app/api/apiSlice"; // Import the login mutation hook
import "../styles/LoginPage.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  // Use the login mutation hook
  const [login, { isLoading, isError, error, isSuccess }] = useLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ "email": email, "password": password }).unwrap();
      console.log(response.token); // Now response is defined, and you can access token
      // Store the token if needed (e.g., in localStorage or Redux)
      localStorage.setItem('token', response.token);  // Example of storing token in localStorage
      // Redirect or navigate to the admin dashboard page
      navigate("/schedules");  // Assuming you're using react-router for navigation
    } catch (error) {
      console.error('Login failed:', error);
      // Handle error (e.g., show an error message to the user)
    }
    
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>Login</button>

        {isError && <p className="error-message">Login failed: {error.message}</p>}
        {isSuccess && <p className="success-message">Login successful!</p>}
      </form>
    </div>
  );
};

export default LoginPage;
