import Header from "../components/Header";
import Login from "../components/Login";
import './login.css';

export default function LoginPage() {
    return (
        <div className="login-page-container">
            <Header
                heading={<span style={{ fontWeight: 'bold', fontStyle: 'normal', fontSize: '2rem', color: '#333' }}>Login to Your Account</span>}
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
            />
            <Login />
        </div>
    );
}
