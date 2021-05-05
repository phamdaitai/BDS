const authService = require('./auth.service');
const { LogInfo, LogError } = require('../../logs');

exports.login = async (req, res) => {
    console.log("BBB");
    try {
        let userLogin = await authService.login(req.body);

        await LogInfo(req.body.email, 'LOGIN', req.body.portal);

        res.status(200).json({
            success: true,
            messages: ["LOGIN_SUCCESSFULLY"],
            content: userLogin
        });
    } catch (error) {
        await LogError(req.body.email, 'LOGIN', req.body.portal);

        res.status(400).json({
            success: false,
            messages: ["LOGIN_FAILED"],
            content: error.message
        });
    }
}