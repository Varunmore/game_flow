import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, setupRecaptcha } from "../Firebase/Firebase";
import { signInWithPhoneNumber } from "firebase/auth";
import OtpInput from "react-otp-input";  // OTP input library
import "./Signup.css";

const Signup = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle sending OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(mobile)) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      setIsLoading(true);

      // Setup and initialize Recaptcha
      setupRecaptcha("recaptcha-container");

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        `+91${mobile}`,
        window.recaptchaVerifier
      );

      window.confirmationResult = confirmationResult;
      setIsOtpSent(true);
      setErrorMessage("");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error sending OTP:", error);
      setErrorMessage("Failed to send OTP. Please try again.");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setErrorMessage("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const confirmationResult = window.confirmationResult;
      await confirmationResult.confirm(otp);
      navigate("/subscription");  // Redirect to subscription page on success
    } catch (error) {
      setErrorMessage("Invalid OTP. Please try again.");
      console.error("Error verifying OTP:", error);
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
            <button type="submit" className="btn-signup-submit" disabled={isLoading}>
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        ) : (
          <>
            <div className="form-group">
              <label htmlFor="otp">Enter OTP:</label>
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                separator={<span>-</span>}
                isInputNum
                containerStyle="otp-container"
                inputStyle="otp-input"
              />
            </div>
            <button type="submit" className="btn-signup-submit">
              Verify OTP
            </button>
          </>
        )}
      </form>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default Signup;
