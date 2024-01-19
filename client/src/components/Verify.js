import { useState } from 'react';
import { verifyFields } from "../constants/formFields";
import FormExtra from "./FormExtra";
import FormAction from "./FormAction";
import Input from "./Input";
import { useNavigate } from 'react-router-dom';
import './verify.css';
import axios from 'axios';

const fields=verifyFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');
export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);
    const navigate = useNavigate(); 

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        authenticateUser();
    }
    const transformedLoginState = {
        email: loginState['email-address'],
        otp: loginState['otp'],
        // Add other properties if needed
    };

    //Handle Login API Integration here
    const authenticateUser = () =>{
        axios.post('http://localhost:5000/user/verify-otp',transformedLoginState)
        .then((response)=>{
            console.log(response);
            //If the response is successful, redirect to the verify page
            if(response.data.status==="SUCCESS"){
                navigate('/home');
            }
            else{
                // navigate('/');
                //If the response is unsuccessful, display an error message
                // setLoginError(true);
            }
        }
        )
    }

    return(
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="-space-y-px">
            {
                fields.map(field=>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
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
            
  
        </div>

        {/* <FormExtra/> */}
        
        <div className='buttoncenter'><FormAction handleSubmit={handleSubmit} text="Confirm OTP"/>   </div>
        <FormExtra />

      </form>
    )
}