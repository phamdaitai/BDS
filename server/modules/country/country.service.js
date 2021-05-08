const { initConnection } = require('../../helpers/dbHelpers');

exports.getProvinces = async (portal) => {
    let Province = initConnection(portal).model("Province");

    let provinces = await Province.find({});
    return { provinces }
}

exports.getDistricts = async (query, portal) => {
    let option = query;

    let District = initConnection(portal).model("District");

    let districts = await District.find(option);
    return { districts }
}

exports.getWards = async (query, portal) => {
    const option = query;
        
    let Ward = initConnection(portal).model("Ward");

    let wards = await Ward.find(option);
    return { wards }
}

