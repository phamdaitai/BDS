const categoryService = require('./category.service');
const { LogInfo, LogError } = require('../../logs');

exports.createCategory = async (req, res) => {
    try {
        let data = req.body;
        let portal = req.portal;
        let newCategory = await categoryService.createCategory(data, portal);

        await LogInfo(req.user.email, "CREATE_CATEGORY", req.portal);

        res.status(201).json({
            success: true,
            messages: ["Đã thêm danh mục bài đăng!"],
            content: newCategory
        });
    } catch (error) {
        await LogError(req.user.email, "CREATE_CATEGORY", req.portal);
        res.status(400).json({
            success: false,
            messages: ["Thêm danh mục bài đăng thất bại!"],
            content: error.message
        });
    }
}

exports.getAllCategories = async (req, res) => {
    try {
        let query = req.query;
        let portal = req.portal;
        let allCategories = await categoryService.getAllCategories(query, portal);

        await LogInfo("All users", "GET_ALL_CATEGORIES", req.portal);

        res.status(201).json({
            success: true,
            messages: ["Lấy danh sách danh mục thành công!"],
            content: allCategories
        });
    } catch (error) {
        await LogError("All users", "GET_ALL_CATEGORIES", req.portal);
        res.status(400).json({
            success: false,
            messages: ["Lấy danh sách danh mục không thành công!"],
            content: error.message
        });
    }
}

exports.getDetailCategory = async (req, res) => {
    try {
        let id = req.params.id;
        let portal = req.portal;
        let category = await categoryService.getDetailCategory(id, portal);

        await LogInfo(req.user.email, "GET_DETAIL_CATEGORY", req.portal);

        res.status(201).json({
            success: true,
            messages: ["Lấy chi tiết danh mục thành công!"],
            content: category
        });
    } catch (error) {
        await LogError(req.user.email, "GET_DETAIL_CATEGORY", req.portal);
        res.status(400).json({
            success: false,
            messages: ["Lấy chi tiết danh mục không thành công!"],
            content: error.message
        });
    }
}

exports.updateCategory = async (req, res) => {
    try {
        let id = req.params.id;
        let data = req.body;
        let portal = req.portal;
        let category = await categoryService.updateCategory(id, data, portal);

        await LogInfo(req.user.email, "UPDATE_CATEGORY", req.portal);

        res.status(201).json({
            success: true,
            messages: ["Đã cập nhật danh mục!"],
            content: category
        });
    } catch (error) {
        await LogError(req.user.email, "UPDATE_CATEGORY", req.portal);
        res.status(400).json({
            success: false,
            messages: ["Cập nhật danh mục không thành công!"],
            content: error.message
        });
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        let id = req.params.id;
        let portal = req.portal;
        let category = await categoryService.deleteCategory(id, portal);

        await LogInfo(req.user.email, "DELETE_CATEGORY", req.portal);

        res.status(201).json({
            success: true,
            messages: ["Xóa danh mục thành công!"],
            content: category
        });
    } catch (error) {
        await LogError(req.user.email, "DELETE_CATEGORY", req.portal);
        res.status(400).json({
            success: false,
            messages: ["Xóa danh mục không thành công!"],
            content: error.message
        });
    }
}