// src/SignupForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SignupForm = () => {
  const navigate = useNavigate(); // Create a navigate function

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dateOfBirth: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:3000/user/signup', formData);

      console.log(response.data);

      // If signup is successful, redirect to the sign-in page
      if (response.data.status === 'SUCCESS') {
        navigate('/signin'); // Redirect to the sign-in page
      }

      // Handle other responses as needed
    } catch (error) {
      console.error('Error signing up:', error.message);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form>

        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} />

        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleInputChange} />

        <label>Date of Birth:</label>
        <input type="text" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} />

        <button type="button" onClick={handleSignup}>
          Signup
        </button>
        
      </form>
    </div>
  );
};

export default SignupForm;
