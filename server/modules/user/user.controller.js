const UserService = require('./user.service');
const { LogInfo, LogError } = require('../../logs');

exports.createUser = async (req, res) => {
    try {
        let portal = req.body.portal;
        let user = await UserService.register(req.body, portal);

        await LogInfo(req.body.email, "CREATED_USER", portal)
        res.status(201).json({
            success: true,
            messages: ["Tạo tài khoản thành công"],
            content: user
        })
    } catch (error) {
        await LogError(req.body.email, "CREATED_USER", req.body.portal)

        console.log("error.message", error.message);

        res.status(400).json({
            success: false,
            messages: error.message === "account_existed" ?
                ["Tài khoản đã tồn tại"] :
                ["Tạo tài khoản không thành công"],
            content: error.message
        })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        let query = req.query;
        let allUsers = await UserService.getAllUsers(query, req.portal);

        await LogInfo(req.body.email, "GET_ALL_USERS", req.body.portal);

        res.status(200).json({
            success: true,
            messages: ["Lấy danh sách người dùng thành công!"],
            content: allUsers
        });
    } catch (error) {
        await LogError(req.body.email, "GET_ALL_USERS", req.body.portal);
        res.status(400).json({
            success: false,
            messages: ["Lấy danh sách người dùng không thành công!"],
            content: error.message
        });
    }
}

exports.getDetailUser = async ( req, res ) => {
    try {
        let id = req.params.id;
        let user = await UserService.getDetailUser( id, req.portal)

        await LogInfo(req.user.email, "GET_USER_DETAIL", req.portal);
        res.status(200).json({
            success: true,
            messages: ["Lấy thông tin cá nhân thành công"],
            content: user
        });
    } catch (error) {
        await LogError(req.user.email, "GET_USER_DETAIL", req.portal);

        res.status(400).json({
            success: false,
            messages: ["Lấy thông tin cá nhân không thành công"],
            content: error.message
        });
    }
}

exports.updateUser = async (req, res) => {
    try {
        let id = req.params.id;
        data = req.body;
        let user = await UserService.updateUser( id, data, req.portal);

        await LogInfo(req.user.email, "UPDATE_USER", req.portal);
        res.status(200).json({
            success: true,
            messages: ["Cập nhật thông tin thành công"],
            content: user
        });
    } catch (error) {
        await LogError(req.user.email, "UPDATE_USER", req.portal);
        res.status(400).json({
            success: false,
            messages: ["Cập nhật thông tin không thành công"],
            content: error.message
        });
    }
}

exports.changePassword = async (req, res) => {
    try {
        let id = req.params.id;
        data = req.body;
        let user = await UserService.changePassword( id, data, req.portal);

        await LogInfo(req.user.email, "CHANGE_PASSWORD", req.portal);
        res.status(200).json({
            success: true,
            messages: ["Mật khẩu đã được thay đổi, vui lòng đăng nhập lại!"],
            content: user
        });
    } catch (error) {
        await LogError(req.user.email, "CHANGE_PASSWORD", req.portal);
        res.status(400).json({
            success: false,
            messages: ["Thay đổi mật khẩu không thành công"],
            content: error.message
        });
    }
}

exports.getPostsOfUser = async (req, res) => {
    try {
        let id = req.params.id;
        let query = req.query;

        let posts = await UserService.getPostsOfUser( id, query, req.portal);

        await LogInfo(req.user.email, "GET_POSTS_OF_USER", req.portal);
        res.status(200).json({
            success: true,
            messages: ["Lấy danh sách bài đăng thành công!"],
            content: posts
        });
    } catch (error) {
        await LogError(req.user.email, "GET_POSTS_OF_USER", req.portal);
        res.status(400).json({
            success: false,
            messages: ["Bài đăng của bạn chưa được lấy"],
            content: error.message
        });
    }
}

