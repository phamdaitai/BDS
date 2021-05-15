import { UploadServices } from './services';

export const UploadActions = {
    uploadMultiImages
}

function uploadMultiImages(data) {
    return new Promise((resolve, reject) => {
        UploadServices.uploadMultiImages(data)
            .then(res => { resolve(res.data?.content) })
            .catch(err => { reject(err) })
    })
}