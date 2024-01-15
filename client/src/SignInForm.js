import React, { useState } from 'react';
import axios from 'axios';

const SigninForm = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleEmailSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/user/send-otp', { email });
      console.log(response.data);
      setIsEmailSent(true);
    } catch (error) {
      console.error('Error sending OTP:', error.message);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/user/verify-otp', { email, otp });
      console.log(response.data);
      // Handle the response as needed (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error('Error verifying OTP:', error.message);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      {!isEmailSent ? (
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button type="button" onClick={handleEmailSubmit}>
            Send OTP
          </button>
        </div>
      ) : (
        <div>
          <label>OTP:</label>
          <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
          <button type="button" onClick={handleOtpSubmit}>
            Verify OTP
          </button>
        </div>
      )}
    </div>
  );
};

export default SigninForm;
