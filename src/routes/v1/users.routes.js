const express = require('express');
const verifyJWT = require('../../middlewares/verifyJWT');
const router = express.Router();

// @route   GET api/v1/users/current
// @desc    Get current user.
// @access  private
router.get('/current', verifyJWT, async (req, res) => {
  return res.json({
    success: true,
    message: "Get current user successfully!",
    data: req.user
  });
});

module.exports = router;