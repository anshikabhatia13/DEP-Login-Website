import { useState } from 'react';
import { signupFields } from "../constants/formFields"
import FormAction from "./FormAction";
import Input from "./Input";
import FormExtra from "./FormExtra";
import './signup.css';
import axios from 'axios';
const fields=signupFields;
let fieldsState={};

fields.forEach(field => fieldsState[field.id]='');

export default function Signup(){
  const [signupState,setSignupState]=useState(fieldsState);

  const handleChange=(e)=>setSignupState({...signupState,[e.target.id]:e.target.value});

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(signupState)
    createAccount()
  }

  
const createAccount = async () => {
    try {
      const response = await axios.post('http://localhost:5000/signup', signupState);
      console.log(response.data);
      // Handle success or redirect to the next page
    } catch (error) {
      console.error('Error creating account:', error);
      // Handle error
    }
  };
  

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="total-form">
        {
                fields.map(field=>
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
            
            <div className='buttoncenter'><FormAction handleSubmit={handleSubmit} text="Send OTP" to="/verify"/></div>
            <FormExtra />
        </div>

         

      </form>
    )
}