const express = require('express');
const router = express.Router();

const users = require('./users.routes');
const posts = require('./posts.routes');

// users router
router.use("/users", users);

// users router
router.use("/posts", posts);


module.exports = router;