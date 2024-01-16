import Header from "../components/Header";
import Signup from "../components/Signup";

export default function SignupPage(){
    return(
        <>
            <Header
              heading={<span style={{ fontWeight: 'bold', fontStyle: 'normal', fontSize: '2rem', color: '#333' }}>Signup to create an account</span>}
              paragraph="Already have an account? "
              linkName="Login"
              linkUrl="/"
            />
            <Signup/>
        </>
    )
}