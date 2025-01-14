import React, { useState } from 'react';
import { verifyOtpApi } from '../api/Api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import './VerifyOtp.css'; // Make sure to create and import this CSS file if needed

const VerifyOtp = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();

    const handleVerifyOtp = async () => {
        try {
            const response = await verifyOtpApi(email, otp);
            if (response.data.success) {
                toast.success(response.data.message);
                navigate('/reset-password'); // Navigate to reset password page after successful OTP verification
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error('Error verifying OTP');
        }
    };

    return (
        <>
           
            <div className='verify-otp-container'>
            <div className='center-card'>
                <h1>Verify OTP</h1>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>OTP:</label>
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                </div>
                <button onClick={handleVerifyOtp}>Verify OTP</button>
                <img src='https://www.budgetcarrental.in/wp-content/uploads/2021/10/car-loan-1.png' alt='Car 1' className='image1' />
                <img src='https://www.unicotaxi.com/images/solutions/rent_banner.png' alt='Car 2' className='image2' />
            </div>
            ,<div />
            </div>
        </>
    );
};

export default VerifyOtp;
