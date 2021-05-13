import {
    sendRequest
} from '../../../helpers/requestHelper';

export const PostServices = {
    createPost
};

async function createPost(data) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/post`,
        method: 'POST',
        data
    }, true, true)
}