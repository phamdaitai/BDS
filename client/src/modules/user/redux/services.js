import {
    sendRequest
} from '../../../helpers/requestHelper';

export const UserService = {
    register,
    getAllUsers,
    getDetailUser,
    updateUser,
    changePassword,
    getPostsOfUser,
    deleteUser
};

async function register(data) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/user`,
        method: 'POST',
        data
    }, true, true)
}

async function getAllUsers(queryData) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/user`,
        method: 'GET',
        params: queryData
    }, false, true)
}

async function getDetailUser(id) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/user/${id}`,
        method: 'GET',
    }, false, true)
}

async function updateUser(id, data) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/user/${id}`,
        method: 'PATCH',
        data
    }, true, true)
}

async function changePassword(id, data) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/user/change-password/${id}`,
        method: 'PATCH',
        data
    }, true, true)
}

async function getPostsOfUser(id, query) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/user/posts-of-user/${id}`,
        method: 'GET',
        params: query
    }, false, true)
}

async function deleteUser(id) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/user/${id}`,
        method: 'DELETE',
    }, true, true)
}