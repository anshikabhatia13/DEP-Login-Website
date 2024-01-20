import { useState } from 'react';
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import { useNavigate } from 'react-router-dom';
import './login.css';
import axios from 'axios'; // Import axios for making API requests

const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function Login() {
    const [loginState, setLoginState] = useState(fieldsState);
    const navigate = useNavigate(); // Use useNavigate instead of useHistory

    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        authenticateUser();
    }

    // Handle Login API Integration here
    const authenticateUser = () => {
        axios.post('http://localhost:5000/signin', loginState)
            .then((response) => {
                if (response.data.status === 'SUCCESS') {
                    // Redirect to 'verify' page
                    navigate('/verify');
                }
            })
            .catch((error) => {
                console.error('Error during login:', error);
                // Handle the error
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

            
            <div className='buttoncenter'><FormAction handleSubmit={handleSubmit} text="Send OTP"  /></div>
            <FormExtra />
        </form>
    );
}
