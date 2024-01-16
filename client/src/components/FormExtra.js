import React from 'react';

export default function FormExtra() {
    return (
        <div className="form-extra">
            <div className="checkbox-container">
                <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="checkbox-input"
                />
                <label htmlFor="remember-me" className="checkbox-label">
                    Remember me
                </label>
            </div>

            <div className="text-sm-container">
                <a href="#" className="text-link">
                    Resend OTP
                </a>
            </div>
        </div>
    );
}
