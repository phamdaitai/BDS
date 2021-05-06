const authService = require('./auth.service');
const { LogInfo, LogError } = require('../../logs');

exports.login = async (req, res) => {
    try {
        let userLogin = await authService.login(req.body);
        await LogInfo(req.body.email, 'LOGIN', req.body.portal);

        res.status(200).json({
            success: true,
            messages: ["Đăng nhập thành công"],
            content: userLogin
        });
    } catch (error) {
        await LogError(req.body.email, 'LOGIN', req.body.portal);

        res.status(400).json({
            success: false,
            messages: ["Email hoặc mật khẩu không đúng"],
            content: error.message
        });
    }
}