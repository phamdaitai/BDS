const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
  cloud_name: "bds",
  api_key: "432118918785871",
  api_secret: "LUs9G2HtiysNhIsUJbqjBdYpuig",
});

//Email: batdongsan.buitiendat@gmail.com
//Pass: Buitiendat99$

exports.uploadMultiImagesToCloud = async (files, folder) => {
  try {
    const arrayImagesLink = [];
    //upload nhiều file
     for( let file of files){
        const result = await cloudinary.uploader.upload(file.path, {
          folder,
        });
        arrayImagesLink.push(result.secure_url);
        //xóa file ở local
        fs.unlinkSync(file.path)
     }

    return arrayImagesLink;
  } catch (err) {
    return err;
  }
};

exports.uploadSingleImageToCloud = async (file, folder) => {
    const uploadSingle = await cloudinary.uploader.upload(file, {
        folder: folder
    });
    await fs.unlinkSync(file);
    return uploadSingle.secure_url;
}

exports.uploadSingleVideoToCloud = async (file, folder) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder,
      resource_type: "video",
    });

    fs.unlinkSync(file); // Xóa file trong thư mục trên server

    return result.secure_url;
  } catch (err) {
    return err;
  }
};