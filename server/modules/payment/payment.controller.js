const paymentService = require('./payment.service');
const { LogInfo, LogError } = require('../../logs');

exports.createPayment = async (req, res) => {
    try {
        let data = req.body;
        let portal = req.portal;
        let newPayment = await paymentService.createPayment(data, req.user, portal);

        await LogInfo(req.user.email, "CREATED_PAYMENT", req.portal);

        res.status(201).json({
            success: true,
            messages: ["Thanh toán thành công!"],
            content: newPayment
        });
    } catch (error) {
        await LogError(req.user.email, "CREATED_PAYMENT", req.portal);
        res.status(400).json({
            success: false,
            messages: ["Thanh toán không thành công!"],
            content: error.message
        });
    }
}

exports.getAllPayments = async (req, res) => {
    try {
        let query = req.query;
        let allPayments = await paymentService.getAllPayments(query, req.user, req.portal);

        await LogInfo(req.user.email , "GET_ALL_PAYMENTS", req.portal);

        res.status(200).json({
            success: true,
            messages: ["Lấy danh sách thanh toán thành công!"],
            content: allPayments
        });
    } catch (error) {
        await LogError(req.user.email, "GET_ALL_PAYMENTS", req.portal);
        res.status(400).json({
            success: false,
            messages: ["Lấy danh sách thanh toán không thành công!"],
            content: error.message
        });
    }
}