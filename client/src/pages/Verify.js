import Header from "../components/Header"
import Verify from "../components/Verify"
import './login.css';
import signuplogo from '../verify.png'
export default function VerifyPage(){
    return(
        <>
             <Header
                heading={<span style={{ fontWeight: 'bold', fontStyle: 'normal', fontSize: '1.5rem', color: '#43424c',marginBottom: '-20%' }}>Please Enter your OTP</span>}
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
                afterLoginImageSrc={signuplogo}
                afterLoginImageAlt="Signup Logo"
                />
            <Verify/>
        </>
    )
}