const router = require('express').Router()

const express = require('express');
const nodemailer = require('nodemailer');
const User = require('../models/userModels');
const userControllers = require('../controllers/userControllers');
const sendOtpControllers = require('../controllers/sendOtpControllers'); 
const verifyOtpControllers = require('../controllers/verifyOtpControllers'); 
const resetPasswordControllers = require('../controllers/resetPasswordControllers'); 
// Make a create user API
router.post('/create', userControllers.createUser);

// Login user API
router.post('/login', userControllers.loginUser,userControllers.loginLimiter);

// // Send OTP route

router.post('/send-otp', sendOtpControllers.sendOtp);

// Verify OTP route
router.post('/verify-otp', verifyOtpControllers.verifyOtp);

// Reset Password route
router.post('/reset-password', resetPasswordControllers.resetPassword);



module.exports = router;

