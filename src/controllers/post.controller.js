const {v4: uuidv4} = require('uuid');
const PostController = {};
const PostModel = require('../models/post.model');
const postModel = new PostModel();

PostController.GetPosts = async (req, res) => {
    try {
        let user = req?.user;
        if (req.userGithub) {
            user = req.userGithub;
        }
        const user_id = user.id;
        const posts = await postModel.getAll(user_id);

        if (posts !== null) {
            return res.json({
                success: true,
                message: "Get posts successfully!",
                data: posts
            });
        } else {
            return res.json({
                success: false,
                message: `No posts to get with user ${user?.name}`,
                data: []
            });
        }
    } catch (err) {
        return res.status(500).json({success: false, message: err.message});
    }
}

PostController.CreatePost = async (req, res) => {
    try {
        let user = req?.user;
        if (req.userGithub) {
            user = req.userGithub;
        }
        const {title, content} = req.body;
        // if (Object.keys(req.body).length > 2) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "Vượt quá đối số nhận vào"
        //     })
        // }
        if (user) {
            if (String(title).trim().length === 0 || title === undefined) {
                return res.status(400).json({success: false, message: "Title is empty!"});
            }
            if (String(content).trim().length === 0 || content === undefined) {
                return res.status(400).json({success: false, message: "Content is empty!"});
            }
            const entity = {};
            entity.id = uuidv4();
            entity.user_id = user.id;
            entity.title = title;
            entity.content = content;
            entity.likes = 0;
            entity.version = 0;
            await postModel.create(entity);

            return res.json({success: true, message: 'Create new post successfully!', "data": entity});
        } else {
            return res.json({success: false, message: 'Can not create a new post'});
        }
    } catch (err) {
        return res.status(500).json({success: false, message: err.message});
    }

}

PostController.UpdatePost = async (req, res) => {
    try {
        let user = req?.user;
        if (req.userGithub) {
            user = req.userGithub;
        }

        const {id, title, content, likes, version} = req.body;

        if (user) {
            if (String(id).trim().length === 0 || id === undefined) {
                return res.status(400).json({success: false, message: "ID is required!"});
            }
            if (String(title).trim().length === 0 || title === undefined) {
                return res.status(400).json({success: false, message: "Title is empty!"});
            }
            if (String(content).trim().length === 0 || content === undefined) {
                return res.status(400).json({success: false, message: "Content is empty!"});
            }

            if (isNaN(Number(likes))) {
                return res.status(400).json({success: false, message: "Likes is not a number!"});
            }

            if (isNaN(Number(version))) {
                return res.status(400).json({success: false, message: "Version is not a number!"});
            }

            const _post = await postModel.findOne(user.id, id);

            if (_post === null) {
                return res.status(400).json({success: false, message: `Not found 'post' to update!`});
            }

            const entity = {};
            entity.id = id;
            entity.user_id = user.id;
            entity.title = title;
            entity.content = content;
            entity.likes = likes || 0;
            entity.version = version || 0;

            if (version - _post.version !== 1) {
                return res.status(400).json({
                    success: false, message: `Invalid version!`,
                    currentChange: entity,
                    comingChange: _post
                });
            }

            await postModel.update(entity, user.id, id);

            return res.json({success: true, message: 'Update post successfully!', "data": entity});
        } else {
            return res.json({success: false, message: 'Can not Update a post'});
        }
    } catch (err) {
        return res.status(500).json({success: false, message: err.message});
    }

}

PostController.DeletePost = async (req, res) => {
    try {
        let user = req?.user;
        if (req.userGithub) {
            user = req.userGithub;
        }
        const {id} = req.body;

        if (user) {

            if (String(id).trim().length === 0 || id === undefined) {
                return res.status(400).json({success: false, message: "ID is required!"});
            }

            const _post = await postModel.findOne(user.id, id);

            if (_post.deleted_at !== null) {
                return res.status(500).json({
                    success: false,
                    message: "The post deleted before"
                })
            }

            if (_post === null) {
                return res.status(400).json({success: false, message: `Not found 'post' to delete!`});
            }

            delete _post.deleted_at
            delete _post.updated_at

            await postModel.delete(_post, user.id, id);

            return res.json({success: true, message: 'Delete post successfully!'});
        } else {
            return res.json({success: false, message: 'Can not Update a new post'});
        }
    } catch (err) {
        return res.status(500).json({success: false, message: err.message});
    }

}

module.exports = PostController;