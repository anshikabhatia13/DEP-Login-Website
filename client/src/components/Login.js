import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { useNavigate } from 'react-router-dom';
import './login.css';
import axios from 'axios';

const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Login() {
    const [loginState, setLoginState] = useState(fieldsState);
    const [loginError, setLoginError] = useState(false); // New state variable
    const navigate = useNavigate(); 
    const transformedLoginState = {
        email: loginState['email-address'],
        // Add other properties if needed
    };

    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticateUser();
    }

    // Handle Login API Integration here
    const authenticateUser =async () => {

        // Make a post request to the backend
        const response= await axios.post('http://localhost:5000/user/signin', transformedLoginState)
            .then((response) => {
                // console.log(response);
                // If the response is successful, redirect to the verify page
                if (response.data.status === "PENDING") {
                    navigate('/verify');
                    setTimeout(() => {
                      alert("OTP sent to your email");
                    }, 200); 
                    //print on page that otp is sent

                }
                else if(response.data.message === "Invalid Credentials entered!") {
                    // If the response is unsuccessful, display an error message
                    alert("No such user exists. Register first")
                    setLoginError(true);
                }

            }
            )
            .catch((error) => {
                console.log(error);
                // Handle errors, e.g., display an error message to the user
            });
    };


    return (
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="-space-y-px">
                {fields.map(field =>
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
                )}
            </div>

            
            <div className='buttoncenter'><FormAction handleSubmit={handleSubmit} text="Send OTP" /></div>
            <FormExtra />
        </form>
    );
}
