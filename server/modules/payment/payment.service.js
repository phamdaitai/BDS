const { initConnection } = require('../../helpers/dbHelpers');

exports.createPayment = async (data, user, portal) => {
    let Payment = initConnection(portal).model("Payment");
    let User = initConnection(portal).model("User");

    let userInfo = await User.findById(user._id);
    if (!userInfo) {
        throw Error("User is not existing")
    }

    let payment = await Payment.create({ ...data, owner: user._id });

    userInfo.balance += payment.transaction;

    await userInfo.save();

    return { payment }
}

exports.getAllPayments = async (query, user, portal) => {
    let { limit, page } = query;
    let option = {};

    if (user) {
        option.owner = user._id;
    }

    let Payment = initConnection(portal).model("Payment");

    if (!page || !limit) {
        let allPayments = await Payment
            .find(option)
            .populate([{
                path: "post", select: 'title'
            }])
            .sort({ createdAt: 'desc' })
        
        return {allPayments}
    } else {
        let allPayments = await Payment.paginate(option, {
            page,
            limit,
            populate: [{
                path: "post", select: 'title'
            }],
            sort: { 'createdAt': 'desc' }
        })

        return {allPayments}
    }
}