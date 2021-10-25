const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/user.controllers');
const upload = require('../../middlewares/upload');
const validateLogin = require('../../validation/loginRequest');
const validateRegister = require('../../validation/registerRequest');


// @route   GET api/v1/auth/register
// @desc    Register user
// @access  Public
router.post('/register', upload, validateRegister, UserController.Register);

// @route   GET api/v1/auth/login
// @desc    User login.
// @access  Public
router.post('/login', validateLogin, UserController.Login);

// @route   GET api/v1/auth/logout
// @desc    User logout.
// @access  Public
router.get('/logout', UserController.Logout);

// @route   GET api/v1/auth/refresh-token
// @desc    User refresh token.
// @access  Public
router.get('/refresh-token', UserController.RefreshToken);


module.exports = router;