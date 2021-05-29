const postService = require('./post.service');
const { LogInfo, LogError } = require('../../logs');

exports.createNewPost = async (req, res) => {
    try {
        let data = req.body;
        let portal = req.portal;
        let newPost = await postService.createPost(data, req.user, portal);

        await LogInfo(req.user.email, "CREATED_POST", req.portal);

        res.status(201).json({
            success: true,
            messages: ["Đăng bài thành công!"],
            content: newPost
        });
    } catch (error) {
        await LogError(req.user.email, "CREATED_POST", req.portal);
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
        let allPosts = await postService.getAllPosts(query, req.portal);

        await LogInfo("", "GET_ALL_POSTS", "");

        res.status(200).json({
            success: true,
            messages: ["Lấy danh sách bài đăng thành công!"],
            content: allPosts
        });
    } catch (error) {
        await LogError("", "GET_ALL_POSTS", req.portal);
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

        await LogInfo("", "GET_DETAIL_POST", req.portal);
        res.status(200).json({
            success: true,
            messages: ["Lấy dữ liệu bài đăng thành công"],
            content: post
        });
    } catch (error) {
        await LogError("", "GET_DETAIL_POST", req.portal);

        res.status(400).json({
            success: false,
            messages: ["Lấy dữ liệu bài đăng không thành công"],
            content: error.message
        });
    }
}

exports.getPostForUpdate = async ( req, res ) => {
    try {
        let id = req.params.id;
        let post = await postService.getPostForUpdate( id, req.user._id, req.portal)

        await LogInfo(req.user.email, "GET_POST_FOR_UPDATE", req.portal);
        res.status(200).json({
            success: true,
            messages: ["Lấy dữ liệu bài đăng thành công"],
            content: post
        });
    } catch (error) {
        await LogError(req.user.email, "GET_POST_FOR_UPDATE", req.portal);

        res.status(400).json({
            success: false,
            messages: error.message === "you_can_not_access" ?
            ["Bạn không có quyền truy cập!"] :
            ["Lấy dữ liệu bài đăng không thành công"],
            content: error.message
        });
    }
}

exports.updatePost = async ( req, res ) => {
    try {
        let id = req.params.id;
        let data = req.body;
        let post = await postService.updatePost( id, data, req.portal)

        await LogInfo(req.user.email, "UPDATE_POST", req.portal);
        res.status(200).json({
            success: true,
            messages: ["Cập nhật bài đăng thành công"],
            content: post
        });
    } catch (error) {
        await LogError(req.user.email, "UPDATE_POST", req.portal);

        res.status(400).json({
            success: false,
            messages: ["Cập nhật bài đăng không thành công"],
            content: error.message
        });
    }
}

exports.deletePost = async ( req, res ) => {
    try {
        let postId = req.params.id;
        let post = await postService.deletePost( postId, req.user._id, req.portal)

        await LogInfo(req.user.email, "DELETE_POST", req.portal);
        res.status(200).json({
            success: true,
            messages: ["Xóa bài đăng thành công"],
            content: post
        });
    } catch (error) {
        await LogError(req.user.email, "DELETE_POST", req.portal);

        res.status(400).json({
            success: false,
            messages: ["Xóa bài đăng không thành công"],
            content: error.message
        });
    }
}

exports.interaction = async ( req, res ) => {
    try {
        let id = req.params.id;
        let data = req.body;
        let post = await postService.interaction( id, data, req.portal)

        await LogInfo(req.user.email, "INTERACTION_POST", req.portal);
        res.status(200).json({
            success: true,
            messages: ["Tương tác bài viết thành công"],
            content: post
        });
    } catch (error) {
        await LogError(req.user.email, "INTERACTION_POST", req.portal);
        console.log("eee", error.message);
        res.status(400).json({
            success: false,
            messages: ["Tương tác bài viết không thành công"],
            content: error.message
        });
    }
}
