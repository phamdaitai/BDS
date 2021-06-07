import {
    sendRequest
} from '../../../helpers/requestHelper';

export const FeeServices = {
    createFee,
    getAllFees,
    deleteFee
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

async function deleteFee(id) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/fee/${id}`,
        method: 'DELETE'
    }, true, true)
}