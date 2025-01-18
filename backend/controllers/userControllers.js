const userModel = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');

// **Rate Limiting**: Prevent brute-force login attempts
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts per window
    message: "Too many login attempts. Please try again later."
});

// Function to validate password complexity
function validatePassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    return passwordRegex.test(password);
}

// Function to hash password securely
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

// Function to compare password during login
async function comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
}

const createUser = async (req, res) => {
    console.log("Create user API hit");
    const { firstName, lastName, email, password, isAdmin } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !password) {
        return res.json({
            success: false,
            message: "Please enter all fields!"
        });
    }

    if (!validatePassword(password)) {
        return res.json({
            success: false,
            message: "Password must be 8-20 characters long, include uppercase, lowercase, numbers, and special characters."
        });
    }

    try {
        // Check if the user already exists
        const existingUser = await userModel.findOne({ email: email });
        if (existingUser) {
            return res.json({
                success: false,
                message: "User Already Exists!"
            });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Save the user in the database
        const newUser = new userModel({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            isAdmin: isAdmin || false
        });

        await newUser.save();

        // Send the success response
        res.json({
            success: true,
            message: "User Created Successfully!"
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Internal Server Error!"
        });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        return res.json({
            success: false,
            message: "Please enter all fields!"
        });
    }

    try {
        // Find user by email
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return res.json({
                success: false,
                message: "User Not Found!"
            });
        }

        // Check if the account is locked due to failed login attempts
        if (user.lockUntil && user.lockUntil > Date.now()) {
            return res.json({
                success: false,
                message: "Account locked. Please try again later."
            });
        }

        // Validate the password
        if (!await comparePassword(password, user.password)) {
            // Increment failed login attempts
            user.failedAttempts += 1;

            // Lock the account if failed attempts reach the threshold
            if (user.failedAttempts >= 10) {
                user.lockUntil = Date.now() + 15 * 60 * 1000; // Lock for 15 minutes
            }

            await user.save(); // Save the user with the updated failedAttempts and lockUntil

            return res.json({
                success: false,
                message: "Incorrect Password! Your account will be locked after 10 failed attempts."
            });
        }

        // Reset failed login attempts on successful login
        user.failedAttempts = 0;
        user.lockUntil = null; // Unlock the account
        await user.save();

        // Generate JWT token with expiration
        const token = jwt.sign(
            { id: user._id, is_admin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        // Send the token and userData to the user
        res.cookie('auth_token', token, { httpOnly: true, secure: true, maxAge: 3500000 });
        res.json({
            success: true,
            message: "Login Successful!",
            token: token,
            userData: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                isAdmin: user.isAdmin
            }
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Internal Server Error!"
        });
    }
};

module.exports = {
    createUser,
    loginUser,
    loginLimiter, // Export the rate limiter for use in your routes
};
