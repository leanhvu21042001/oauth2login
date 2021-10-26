require('dotenv').config();
const axios = require('axios');
const GithubModel = require('../models/github.model');
const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;
const AuthGithubController = {};

AuthGithubController.GithubLogin = (req, res) => {
  const url = `https://github.com/login/oauth/authorize?client_id=${client_id}`;
  res.redirect(url);
}

AuthGithubController.GithubCallback = async (req, res) => {

  // setup data & options to fetch access token.
  const code = req.query.code;
  const body = {
    client_id: client_id,
    client_secret: client_secret,
    code,
  };

  // fetch token
  const opts = { headers: { accept: 'application/json' } };
  const _res = await axios.post('https://github.com/login/oauth/access_token', body, opts);

  if (_res.data.access_token) {
    // setup data & options to fetch user.
    const accessToken = _res.data.access_token;
    const opts = {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      }
    };

    // get github user by access token
    const github_user = await axios.get('https://api.github.com/user', opts);
    const data = github_user.data;
    const newGithubUser = {
      id: `${data.id}-${data.node_id}`,
      name: data.name,
      email: data.login,
      avatar: data.avatar_url,
      home_url: data.html_url
    }

    const getUser = await GithubModel.findOne_id(`${data.id}-${data.node_id}`);
    if (!getUser) {
      // Create new github user
      await GithubModel.create(newGithubUser);

      return res.json({
        success: true,
        message: `Create user ${data.name} with github account`,
        accessToken: `Bearer ${accessToken}`
      });
    }
    return res.json({
      success: true,
      message: `User ${data.name} is already registered in this app`,
      accessToken: `Bearer ${accessToken}`
    });
  }

  return res.json({
    success: false,
    message: "Can not login with github"
  });

}
module.exports = AuthGithubController;