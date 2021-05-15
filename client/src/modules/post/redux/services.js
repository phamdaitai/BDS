import {
    sendRequest
} from '../../../helpers/requestHelper';

export const PostServices = {
    createPost,
    getAllPosts,
    getPostDetail
};

async function createPost(data) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/post`,
        method: 'POST',
        data
    }, true, true)
}

async function getAllPosts(queryData) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/post`,
        method: 'GET',
        params: queryData
    }, false, true)
}

async function getPostDetail(id) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/post/${id}`,
        method: 'GET'
    }, false, true)
}