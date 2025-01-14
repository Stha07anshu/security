import React, { useState } from 'react';
import { resetPasswordApi } from '../api/Api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './ResetPassword.css'; // Make sure to create and import this CSS file if needed

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
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
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-lg-6 col-md-8 col-sm-10 reset-password-container'>
                        <h1>Reset Password</h1>
                        <div>
                            <label>Email:</label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>
                        <div>
                            <label>New Password:</label>
                            <input 
                                type="password" 
                                value={newPassword} 
                                onChange={(e) => setNewPassword(e.target.value)} 
                            />
                            <label>Confirm Password:</label>
                            <input 
                                type="password" 
                                value={confirmPassword} 
                                onChange={(e) => setConfirmPassword(e.target.value)} 
                            />
                            <button onClick={handleResetPassword}>Reset Password</button>
                        </div>
                    </div>
                </div>
            </div>
            <img src='https://www.budgetcarrental.in/wp-content/uploads/2021/10/car-loan-1.png' alt='Car 1' className='image1' />
            <img src='https://www.unicotaxi.com/images/solutions/rent_banner.png' alt='Car 2' className='image2' />
        </div>
    );
};

export default ResetPassword;
 