const CountryService = require('./country.service');
const { LogInfo, LogError } = require('../../logs');

exports.getProvinces = async (req, res) => {
    try {
        let data = req.body;
        let provinces = await CountryService.getProvinces();

        await LogInfo("", "GET_PROVINCES", "");

        res.status(200).json({
            success: true,
            messages: ["Lấy danh sách tỉnh / thành phố thành công"],
            content: provinces
        });
    } catch (error) {
        await LogError("", "GET_PROVINCES", "");

        res.status(400).json({
            success: false,
            messages: ["Lấy danh sách tỉnh / thành phố không thành công"],
            content: error.message
        });
    }
}

exports.getDistricts = async (req, res) => {
    try {
        let query = req.query;
        let districts = await CountryService.getDistricts(query);

        await LogInfo("", "GET_DISTRICTS", "");

        res.status(200).json({
            success: true,
            message: ["Lấy danh sách quận, huyện thành công"],
            content: districts
        });
    } catch (error) {
        await LogError("", "GET_DISTRICTS", "");

        res.status(400).json({
            success: false,
            message: ["Lấy danh sách quận, huyện không thành công"],
            content: error.message
        });
    }
}

exports.getWards = async (req, res) => {
    try {
        let query = req.query;
        let wards = await CountryService.getWards(query);

        await LogInfo("", "GET_WARDS", "");

        res.status(200).json({
            success: true,
            message: ["Lấy danh sách xã, phường thành công"],
            content: wards
        });
    } catch (error) {
        await LogError("", "GET_WARDS", "");

        res.status(400).json({
            success: false,
            message: ["Lấy danh sách xã, phường không thành công"],
            content: error.message
        });
    }
}