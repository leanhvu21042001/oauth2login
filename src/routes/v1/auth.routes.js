const express = require('express');
const router = express.Router();
const AuthController = require('../../controllers/auth.controllers');
const AuthGithubController = require('../../controllers/github.controller');
const upload = require('../../middlewares/upload');
const validateLogin = require('../../validation/loginRequest');
const validateRegister = require('../../validation/registerRequest');


// @route   GET api/v1/auth/register
// @desc    Register user
// @access  Public
router.post('/register', upload, validateRegister, AuthController.Register);

// @route   GET api/v1/auth/login
// @desc    User login.
// @access  Public
router.post('/login', validateLogin, AuthController.Login);

// @route   GET api/v1/auth/logout
// @desc    User logout.
// @access  Public
router.get('/logout', AuthController.Logout);

// @route   GET api/v1/auth/refresh-token
// @desc    User refresh token.
// @access  Public
router.get('/refresh-token', AuthController.RefreshToken);


// @route   GET api/v1/auth/login/github
// @desc    SignIn with github.
// @access  Public
router.get('/login/github', AuthGithubController.GithubLogin);

// @route   GET api/v1/auth/login/github/callback
// @desc    SignIn with github.
// @access  Public
router.get('/login/github/callback', AuthGithubController.GithubCallback);

module.exports = router;