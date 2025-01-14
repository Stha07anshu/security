import React, { useState } from 'react';
import { registerUserApi } from '../../api/Api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Register.css'; // Import the CSS file

const Register = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    // State variables
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for confirm password visibility

    // State for Error
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    // Handle input changes
    const handleFirstname = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastname = (e) => {
        setLastName(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Toggle confirm password visibility
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    // Validation function
    const validate = () => {
        let isValid = true;
        if (firstName.trim() === '') {
            setFirstNameError('Firstname is Required');
            isValid = false;
        }

        if (lastName.trim() === '') {
            setLastNameError('Lastname is Required');
            isValid = false;
        }

        if (email.trim() === '') {
            setEmailError('Email is Required');
            isValid = false;
        }

        if (password.trim() === '') {
            setPasswordError('Password is Required');
            isValid = false;
        }

        if (confirmPassword.trim() === '') {
            setConfirmPasswordError('Confirm Password is Required');
            isValid = false;
        }

        if (password.trim() !== confirmPassword.trim()) {
            setConfirmPasswordError('Password does not match');
            isValid = false;
        }

        return isValid;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        const isValid = validate();
        if (!isValid) {
            return;
        }

        // Making Api Request
        // Making JSON Object of register data
        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        };

        registerUserApi(data).then((res) => {
            // Success :true/false, Message
            if (res.data.success === true) {
                toast.success(res.data.message);
                navigate('/login'); 
            } else {
                toast.error(res.data.message);
            }
        }).catch((err) => {
            console.log(err)
            toast.error('Internal Server Error')
        })
    };

    return (
        <div className='background'>
            {/* Background images */}
            <img src='https://www.budgetcarrental.in/wp-content/uploads/2021/10/car-loan-1.png' alt='Car 1' className='image1' />
            <img src='https://www.unicotaxi.com/images/solutions/rent_banner.png' alt='Car 2' className='image2' />
            <div className='container mt-5 pt-5 card-container'>
                <div className='row justify-content-center'>
                    <div className='col-lg-6 col-md-8 col-sm-10'>
                        <div className='card p-4'>
                            <h1 className='mb-4 text-center'>Create an Account</h1>
                            <form>
                                {/* Firstname */}
                                <div className='mb-3'>
                                    <label className='form-label'>Firstname</label>
                                    <input onChange={handleFirstname} type="text" className='form-control' placeholder='Enter your firstname' />
                                    {firstNameError && <p className='text-danger'>{firstNameError}</p>}
                                </div>
                                {/* Lastname */}
                                <div className='mb-3'>
                                    <label className='form-label'>Lastname</label>
                                    <input onChange={handleLastname} type="text" className='form-control' placeholder='Enter your lastname' />
                                    {lastNameError && <p className='text-danger'>{lastNameError}</p>}
                                </div>
                                {/* Email Address */}
                                <div className='mb-3'>
                                    <label className='form-label'>Email Address</label>
                                    <input onChange={handleEmail} type="email" className='form-control' placeholder='Enter your email address' />
                                    {emailError && <p className='text-danger'>{emailError}</p>}
                                </div>
                                {/* Password */}
                                <div className='mb-3'>
                                    <label className='form-label'>Password</label>
                                    <div className="input-group">
                                        <input onChange={handlePassword} type={showPassword ? "text" : "password"} className='form-control' placeholder='Enter your password' />
                                        <button className="btn btn-outline-secondary" type="button" onClick={togglePasswordVisibility}>
                                            {showPassword ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                    {passwordError && <p className='text-danger'>{passwordError}</p>}
                                </div>
                                {/* Confirm Password */}
                                <div className='mb-3'>
                                    <label className='form-label'>Confirm Password</label>
                                    <div className="input-group">
                                        <input onChange={handleConfirmPassword} type={showConfirmPassword ? "text" : "password"} className='form-control' placeholder='Enter your confirm password' />
                                        <button className="btn btn-outline-secondary" type="button" onClick={toggleConfirmPasswordVisibility}>
                                            {showConfirmPassword ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                    {confirmPasswordError && <p className='text-danger'>{confirmPasswordError}</p>}
                                </div>
                                {/* Submit Button */}
                                <button onClick={handleSubmit} className='btn btn-dark mt-2 w-100'>Create Account</button>
                            </form>
                            <div className='text-center mt-3'>
                                <p>Already have an account? <Link to="/login">Login here</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
