import {
    sendRequest
} from '../../../helpers/requestHelper';

export const FeeServices = {
    createFee,
    getAllFees
};

async function createFee(data) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/fee`,
        method: 'POST',
        data
    }, true, true)
}

async function getAllFees(queryData) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/fee`,
        method: 'GET',
        params: queryData
    }, false, false)
}