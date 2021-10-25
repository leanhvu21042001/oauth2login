const express = require('express');
const router = express.Router();

// @route   GET api/v1/posts
// @desc    Get all posts
// @access  public.
router.get('/',  async function (req, res) {
  return res.json({ message: "Get all posts" });
});

// @route   POST api/v1/posts
// @desc    Create a post.
// @access  private.
router.post('/', async function (req, res) {
  return res.json({ message: "Create post" });
});

// @route   POST api/v1/posts
// @desc    Update a post.
// @access  private.
router.patch('/', async function (req, res) {
  return res.json({ message: "Update post" });
});

// @route   DELETE api/v1/posts
// @desc    Delete a post.
// @access  private.
router.delete('/', async function (req, res) {
  return res.json({ message: "Delete post" });
});


module.exports = router;