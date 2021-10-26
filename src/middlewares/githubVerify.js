const axios = require("axios");
const GithubModel = require("../models/github.model");

const githubVerify = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.sendStatus(401);
    const accessToken = authHeader.split(' ')[1];

    // setup data & options to fetch user.
    const opts = {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      }
    };

    // get github user by access token
    const github_user = await axios.get('https://api.github.com/user', opts);

    const data = github_user.data;

    const getUser = await GithubModel.findOne_id(`${data.id}-${data.node_id}`);

    if (getUser) {
      req.userGithub = getUser;
      return next();
    } else {
      return res.status(401).json({ success: false, message: "User not found" });
    }

  } catch (err) {
    return next();
  }
}

module.exports = githubVerify;