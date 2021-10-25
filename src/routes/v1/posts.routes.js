const express = require('express');
const router = express.Router();

// @route   GET api/v1/posts
// @desc    Get all posts
// @access  public.
router.get('/',  async function (req, res) {
  return res.json({ mgs: "Get all posts" });
});

// @route   POST api/v1/posts
// @desc    Create a posts.
// @access  private.
router.post('/', async function (req, res) {
  return res.json({ mgs: "Create post" });
});

// @route   POST api/v1/posts
// @desc    Create a posts.
// @access  private.
router.patch('/', async function (req, res) {
  return res.json({ mgs: "Update post" });
});

// @route   DELETE api/v1/posts
// @desc    Delete a posts.
// @access  private.
router.delete('/', async function (req, res) {
  return res.json({ mgs: "Delete post" });
});


module.exports = router;