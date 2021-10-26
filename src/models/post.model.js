const db = require('../utils/db');

const TBL_POSTS = 'posts';
const TBL_COL_ID = "id";
const TBL_COL_USER_ID = "user_id";
const TBL_COL_TITLE = "title";
const TBL_COL_CONTENT = "content";
const TBL_COL_LIKES = "likes";
const TBL_COL_CREATED_AT = "created_at";
const TBL_COL_UPDATED_AT = "updated_at";

const PostModel = {};

// create post []
PostModel.create = (entity) => db.insert(TBL_POSTS, entity);

PostModel.update = (entity, user_id, post_id) => db.update2condition(TBL_POSTS, entity, { user_id: user_id }, { id: post_id });

PostModel.findOne = async function (user_id, post_id) {
  const rows = await db.load(`SELECT * FROM ${TBL_POSTS} WHERE ${TBL_COL_USER_ID} = '${user_id}' AND ${TBL_COL_ID} = '${post_id}'`);
  if (rows.length === 0) { return null }
  return rows[0];
}

PostModel.delete = (user_id, post_id) => db.delete2condition(TBL_POSTS, { user_id: user_id }, { id: post_id })

PostModel.getAll = async function (user_id) {
  const rows = await db.load(`SELECT * FROM ${TBL_POSTS} WHERE ${TBL_COL_USER_ID} = '${user_id}'`);
  if (rows.length === 0) { return null }
  return rows;
}

module.exports = PostModel;