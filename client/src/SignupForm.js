// Import necessary dependencies
import React, { useState } from 'react';

// Create a functional component for Signup
const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');

  const handleSignup = async () => {
    try {
      // Step 1: Submit the signup form
      const signupResponse = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          dateOfBirth: dob,
          password,
        }),
      });

      const signupResult = await signupResponse.json();

      if (signupResult.status === 'SUCCESS') {
        // Step 2: Submit the OTP for verification
        const verifyOtpResponse = await fetch(`/verify-otp/${signupResult.data._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            otp,
          }),
        });

        const verifyOtpResult = await verifyOtpResponse.json();

        if (verifyOtpResult.status === 'SUCCESS') {
          alert('Account verified successfully!');
        } else {
          alert(`OTP verification failed: ${verifyOtpResult.message}`);
        }
      } else {
        alert(`Signup failed: ${signupResult.message}`);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label htmlFor="dob">Date of Birth:</label>
        <input type="date" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <label htmlFor="otp">OTP:</label>
        <input type="text" id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} required />

        <button type="button" onClick={handleSignup}>Signup</button>
      </form>
    </div>
  );
};

// Export the Signup component
export default Signup;
