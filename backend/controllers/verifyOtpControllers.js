const User = require('../models/userModels');

// Verify OTP controller function
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email, otp });

  if (!user || user.otpExpiry < Date.now()) {
    return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
  }

  user.otp = null;
  user.otpExpiry = null;
  await user.save();

  res.status(200).json({ success: true, message: 'OTP verified successfully' });
};

module.exports = {
  verifyOtp
};
