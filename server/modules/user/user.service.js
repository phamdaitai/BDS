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

exports.getDetailUser = async (id, portal) => {
    let User = initConnection(portal).model("User");

    let user = User.findById(id);

    if (!user) {
        throw Error('user_is_not_existed');
    }

    return { user }
}

exports.updateUser = async (id, data, portal) => {
    let User = initConnection(portal).model("User");

    let user = User.findByIdAndUpdate(id, {
        $set: data
    }, { new: true })

    return { user }
}

exports.changePassword = async (id, data, portal) => {
    const { oldPassword, newPassword } = data;

    let User = initConnection(portal).model("User");

    let user = User.findById(id);

    if (!user) {
        throw Error('user_is_not_existed');
    }
    

    let checkPassword = bcrypt.compareSync(oldPassword, user.password);

    if (!checkPassword) {
        throw Error("Password is invalid");
    }

    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(newPassword, salt);

    user.password = hashPassword;
    user.save();

    return {user}
}