import Header from "../components/Header"
import Verify from "../components/Verify"
import './login.css';
export default function VerifyPage(){
    return(
        <>
             <Header
                heading="Please Enter your OTP"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
                />
            <Verify/>
        </>
    )
}