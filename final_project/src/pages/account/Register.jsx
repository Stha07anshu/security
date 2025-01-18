import React, { useState } from 'react';
import { registerUserApi } from '../../api/Api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom'; 
import zxcvbn from 'zxcvbn'; 
import './Register.css';

const Register = () => {
    const navigate = useNavigate();

    // State variables
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // State for Error
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    // Password strength state
    const [passwordStrength, setPasswordStrength] = useState('');
    const [passwordStrengthColor, setPasswordStrengthColor] = useState('');
    const [strengthPercentage, setStrengthPercentage] = useState(0);

    // Password validation conditions
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const [hasUppercase, setHasUppercase] = useState(false);
    const [hasLowercase, setHasLowercase] = useState(false);
    const [hasSpecialChar, setHasSpecialChar] = useState(false);
    const [minLength, setMinLength] = useState(false);

    // State to check if password field is clicked or interacted with
    const [passwordClicked, setPasswordClicked] = useState(false);

    // Handle input changes
    const handleFirstname = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastname = (e) => {
        setLastName(e.target.value);
    };

    const handleEmail = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
        // Email regex validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailPattern.test(emailValue));
    };

    const handlePassword = (e) => {
        const pass = e.target.value;
        setPassword(pass);
        const result = zxcvbn(pass);

        // Set password strength based on score
        switch(result.score) {
            case 0:
            case 1:
                setPasswordStrength('Weak');
                setPasswordStrengthColor('red');
                setStrengthPercentage(25);
                break;
            case 2:
                setPasswordStrength('Medium');
                setPasswordStrengthColor('orange');
                setStrengthPercentage(50);
                break;
            case 3:
            case 4:
                setPasswordStrength('Strong');
                setPasswordStrengthColor('green');
                setStrengthPercentage(100);
                break;
            default:
                setPasswordStrength('');
                setPasswordStrengthColor('');
                setStrengthPercentage(0);
        }

        // Check for password strength conditions
        setHasNumber(/\d/.test(pass));
        setHasUppercase(/[A-Z]/.test(pass));
        setHasLowercase(/[a-z]/.test(pass));
        setHasSpecialChar(/[^A-Za-z0-9]/.test(pass));
        setMinLength(pass.length >= 8);
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

    // Validate function
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

        // API Request
        const data = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        };

        registerUserApi(data).then((res) => {
            if (res.data.success === true) {
                toast.success(res.data.message);
                navigate('/login'); 
            } else {
                toast.error(res.data.message);
            }
        }).catch((err) => {
            console.log(err);
            toast.error('Internal Server Error');
        });
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
                                    {isEmailValid && <p className='text-success'>✔ Valid Email</p>}
                                    {!isEmailValid && email && <p className='text-danger'>✘ Invalid Email</p>}
                                </div>
                                {/* Password */}
                                <div className='mb-3'>
                                    <label className='form-label'>Password</label>
                                    <div className="input-group">
                                        <input 
                                            onChange={handlePassword} 
                                            onFocus={() => setPasswordClicked(true)} 
                                            type={showPassword ? "text" : "password"} 
                                            className='form-control' 
                                            placeholder='Enter your password' 
                                        />
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
                                        <input 
                                            onChange={handleConfirmPassword} 
                                            type={showConfirmPassword ? "text" : "password"} 
                                            className='form-control' 
                                            placeholder='Enter your confirm password' 
                                        />
                                        <button className="btn btn-outline-secondary" type="button" onClick={toggleConfirmPasswordVisibility}>
                                            {showConfirmPassword ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                    {confirmPasswordError && <p className='text-danger'>{confirmPasswordError}</p>}
                                </div>
                                {passwordClicked && (
                                        <div>
                                            {/* Progress Bar */}
                                            <div className="progress mb-2">
                                                <div className={`progress-bar ${passwordStrengthColor}`} role="progressbar" style={{ width: `${strengthPercentage}%` }}></div>
                                            </div>

                                            {/* Password Strength Checklist */}
                                            <p>Your password must contain:</p>
                                            <ul>
                                                <li className={minLength ? 'text-success' : 'text-danger'}>✔ Minimum number of characters is 8.</li>
                                                <li className={hasLowercase ? 'text-success' : 'text-danger'}>✔ Should contain lowercase.</li>
                                                <li className={hasUppercase ? 'text-success' : 'text-danger'}>✔ Should contain uppercase.</li>
                                                <li className={hasNumber ? 'text-success' : 'text-danger'}>✔ Should contain numbers.</li>
                                                <li className={hasSpecialChar ? 'text-success' : 'text-danger'}>✔ Should contain special characters.</li>
                                            </ul>
                                        </div>
                                    )}

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
