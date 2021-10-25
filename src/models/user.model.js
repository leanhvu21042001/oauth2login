const db = require('../utils/db');

const TBL_USER = "users";
const TBL_COL_ID = "id";
const TBL_COL_NAME = "name";
const TBL_COL_EMAIL = "email";
const TBL_COL_HASH_PASSWORD = "hash_password";
const TBL_COL_AVATAR = "avatar";
const TBL_COL_REFRESH_TOKEN = "refresh_token";

const UserModel = {};

UserModel.create = (entity) => db.insert(TBL_USER, entity);

UserModel.findOne_id = async (id) => {
  const rows = await db.load(`SELECT * FROM ${TBL_USER} WHERE ${TBL_COL_ID} = '${id}'`);
  if (rows.length === 0) { return null }
  return rows[0];
}

UserModel.findOne_email = async (email) => {
  const rows = await db.load(`SELECT * FROM ${TBL_USER} WHERE ${TBL_COL_EMAIL} = '${email}'`);
  if (rows.length === 0) { return null }
  return rows[0];
}

UserModel.findOne_refreshToken = async (refreshToken) => {
  const rows = await db.load(`SELECT * FROM ${TBL_USER} WHERE ${TBL_COL_REFRESH_TOKEN} = '${refreshToken}'`);
  if (rows.length === 0) { return null }
  return rows[0];
}

UserModel.update = (entity, id) => db.update(TBL_USER, entity, { id: id })

module.exports = UserModel;