import {
    sendRequest
} from '../../../helpers/requestHelper';

export const PostServices = {
    createPost,
    getAllPosts,
    getPostDetail,
    getPostForUpdate,
    updatePost,
    deletePost
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
    }, false, false)
}

async function getPostDetail(id) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/post/${id}`,
        method: 'GET'
    }, false, true)
}

async function getPostForUpdate(id) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/post/get-for-update/${id}`,
        method: 'GET'
    }, false, true)
}

async function updatePost(id, data) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/post/${id}`,
        method: 'PATCH',
        data
    }, true, true)
}

async function deletePost(id) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/post/${id}`,
        method: 'DELETE'
    }, true, true)
}