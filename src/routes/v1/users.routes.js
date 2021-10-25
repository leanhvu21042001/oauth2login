const express = require('express');
const router = express.Router();

// @route   GET api/v1/users/register
// @desc    Register user
// @access  Public
router.post('/register', async (req, res) => {
  return res.json({ mgs: "Register" });
});


// @route   GET api/v1/users/login
// @desc    User login.
// @access  Public
router.post('/login', async (req, res) => {
  return res.json({ mgs: "Login" });
});


// @route   GET api/v1/users/current
// @desc    Get current user.
// @access  private
router.get('/current', async (req, res) => {
  return res.json({ mgs: "get current user" });
});

module.exports = router;