const express = require('express');
const PostController = require('../../controllers/post.controller');
const router = express.Router();
const verifyJWT = require('../../middlewares/verifyJWT');

// @route   GET api/v1/posts
// @desc    Get all posts
// @access  private.
router.get('/', verifyJWT, PostController.GetPosts);

// @route   POST api/v1/posts
// @desc    Create a post.
// @access  private.
router.post('/', verifyJWT, PostController.CreatePost);

// @route   POST api/v1/posts
// @desc    Update a post.
// @access  private.
router.patch('/', verifyJWT, PostController.UpdatePost);

// @route   DELETE api/v1/posts
// @desc    Delete a post.
// @access  private.
router.delete('/', verifyJWT, PostController.DeletePost);


module.exports = router;