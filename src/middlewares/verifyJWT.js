const jwt = require('jsonwebtoken');
require('dotenv').config();
const UserModel = require('../models/user.model');

const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

  const userByID = await UserModel.findOne_id(decoded?.id);

  if (userByID) {
    // remove secret info data
    delete userByID.hash_password
    delete userByID.refresh_token

    req.user = userByID;
    next();
  } else {
    throw new Error("Invalid token");
  }
}

module.exports = verifyJWT;