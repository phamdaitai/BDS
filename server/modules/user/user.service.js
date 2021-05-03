const { initConnection } = require('../../helpers/dbHelpers');
const bcrypt = require('bcryptjs');
// const { sendEmailAboutCreatedAccount } = require('../../helpers/emailHelpers');

exports.register = async (data, portal) => {
    let User = initConnection(portal).model("User");
    let { name, email, password } = data;

    let account = await User.findOne({
        email: email
    });
    if (account) {
        throw Error('Account existed')
    }

    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(password, salt);

    let user = await User.create({
        email: email,
        password: hashPassword,
        name: name
    });

    // await sendEmailAboutCreatedAccount(email);
    return { user }
}