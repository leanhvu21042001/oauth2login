const express = require('express');
const router = express.Router();

// @route   GET api/v1/auth/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
  return res.json({ mgs: "Register" });
});

// @route   GET api/v1/auth/login
// @desc    User login.
// @access  Public
router.post('/login', async (req, res) => {
  return res.json({ mgs: "Login" });
});

// @route   GET api/v1/auth/logout
// @desc    User logout.
// @access  Public
router.get('/logout', async (req, res) => {
  return res.json({ mgs: "Login" });
});

// @route   GET api/v1/auth/refresh-token
// @desc    User refresh token.
// @access  Public
router.get('/refresh-token', async (req, res) => {
  return res.json({ mgs: "Login" });
});


module.exports = router;