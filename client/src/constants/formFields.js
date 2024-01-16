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
        labelFor:"password",
        id:"password",
        name:"password",
        type:"password",
        autoComplete:"current-password",
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
        labelText:"Date of Birth",
        labelFor:"dateofbirth",
        id:"dateofbirth",
        name:"dateofbirth",
        type:"dateofbirth",
        autoComplete:"current-dateofbirth",
        isRequired:false,
        placeholder:"Date of Birth"   
    },
    
]

export {loginFields,signupFields, verifyFields}