import Header from "../components/Header";
import Login from "../components/Login";
import './login.css';
import signuplogo from '../icon2.png'

export default function LoginPage() {
    return (
        <div className="login-page-container">
            <Header
                heading={<span style={{ fontWeight: 'bold', fontStyle: 'normal', fontSize: '1.5rem', color: '#43424c', marginBottom: '-20%' }}>Login to Your Account</span>}
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
                afterLoginImageSrc={signuplogo}
                afterLoginImageAlt="Signup Logo"
                
            />
            <Login />
        </div>
    );
}
