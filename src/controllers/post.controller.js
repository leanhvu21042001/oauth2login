const { v4: uuidv4 } = require('uuid');

const PostController = {};
const PostModel = require('../models/post.model');

PostController.GetPosts = async (req, res) => {
  try {
    const user_id = req.user.id;
    const posts = await PostModel.getAll(user_id);

    if (posts.length > 0) {
      return res.json({
        success: true,
        message: "Get posts successfully!",
        data: posts
      });
    } else {
      return res.json({
        success: false,
        message: "No posts to get",
        data: []
      });
    }


  } catch (err) {
    throw err;
  }
}

PostController.CreatePost = async (req, res) => {
  try {
    const { title, content, likes } = req.body;

    if (req.user) {
      if (String(title).trim().length === 0) {
        return res.status(400).json({ success: false, message: "Name is empty!" });
      }
      if (String(content).trim().length === 0) {
        return res.status(400).json({ success: false, message: "Name is empty!" });
      }

      const entity = {};
      entity.id = uuidv4();
      entity.user_id = req.user.id;
      entity.title = title;
      entity.content = content;
      entity.likes = likes || 0;

      await PostModel.create(entity);

      return res.json({ success: true, message: 'Create new post successfully!', "data": entity });
    } else {
      return res.json({ success: false, message: 'Can not create a new post' });
    }
  } catch (err) {
    throw err;
  }

}

PostController.UpdatePost = async (req, res) => {
  try {
    const { id, title, content, likes } = req.body;

    if (req.user) {
      if (String(id).trim().length === 0) {
        return res.status(400).json({ success: false, message: "ID is required!" });
      }
      if (String(title).trim().length === 0) {
        return res.status(400).json({ success: false, message: "Name is empty!" });
      }
      if (String(content).trim().length === 0) {
        return res.status(400).json({ success: false, message: "Name is empty!" });
      }

      const entity = {};
      entity.id = id;
      entity.user_id = req.user.id;
      entity.title = title;
      entity.content = content;
      entity.likes = likes || 0;

      await PostModel.update(entity, req.user.id, id);

      return res.json({ success: true, message: 'Update post successfully!', "data": entity });
    } else {
      return res.json({ success: false, message: 'Can not Update a post' });
    }
  } catch (err) {
    throw err;
  }

}

PostController.DeletePost = async (req, res) => {
  try {
    const { id } = req.body;

    if (req.user) {

      if (String(id).trim().length === 0) {
        return res.status(400).json({ success: false, message: "ID is required!" });
      }

      await PostModel.delete(req.user.id, id);
      return res.json({ success: true, message: 'Delete post successfully!' });
    } else {
      return res.json({ success: false, message: 'Can not Update a new post' });
    }
  } catch (err) {
    throw err;
  }

}
module.exports = PostController;