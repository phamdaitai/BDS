const feeService = require('./fee.service');
const { LogInfo, LogError } = require('../../logs');

exports.createFee = async (req, res) => {
    try {
        let data = req.body;
        let portal = req.portal;
        let newFee = await feeService.createFee(data, portal);

        await LogInfo(req.user.email, "CREATE_FEE", req.portal);

        res.status(201).json({
            success: true,
            messages: ["Tạo phí Vip thành công!"],
            content: newFee
        });
    } catch (error) {
        await LogError(req.user.email, "CREATE_FEE", req.portal);
        res.status(400).json({
            success: false,
            messages: ["Tạo phí Vip không thành công!"],
            content: error.message
        });
    }
}

exports.getAllFees = async (req, res) => {
    try {
        let query = req.query;
        let allFees = await feeService.getAllFees(query, req.portal);

        await LogInfo(req.user.email , "GET_ALL_FEES", req.portal);

        res.status(200).json({
            success: true,
            messages: ["Lấy danh sách phí VIP thành công!"],
            content: allFees
        });
    } catch (error) {
        await LogError(req.user.email, "GET_ALL_FEES", req.portal);
        res.status(400).json({
            success: false,
            messages: ["Lấy danh sách phí VIP không thành công!"],
            content: error.message
        });
    }
}

exports.deleteFee = async (req, res) => {
    try {
        let id = req.params.id;
        let portal = req.portal;
        let fee = await feeService.deleteFee(id, portal);

        await LogInfo(req.user.email, "DELETE_FEE", req.portal);

        res.status(201).json({
            success: true,
            messages: ["Xóa gói VIP thành công!"],
            content: fee
        });
    } catch (error) {
        await LogError(req.user.email, "DELETE_FEE", req.portal);
        res.status(400).json({
            success: false,
            messages: ["Xóa gói VIP không thành công!"],
            content: error.message
        });
    }
}