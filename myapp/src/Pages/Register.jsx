import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isRegisterDisabled, setIsRegisterDisabled] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        `http://localhost:3000/register`,
        { name, email, password, otp },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res.data.message);
        navigate("/login"); // Redirect to login on success
      })
      .catch((err) => {
        toast.error(err.response?.data?.error || "Something went wrong");
      });
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsDisabled(value.trim() === ""); // Disable Send OTP button if email is empty
  };

  const handleSendOtp = () => {
    if (!email) {
      toast.warn("Please enter your email first");
      return;
    }

    axios
      .post("http://localhost:3000/sendOtp", { email })
      .then((res) => {
        toast.success(res.data.message);
        setIsOtpSent(true); 
      })
      .catch((err) => {
        toast.error(err.response?.data?.error || "Failed to send OTP");
      });
  };

  const handleInputChange = () => {
    setIsRegisterDisabled(
      !name.trim() || !email.trim() || !password.trim() || !otp.trim()
    );
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
      <ToastContainer position="top-center" />
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Register</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="name" style={{ display: "block", marginBottom: "5px" }}>Name:</label>
          <input
            type="text"
            id="name"
            onChange={(e) => {
              setName(e.target.value);
              handleInputChange();
            }}
            value={name}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: "5px" }}>Email:</label>
          <input
            type="email"
            id="email"
            onChange={(e) => {
              handleEmailChange(e);
              handleInputChange();
            }}
            value={email}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="password" style={{ display: "block", marginBottom: "5px" }}>Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
              handleInputChange();
            }}
            value={password}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <button
          className="btn btn-secondary"
          disabled={isDisabled}
          type="button"
          onClick={handleSendOtp}
          style={{ width: "100%", marginBottom: "15px", padding: "10px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: isDisabled ? "not-allowed" : "pointer" }}
        >
          Send OTP
        </button>

        {isOtpSent && (
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="otp" style={{ display: "block", marginBottom: "5px" }}>OTP:</label>
            <input
              type="text"
              id="otp"
              onChange={(e) => {
                setOtp(e.target.value);
                handleInputChange();
              }}
              value={otp}
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={isRegisterDisabled}
          style={{ width: "100%", padding: "10px", backgroundColor: isRegisterDisabled ? "#ccc" : "#28a745", color: "#fff", border: "none", borderRadius: "4px", cursor: isRegisterDisabled ? "not-allowed" : "pointer" }}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
