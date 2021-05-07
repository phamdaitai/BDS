import {
    sendRequest
} from '../../../helpers/requestHelper';

export const UserService = {
    register
};

async function register(data) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/user`,
        method: 'POST',
        data
    }, true, true)
}