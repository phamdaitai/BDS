const userService = require('./user.service');
const { LogInfo, LogError } = require('../../logs');

exports.createUser = async (req, res) => {
    try {
        let portal = req.body.portal;
        let user = await userService.register(req.body, portal);

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