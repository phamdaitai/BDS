const postService = require('./post.service');
const { LogInfo, LogError } = require('../../logs');

exports.createNewPost = async (req, res) => {
    try {
        let data = req.body;
        let portal = req.user.portal;
        let newPost = await postService.createPost(data, portal);

        await LogInfo(req.user.email, "CREATED_POST", req.user.portal);

        res.status(201).json({
            success: true,
            message: ["CREATED_POST_SUCCESSFULLY"],
            content: newPost
        });
    } catch (error) {
        await LogError(req.user.email, "CREATED_POST", req.user.portal);

        res.status(400).json({
            success: false,
            message: ["CREATED_POST_FAILED"],
            content: error.message
        });
    }
}