const userService = require('./user.service');
const { LogInfo, LogError } = require('../../logs');

exports.createUser = async (req, res) => {
    try {
        let portal = req.body.portal;
        let user = await userService.register(req.body, portal);

        await LogInfo(req.body.email, "CREATED_USER", portal)
        res.status(201).json({
            success: true,
            messages: ["CREATED_USER_SUCCESSFULLY"],
            content: user
        })
    } catch (error) {
        await LogError(req.body.email, "CREATED_USER", req.body.portal)

        res.status(400).json({
            success: false,
            messages: ["CREATED_USER_FAILED"],
            content: error.message
        })
    }
}