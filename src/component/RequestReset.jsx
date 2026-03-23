import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RequestReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        "https://slyney2248.alwaysdata.net/api/request-reset",
        { email }
      );

      if (response.data.success) {
        setMessage(response.data.message);
      } else {
        setError(response.data.message || "Failed to send reset link");
      }
    } catch (err) {
      setError("Error sending reset link. Try again later.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#2e2d2d", padding: "20px" }}>
      <form onSubmit={handleSubmit} style={{ padding: "20px", backgroundColor: "#3a3838", borderRadius: "5px" }}>
        <h2 style={{ color: "#fff", marginBottom: "10px" }}>Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}
          required
        />
        <button type="submit" style={{ padding: "10px 20px", borderRadius: "5px" }}>Send Reset Link</button>
        {message && <p style={{ color: "lightgreen", marginTop: "10px" }}>{message}</p>}
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </form>
    </div>
  );
};

export default RequestReset;