const { uploadMultiImagesToCloud } = require('../../helpers/uploadCloudinary');

exports.uploadMultiImages = async (files, folder = "common", portal) => {
    const imageLinks = await uploadMultiImagesToCloud(files, folder);

    return { imageLinks };
}
