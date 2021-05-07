const { initConnection } = require('../../helpers/dbHelpers');
const bcrypt = require('bcryptjs');
const { sendEmailRegisterUser } = require('../../helpers/emailHelpers');

exports.register = async (data, portal) => {
    let User = initConnection(portal).model("User");
    let { name, email, password } = data;

    let account = await User.findOne({
        email: email
    });
    if (account) {
        throw Error('account_existed')
    }

    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(password, salt);

    let user = await User.create({
        ...data, password: hashPassword
    });

    await sendEmailRegisterUser(email, name);
    return { user }
}