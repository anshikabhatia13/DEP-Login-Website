import Header from "../components/Header"
import Verify from "../components/Verify"
import './login.css';
export default function VerifyPage(){
    return(
        <>
             <Header
                heading={<span style={{ fontWeight: 'bold', fontStyle: 'normal', fontSize: '2rem', color: '#333' }}>Please Enter your OTP</span>}
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
                />
            <Verify/>
        </>
    )
}