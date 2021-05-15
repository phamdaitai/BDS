import {
    sendRequest
} from '../../../helpers/requestHelper';

export const UploadServices = {
    uploadMultiImages
};

async function uploadMultiImages(data) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/upload/multi-images`,
        method: 'POST',
        data
    }, false, true)
}