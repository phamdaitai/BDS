import {
    sendRequest
} from '../../../helpers/requestHelper';

export const CountryService = {
    getProvinces,
    getDistricts,
    getWards
};

async function getProvinces() {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/country/province`,
        method: 'GET'
    }, false, true)
} 

async function getDistricts(queryData) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/country/district`,
        method: 'GET',
        params: queryData
    }, false, true)
}

async function getWards(queryData) {
    return sendRequest({
        url: `${ process.env.REACT_APP_SERVER }/country/ward`,
        method: 'GET',
        params: queryData
    }, false, true)
}