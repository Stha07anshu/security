import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { loginUserApi } from '../../api/Api';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './Login.css';


const Login = () => {
    // useState hooks for managing state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // error state
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate(); // Initialize useNavigate

    // validation function
    const validate = () => {
        let isValid = true;

        if (!email || !email.includes('@')) {
            setEmailError('Email is empty or invalid');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (!password.trim()) {
            setPasswordError('Password is empty');
            isValid = false;
        } else {
            setPasswordError('');
        }

        return isValid;
    };

    // handle login function
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setIsLoading(true);

        try {
            const data = { email, password };
            const res = await loginUserApi(data);

            if (res.data.success === false) {
                toast.error(res.data.message);
            } else {
                toast.success(res.data.message);
                localStorage.setItem('token', res.data.token);
                const convertedData = JSON.stringify(res.data.userData);
                localStorage.setItem('user', convertedData);
                navigate('/'); // Redirect to homepage
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='background'>
      
            <img src='https://www.budgetcarrental.in/wp-content/uploads/2021/10/car-loan-1.png' alt='Car 1' className='image1' />
            <img src='https://www.unicotaxi.com/images/solutions/rent_banner.png' alt='Car 2' className='image2' />
            <div className='container mt-5 pt-5 card-container'>
                <div className='row justify-content-center'>
                    <div className='col-lg-6 col-md-8 col-sm-10'>
                        <div className='card p-4'>
                            <h1 className='mb-4 text-center'>Login to your Account!</h1>
                            <form>
                                <div className='mb-3'>
                                    <label className='form-label'>Email Address</label>
                                    <input
                                        onChange={(e) => setEmail(e.target.value)}
                                        type='email'
                                        className='form-control'
                                        placeholder='Enter your email address'
                                    />
                                    {emailError && <p className='text-danger'>{emailError}</p>}
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label'>Password</label>
                                    <div className='input-group'>
                                        <input
                                            onChange={(e) => setPassword(e.target.value)}
                                            type={showPassword ? 'text' : 'password'}
                                            className='form-control'
                                            placeholder='Enter your password'
                                        />
                                        <button
                                            type='button'
                                            className='btn btn-outline-secondary'
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ? 'Hide' : 'Show'}
                                        </button>
                                    </div>
                                    {passwordError && <p className='text-danger'>{passwordError}</p>}
                                </div>
                                <button
                                    onClick={handleLogin}
                                    className='btn btn-dark mt-2 w-100'
                                    disabled={isLoading} // Disable button when loading
                                >
                                    {isLoading ? 'Logging in...' : 'Login'}
                                </button>
                            </form>
                            <div className='d-flex justify-content-end mt-3'>
                                <p>
                                    <Link to='/forgot-password'>Forgot Password?</Link>
                                </p>
                            </div>
                            <div className='text-center mt-3'>
                                <p>
                                    Don't have an account? <Link to='/register'>Register here</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
<ToastContainer />

export default Login;
