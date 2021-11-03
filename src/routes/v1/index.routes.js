const express = require('express');
const router = express.Router();

const users = require('./users.routes');
const posts = require('./posts.routes');
const auth = require('./auth.routes');
const githubVerify = require('../../middlewares/githubVerify');
const verifyJWT = require('../../middlewares/verifyJWT');

// auth router
router.use("/auth", auth);

// users router
router.use("/users", githubVerify, verifyJWT, users);

// posts router
router.use("/posts", githubVerify, verifyJWT, posts);

module.exports = router;