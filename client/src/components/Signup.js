import { useState } from 'react';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormExtra from "./FormExtra";

const fields = signupFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);
  const [error, setError] = useState(null); // State for error message
  const navigate = useNavigate(); // Use useNavigate instead of useHistory



  const handleChange = (e) => setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(signupState)
    await createAccount()
  }

  //handle Signup API Integration here
  const createAccount = async () => {
    // alert("Sending OTP");
    const transformedSignupState = {
      name: signupState['username'],
      email: signupState['email-address'],
      phone: signupState['phone-number'],
      address: signupState['address'],
    };

    //make a post request to the backend
    const response = await axios.post('http://localhost:5000/user/signup', transformedSignupState)
      .then((response) => {
        console.log(response);
        if (response.data.status === "PENDING") {
          
          navigate('/verify');
          setTimeout(() => {
            alert("OTP sent to your email");
          }, 200);

        } else if (response.data.message === "Email is already registered and verified") {
          alert("Email is already registered");
        }
        else if (response.data.message === "Email is already registered but not verified. Check inbox!") {
          alert("Email is already registered!");
        }
        else if (response.data.message === "Empty input field") {
          alert("Fill all the details please");
        }
        else if (response.data.message === "Invalid name entered") {
          alert("Invalid name");
        }
        else if (response.data.message === "Invalid email entered") {
          alert("Invalid email");
        }

      })
      .catch((error) => {
        console.log(error);
        setError("An error occurred");
        navigate('/login');
      })

  };

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
  );
}

