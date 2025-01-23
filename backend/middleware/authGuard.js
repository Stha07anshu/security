const jwt = require('jsonwebtoken');

const authGuard = (req, res, next) => {
    console.log(req.headers);

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(400).json({
            success: false,
            message: 'Authorization header not found!',
        });
    }

    const token = authHeader.split(' ')[1];
    if (!token || token === '') {
        return res.status(400).json({
            success: false,
            message: 'Token not found!',
        });
    }

    try {
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedUser;
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Not Authenticated!',
        });
    }
};

// Admin guard to check for admin permissions
const adminGuard = (req, res, next) => {
    console.log('admin guard headers: ', req.headers);
    console.log('authorization: ', req.headers.authorization);

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(400).json({
            success: false,
            message: 'Authorization header not found!',
        });
    }

    const token = authHeader.split(' ')[1];
    if (!token || token === '') {
        return res.status(400).json({
            success: false,
            message: 'Token not found!',
        });
    }

    try {
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedUser;
        console.log('Decoded user: ', decodedUser);

        if (!req.user.is_admin) {
            return res.status(400).json({
                success: false,
                message: 'Permission Denied!',
            });
        }

        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(400).json({
            success: false,
            message: error.message || 'Not Authenticated!',
        });
    }
};

module.exports = {
    authGuard,
    adminGuard,
};
