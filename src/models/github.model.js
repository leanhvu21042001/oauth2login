const db = require('../utils/db');

const TBL_GITHUB = "oauth_github";
const TBL_COL_ID = "id";
const TBL_COL_NAME = "name";
const TBL_COL_EMAIL = "email";
const TBL_COL_AVATAR = "avatar";
const TBL_COL_HOME_URL = "home_url";

const GithubModel = {};

GithubModel.create = (entity) => db.insert(TBL_GITHUB, entity);

GithubModel.findOne_id = async (id) => {
  const rows = await db.load(`SELECT * FROM ${TBL_GITHUB} WHERE ${TBL_COL_ID} = '${id}'`);
  if (rows.length === 0) { return null }
  return rows[0];
}

GithubModel.findOne_email = async (email) => {
  const rows = await db.load(`SELECT * FROM ${TBL_GITHUB} WHERE ${TBL_COL_EMAIL} = '${email}'`);
  if (rows.length === 0) { return null }
  return rows[0];
}

module.exports = GithubModel;