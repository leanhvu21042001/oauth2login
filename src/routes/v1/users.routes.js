const express = require('express');
const router = express.Router();

// @route   GET api/v1/users/current
// @desc    Get current user.
// @access  private
router.get('/current', async (req, res) => {
  return res.json({ message: "get current user" });
});

module.exports = router;