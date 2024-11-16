import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, setupRecaptcha } from "../Firebase/Firebase";
import { signInWithPhoneNumber } from "firebase/auth";
import './Signup.css';

const Signup = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!/^\d{10}$/.test(mobile)) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }
    try {
      setupRecaptcha("recaptcha-container");
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        `+91${mobile}`,
        window.recaptchaVerifier
      );
      window.confirmationResult = confirmationResult;
      setIsOtpSent(true);
      setErrorMessage(""); // Clear error
      console.log("OTP sent successfully!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      setErrorMessage("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const confirmationResult = window.confirmationResult;
      await confirmationResult.confirm(otp);
      console.log("OTP verified successfully!");
      navigate("/subscription");
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setErrorMessage("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={isOtpSent ? handleVerifyOtp : handleSendOtp} className="signup-form">
        <h2>{isOtpSent ? "Verify OTP" : "Sign Up"}</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {!isOtpSent ? (
          <>
            <div className="form-group">
              <label htmlFor="mobile">Mobile Number:</label>
              <input
                id="mobile"
                type="text"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter your 10-digit mobile number"
                required
              />
            </div>
            <button type="submit" className="btn-signup-submit">Send OTP</button>
          </>
        ) : (
          <>
            <div className="form-group">
              <label htmlFor="otp">OTP:</label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter the OTP"
                required
              />
            </div>
            <button type="submit" className="btn-signup-submit">Verify OTP</button>
          </>
        )}
      </form>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Signup;
