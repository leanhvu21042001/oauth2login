const express = require('express');
const router = express.Router();

const users = require('./users.routes');
const posts = require('./posts.routes');
const auth = require('./auth.routes');

// users router
router.use("/users", users);

// posts router
router.use("/posts", posts);

// auth router
router.use("/auth", auth);


module.exports = router;