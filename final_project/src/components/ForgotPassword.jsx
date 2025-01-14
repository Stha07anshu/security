import React, { useState } from 'react';
import { sendOtpApi, verifyOtpApi, resetPasswordApi } from '../api/Api'; // Updated import path
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import './ForgotPassword.css'; // Make sure to create and import this CSS file if needed

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const navigate = useNavigate();

    const handleSendOtp = async () => {
        try {
            const response = await sendOtpApi(email);
            if (response.data.success) {
                toast.success(response.data.message);
                // If OTP sent successfully, navigate to Verify OTP page
                setOtpSent(true);
                navigate('/verify-otp'); // Navigate to verify-otp page
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error('Error sending OTP');
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await verifyOtpApi(email, otp);
            if (response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Error verifying OTP');
        }
    };

    const handleResetPassword = async () => {
        try {
            const response = await resetPasswordApi(email, newPassword);
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/login'); // Navigate to login page after successful password reset
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Error resetting password');
        }
    };

    return (
        <div>
        
            <div className='forgot-password-container'>
                <div className='center-card'> {/* Add a class for centering the card */}
                    <h1>Forgot Password</h1>
                    <div>
                        <label>Email:</label>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                        <button onClick={handleSendOtp}>Send OTP</button>
                    </div>
                    {otpSent && (
                        <div>
                            <label>OTP:</label>
                            <input 
                                type="text" 
                                value={otp} 
                                onChange={(e) => setOtp(e.target.value)} 
                            />
                            <button onClick={handleVerifyOtp}>Verify OTP</button>
                        </div>
                    )}
                    {otpSent && (
                        <div>
                            <label>New Password:</label>
                            <input 
                                type="password" 
                                value={newPassword} 
                                onChange={(e) => setNewPassword(e.target.value)} 
                            />
                            <button onClick={handleResetPassword}>Reset Password</button>
                        </div>
                    )}
                </div>
            </div>
            <img src='https://www.budgetcarrental.in/wp-content/uploads/2021/10/car-loan-1.png' alt='Car 1' className='image1' />
            <img src='https://www.unicotaxi.com/images/solutions/rent_banner.png' alt='Car 2' className='image2' />
        </div>
    );
};

export default ForgotPassword;
