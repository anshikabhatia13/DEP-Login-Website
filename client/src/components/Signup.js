import { useState } from 'react';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const fields = signupFields;
let fieldsState = {};

fields.forEach(field => fieldsState[field.id] = '');

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory



  const handleChange = (e) => setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signupState)
    createAccount()
  }

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
        }

      })
      .catch((error) => {
        console.log(error);
      })

  }

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

      </div>



    </form>
  )
}