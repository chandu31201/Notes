const express = require('express');
const router = express.Router();
const { signupUser, loginUser, getMe } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/auth/signup
router.post('/signup', signupUser);

// @route   POST /api/auth/login
router.post('/login', loginUser);

// @route   GET /api/auth/me
// @desc    Get current user profile (for client to verify token and get user data)
router.get('/me', protect, getMe);

module.exports = router;
