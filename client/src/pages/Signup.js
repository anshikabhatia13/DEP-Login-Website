import Header from "../components/Header";
import Signup from "../components/Signup";
import signuplogo from '../icon4.png'
export default function SignupPage(){
    return(
        <>
            <Header
              heading={<span style={{ fontWeight: 'bold', fontStyle: 'normal', fontSize: '1.5rem', color: '#43424c',marginBottom: '-20%' }}>Signup to create an account</span>}
              paragraph="Already have an account? "
              linkName="Login"
              linkUrl="/"
              afterLoginImageSrc={signuplogo}
            afterLoginImageAlt="Signup Logo"
            />
            <Signup/>
        </>
    )
}