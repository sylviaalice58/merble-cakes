import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        `https://slyney2248.alwaysdata.net/api/reset-password/${token}`,
        { password}
      );

      if (response.data.success) {
        setMessage("Password updated successfully! Redirecting to login...");
        setTimeout(() => navigate("/signin"), 3000);
      } else {
        setError(response.data.message || "Failed to reset password");
      }
    } catch (error) {
      setError("Failed to reset password. Try again later.");
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#2e2d2d", padding: "20px" }}>
      <form onSubmit={handleSubmit} style={{ padding: "20px", backgroundColor: "#3a3838", borderRadius: "5px" }}>
        <h2 style={{ color: "#fff", marginBottom: "10px" }}>Reset Your Password</h2>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}
          required
        />
        <button type="submit" style={{ padding: "10px 20px", borderRadius: "5px" }}>Reset Password</button>
        {message && <p style={{ color: "lightgreen", marginTop: "10px" }}>{message}</p>}
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </form>
    </div>
  );
};

export default ResetPassword;