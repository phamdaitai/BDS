const { initConnection } = require('../../helpers/dbHelpers');

exports.createFee = async (data, portal) => {
    let Fee = initConnection(portal).model("Fee");

    let fee = await Fee.create(data);

    return { fee }
}

exports.getAllFees = async (query, portal) => {
    let { limit, page, type } = query;
    let option = {};

    if (type) {
        option.type = type;
    }

    let Fee = initConnection(portal).model("Fee");

    if (!page || !limit) {
        let allFees = await Fee
            .find(option)
            .sort({ point: 1 })
        
        return {allFees}
    } else {
        let allFees = await Fee.paginate(option, {
            page,
            limit,
            sort: { point: 1 }
        })

        return {allFees}
    }
}

exports.deleteFee = async (id, portal) => {
    let Fee = initConnection(portal).model("Fee");

    let fee = await Fee.findByIdAndDelete(id)

    return { fee }
}