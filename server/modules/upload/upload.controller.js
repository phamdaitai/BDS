const UploadService = require('./upload.service');
const { LogInfo, LogError } = require('../../logs');

exports.uploadMultiImages = async (req, res) => {
    try {
        let portal = req.body.portal;
        let files = req.files;
        let folder = req.body.folder;

        let imageLinks = await UploadService.uploadMultiImages(files, folder, portal);

        await LogInfo(req.body.email, "UPLOAD_MULTI_IMAGES", portal);
        res.status(201).json({
            success: true,
            messages: ["Đăng ảnh thành công"],
            content: imageLinks
        })
    } catch (error) {
        await LogError(req.body.email, "UPLOAD_MULTI_IMAGES", req.body.portal)

        res.status(400).json({
            success: false,
            messages: ["Ảnh chưa thể đăng"],
            content: error.message
        })
    }
}