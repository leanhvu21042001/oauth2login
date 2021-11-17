const express = require('express');
const verifyJWT = require('../../middlewares/verifyJWT');
const router = express.Router();

// @route   GET api/v1/users/current
// @desc    Get current user.
// @access  private
router.get('/current', async (req, res) => {
    let user = req?.user;
    if (req.userGithub) {
        user = req.userGithub;
    }
    delete user.index_row
    return res.json({
        success: true,
        message: "Get current user successfully!",
        data: user
    });
});

module.exports = router;