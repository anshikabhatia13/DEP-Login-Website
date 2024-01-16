import { useState } from 'react';
import { verifyFields } from "../constants/formFields";
import FormExtra from "./FormExtra";
import FormAction from "./FormAction";
import Input from "./Input";
import './verify.css';

const fields=verifyFields;
let fieldsState = {};
fields.forEach(field=>fieldsState[field.id]='');

export default function Login(){
    const [loginState,setLoginState]=useState(fieldsState);

    const handleChange=(e)=>{
        setLoginState({...loginState,[e.target.id]:e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        authenticateUser();
    }

    //Handle Login API Integration here
    const authenticateUser = () =>{

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
        
        <div className='buttoncenter'><FormAction handleSubmit={handleSubmit} text="Confirm OTP" to="/home"/>   </div>
        

      </form>
    )
}