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
            messages: ["Đăng bài thành công!"],
            content: newPost
        });
    } catch (error) {
        await LogError(req.user.email, "CREATED_POST", req.user.portal);
        console.log("EEE", error.message);
        res.status(400).json({
            success: false,
            messages: ["Bài đăng chưa được thêm!"],
            content: error.message
        });
    }
}