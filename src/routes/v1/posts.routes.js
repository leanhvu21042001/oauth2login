const express = require('express');
const PostController = require('../../controllers/post.controller');
const router = express.Router();

// @route   GET api/v1/posts
// @desc    Get all posts
// @access  private.
router.get('/', PostController.GetPosts);

// @route   POST api/v1/posts
// @desc    Create a post.
// @access  private.
router.post('/', PostController.CreatePost);

// @route   POST api/v1/posts
// @desc    Update a post.
// @access  private.
router.patch('/', PostController.UpdatePost);

// @route   DELETE api/v1/posts
// @desc    Delete a post.
// @access  private.
router.delete('/', PostController.DeletePost);


module.exports = router;