const jwt = require("jsonwebtoken");
require('dotenv').config();

const generateAccessToken = (payload) => {
  return jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET, // || "your access token secret"
    { expiresIn: '5m' },
  );
}

const generateRefreshToken = (payload) => {
  return jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_SECRET, // || "your refresh token secret"
    { expiresIn: '1d' },
  );
}

const refreshVerify = (refreshToken, userByRefreshToken) => {
  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET, //  || "your refresh token secret"
    )
    if (userByRefreshToken.id !== decoded.id) return res.sendStatus(403);
    const payload = {
      id: userByRefreshToken.id,
      name: userByRefreshToken.name,
      email: userByRefreshToken.email,
      avatar: userByRefreshToken.avatar,
      created_at: userByRefreshToken.created_at,
    }
    const accessToken = generateAccessToken(payload);
    return accessToken;
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}
module.exports = {
  generateAccessToken,
  generateRefreshToken,
  refreshVerify,
};