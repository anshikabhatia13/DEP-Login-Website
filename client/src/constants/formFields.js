const loginFields=[
    {
        labelText:"Email address",
        labelFor:"email-address",
        id:"email-address",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address"   
    }
]


const verifyFields=[
    {
        labelText:"Enter OTP",
        labelFor:"otp",
        id:"otp",
        name:"otp",
        type:"otp",
        autoComplete:"off",
        isRequired:true,
        placeholder:"Enter OTP" 
      
    },
]

const signupFields=[
    {
        labelText:"Username",
        labelFor:"username",
        id:"username",
        name:"username",
        type:"text",
        autoComplete:"username",
        isRequired:true,
        placeholder:"Username"   
    },
    {
        labelText:"Email address",
        labelFor:"email-address",
        id:"email-address",
        name:"email",
        type:"email",
        autoComplete:"email",
        isRequired:true,
        placeholder:"Email address"   
    },
    {
        labelText:"Phone Number",
        labelFor:"phone-number",
        id:"phone-number",
        name:"phone-number",
        type:"phone-number",
        autoComplete:"current-phone-number",
        isRequired:false,
        placeholder:"phone-number"   
    },
    {
        labelText:"Address",
        labelFor:"address",
        id:"address",
        name:"address",
        type:"address",
        autoComplete:"current-address",
        isRequired:false,
        placeholder:"Address"   
    },
    
]

export {loginFields,signupFields, verifyFields}