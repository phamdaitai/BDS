const postService = require('./post.service');
const { LogInfo, LogError } = require('../../logs');

exports.createNewPost = async (req, res) => {
    try {
        let data = req.body;
        let portal = req.user.portal;
        let newPost = await postService.createPost(data, req.user, portal);

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

exports.getAllPost = async (req, res) => {
    try {
        let query = req.query;
        let portal = req.user.portal;
        let allPosts = await postService.getAllPosts(query, portal);

        await LogInfo(req.user.email, "GET_ALL_POSTS", req.user.portal);

        res.status(201).json({
            success: true,
            messages: ["Lấy danh sách bài đăng thành công!"],
            content: allPosts
        });
    } catch (error) {
        await LogError(req.user.email, "GET_ALL_POSTS", req.user.portal);
        res.status(400).json({
            success: false,
            messages: ["Lấy danh sách bài đăng không thành công!"],
            content: error.message
        });
    }
}

exports.getDetailPost = async ( req, res ) => {
    try {
        let id = req.params.id;
        let post = await postService.getDetailPost( id, req.portal)

        await LogInfo(req.user.email, "GET_DETAIL_POST", req.portal);
        res.status(200).json({
            success: true,
            messages: ["Lấy dữ liệu bài đăng thành công"],
            content: post
        });
    } catch (error) {
        await LogError(req.user.email, "GET_DETAIL_POST", req.portal);

        res.status(400).json({
            success: false,
            messages: ["Lấy dữ liệu bài đăng không thành công"],
            content: error.message
        });
    }
}