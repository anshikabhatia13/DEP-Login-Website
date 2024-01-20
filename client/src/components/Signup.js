import React, { useState } from 'react';
import axios from 'axios';
import { signupFields } from "../constants/formFields";
import FormAction from "./FormAction";
import Input from "./Input";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormExtra from "./FormExtra";

<<<<<<< Updated upstream
const fields = signupFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);
  const [error, setError] = useState(null); // State for error message
  const navigate = useNavigate(); // Use useNavigate instead of useHistory



  const handleChange = (e) => setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
=======
const Signup = () => {
  const fields = signupFields;
  let fieldsState = {};
  fields.forEach(field => (fieldsState[field.id] = ''));

  const [signupState, setSignupState] = useState(fieldsState);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dateOfBirth: '',
  });

  const handleChange = (e) => {
    setSignupState({ ...signupState, [e.target.id]: e.target.value });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
>>>>>>> Stashed changes
    e.preventDefault();
    console.log(signupState);
    createAccount();
  };

<<<<<<< Updated upstream
  //handle Signup API Integration here
  const createAccount = () => {
    const transformedSignupState = {
      name: signupState['username'],
      email: signupState['email-address'],
      phone: signupState['phone-number'],
      address: signupState['address'],
      // Add other properties if needed
    };
  
    //make a post request to the backend
    axios.post('http://localhost:5000/user/signup', transformedSignupState)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          navigate('/verify');
        } else {
          console.log(response.data); // Log the response data
          // Check if the response indicates wrong OTP
          if (response.data.status === "WRONG_OTP") {
            // Redirect to the verify page for reentering OTP
            navigate('/verify');
            setError("Wrong OTP. Please reenter.");
          } else {
            // Redirect to login page for other errors
            navigate('/login');
            setError("An error occurred");
          }
        }

      })
      .catch((error) => {
        console.log(error);
        setError("An error occurred");
        navigate('/login');
      })
=======
  // handle Signup API Integration here
  const createAccount = async () => {
    try {
      const response = await axios.post('http://localhost:5000/user/signup', formData);
>>>>>>> Stashed changes

      // Handle the response from the backend
      console.log('Signup Response:', response.data);

<<<<<<< Updated upstream
  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="total-form">
        {
          fields.map(field =>
            <Input
              key={field.id}
              handleChange={handleChange}
              value={signupState[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />

          )
        }
        <div className='buttoncenter'><FormAction handleSubmit={handleSubmit} text="Send OTP" /></div>
        <FormExtra />
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

      </div>



    </form>
  )
}
=======
      // Assuming the backend responds with a status and message
      // Handle success (e.g., redirect, show a success message, etc.)

    } catch (error) {
      console.error('Signup Error:', error.message);
      // Handle errors (e.g., show an error message to the user)
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="total-form">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <div className='buttoncenter'><FormAction handleSubmit={handleSubmit} text="Send OTP" to="/verify" /></div>
        
      </div>
    </form>
  );
};

export default Signup;
>>>>>>> Stashed changes
